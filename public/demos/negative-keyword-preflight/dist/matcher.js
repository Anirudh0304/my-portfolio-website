const tokenize = (value) => value
    .toLocaleLowerCase("en-US")
    .replaceAll(".", "")
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
export function parseQueries(source) {
    return source.split(/\r?\n/u).flatMap((line) => {
        const value = line.trim();
        if (!value)
            return [];
        const mustKeep = value.startsWith("!");
        const text = (mustKeep ? value.slice(1) : value).trim();
        return text ? [{ text, mustKeep }] : [];
    });
}
export function parseNegatives(source) {
    return source.split(/\r?\n/u).flatMap((raw, index) => {
        const original = raw.trim();
        if (!original)
            return [];
        const line = index + 1;
        const malformed = (message) => ({ line, original, issue: { kind: "malformed", message } });
        const ambiguous = (message) => ({ line, original, issue: { kind: "ambiguous", message } });
        if (original.includes(","))
            return [ambiguous("A comma could be part of a keyword or a separator. Put one negative keyword on each line.")];
        if (original.startsWith("-") || original.startsWith("+"))
            return [ambiguous("Leading search operators are outside this simulator. Enter the keyword without an operator.")];
        const opensQuote = original.startsWith('"');
        const closesQuote = original.endsWith('"');
        const opensBracket = original.startsWith("[");
        const closesBracket = original.endsWith("]");
        if ((opensQuote !== closesQuote) || (opensBracket !== closesBracket) || (opensQuote && opensBracket) || (closesQuote && closesBracket)) {
            return [malformed("Use one complete pair of double quotes for phrase match or square brackets for exact match.")];
        }
        let type = "broad";
        let text = original;
        if (opensQuote && closesQuote) {
            type = "phrase";
            text = original.slice(1, -1).trim();
        }
        else if (opensBracket && closesBracket) {
            type = "exact";
            text = original.slice(1, -1).trim();
        }
        if (!text)
            return [malformed("A negative keyword needs at least one term.")];
        if (/[[\]"]/u.test(text))
            return [malformed("Use match-type markers only around the whole negative keyword.")];
        if (!/^[\p{L}\p{M}\p{N}.\s]+$/u.test(text) || !tokenize(text).length) {
            return [ambiguous("This symbol or punctuation pattern is outside the supported text rules.")];
        }
        return [{ line, original, keyword: { text, type } }];
    });
}
function matchNegative(queryText, negative) {
    const words = tokenize(queryText);
    const queryWords = words.slice(0, 16);
    const negativeWords = tokenize(negative.text);
    if (!queryWords.length || !negativeWords.length)
        return undefined;
    if (negative.type === "exact") {
        if (words.length === negativeWords.length && queryWords.length === words.length && words.every((word, index) => word === negativeWords[index])) {
            return "Exact: every term matches in order, with no extra query terms.";
        }
        return undefined;
    }
    if (negative.type === "phrase") {
        const startsAt = queryWords.findIndex((_, index) => negativeWords.every((word, offset) => queryWords[index + offset] === word));
        return startsAt >= 0 ? `Phrase: the full phrase appears in order at query word ${startsAt + 1}.` : undefined;
    }
    const allFound = negativeWords.every((word) => queryWords.includes(word));
    return allFound ? "Broad: all negative terms appear in the query; order does not matter." : undefined;
}
export function runPreflight(querySource, negativeSource) {
    const parsedNegatives = parseNegatives(negativeSource);
    const usableNegatives = parsedNegatives.filter((item) => Boolean(item.keyword));
    const hasNeedsReview = parsedNegatives.some((item) => Boolean(item.issue));
    const queries = parseQueries(querySource).map((query) => {
        if (!/^[\p{L}\p{M}\p{N}.\s]+$/u.test(query.text) || !tokenize(query.text).length) {
            return { query, blocks: [], status: "needs-review", issue: "The query contains a symbol or punctuation pattern outside the supported text rules." };
        }
        const blocks = usableNegatives.flatMap(({ keyword }) => {
            const explanation = matchNegative(query.text, keyword);
            return explanation ? [{ negative: keyword, explanation }] : [];
        });
        if (blocks.length)
            return { query, blocks, status: query.mustKeep ? "launch-review" : "warning" };
        if (hasNeedsReview)
            return { query, blocks: [], status: "needs-review", issue: "One or more negative lines could not be safely simulated." };
        return { query, blocks: [], status: "clear" };
    });
    const blocked = queries.filter((item) => item.blocks.length > 0).length;
    return {
        queries,
        negatives: parsedNegatives,
        summary: {
            blocked,
            protected: queries.filter((item) => item.status === "launch-review").length,
            needsReview: parsedNegatives.filter((item) => Boolean(item.issue)).length,
            clear: queries.filter((item) => item.status === "clear").length,
        },
    };
}
export function comparePreflight(querySource, currentNegatives, proposedNegatives) {
    const current = runPreflight(querySource, currentNegatives);
    const proposed = runPreflight(querySource, proposedNegatives);
    return {
        ...proposed,
        queries: proposed.queries.map((result, index) => {
            const before = current.queries[index];
            const hadMatch = before.blocks.length > 0;
            const hasMatch = result.blocks.length > 0;
            if (before.status === "needs-review" || result.status === "needs-review")
                return { ...result, change: "uncertain" };
            if (hasMatch)
                return { ...result, change: hadMatch ? "existing-conflict" : "new-conflict" };
            return { ...result, change: hadMatch ? "restored" : "unchanged" };
        }),
    };
}
