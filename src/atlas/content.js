export const roles = {
  apm: {
    company: "Revspot.ai",
    title: "Associate Product Manager",
    date: "September 2026 — Present",
    place: "Bengaluru, India",
    intro:
      "I work on Spot, Revspot’s AI advertising product, turning campaign problems into AI-agent workflows, product requirements, and decisions teams can trust.",
    context: "Current product practice",
    themes: [
      {
        title: "Make launches correct",
        text: "Trace gaps between a campaign plan and what reaches an ad platform, then turn failures in setup, targeting, budgets and permissions into safer launch flows.",
        flow: ["Plan", "Launch path", "Platform reality"],
      },
      {
        title: "Test the workflow, not the demo",
        text: "Design structured evaluations and experiments for AI-agent advertising workflows so the team can see what improved, what failed and what to change next.",
      },
      {
        title: "Build a decision-grade view",
        text: "Build reporting for revenue, customer performance, and operational quality, with clear data rules that make product decisions more reliable.",
      },
      {
        title: "Find missed opportunities",
        text: "Define quality-analysis workflows for automated and human sales conversations, surfacing missed qualification signals and product improvements.",
      },
      {
        title: "Support Google Ads decisions",
        text: "Shape product capabilities across keyword research, campaign workflows, negative keywords, and match-type guidance.",
      },
    ],
  },
  intern: {
    company: "Revspot.ai",
    title: "Product Management Intern",
    date: "June — August 2026",
    place: "Bengaluru, India",
    intro:
      "Translated recurring advertising problems into AI skills, product specifications, evaluation frameworks, and reusable workflows before moving into the APM role.",
    context: "Earlier at Revspot",
    themes: [
      {
        title: "Finding recurring problems",
        text: "Identified recurring advertising workflow problems and translated them into product specifications and reusable workflows.",
        flow: ["Workflow problem", "Specification", "Reusable workflow"],
      },
      {
        title: "Campaign analysis",
        text: "Worked across lead generation, targeting, creative analysis, funnel performance, and budget tracking to inform product decisions.",
      },
    ],
  },
  gro: {
    company: "GroGoliath",
    title: "Social Media Manager",
    date: "June — August 2024",
    place: "Earlier marketing work",
    intro:
      "Worked on social media planning, performance reporting, and email campaigns for client accounts.",
    context: "Marketing experience",
    themes: [
      {
        title: "Planning for an audience",
        text: "Managed social media strategy and content for two client accounts.",
        flow: ["Audience", "Content plan", "Performance review"],
      },
      {
        title: "Learning from performance",
        text: "Used reporting and campaign analysis to inform marketing activity, including an email campaign.",
      },
    ],
  },
};
export const projects = {
  feedback: {
    id: "feedback",
    title: "Feedback → Decision",
    type: "Discovery & prioritisation",
    subtitle: "Turning scattered feedback into a defensible next step.",
    question:
      "How can recurring public feedback become one defensible product bet?",
    slips: ["Setup takes too long.", "I don’t know what to do next."],
    problem: "New users cannot find their first useful action.",
    test: "Try a guided first task.",
    context: "A study in deciding what to build.",
    connection:
      "My product work includes turning operational problems into requirements. This independent study makes that reasoning visible using public feedback.",
    deliverables: [
      "Public evidence map",
      "Prioritisation memo",
      "Prototype & next test",
    ],
    steps: [
      "Collect public issues from one product and one user workflow.",
      "Group the evidence into themes and retain the original source links.",
      "Compare alternatives and write a decision memo.",
      "Prototype the proposed improvement and define the next test.",
    ],
  },
  funnel: {
    id: "funnel",
    title: "Where the Funnel Breaks",
    type: "Analytics & experimentation",
    subtitle: "From a drop-off in the data to a testable product hypothesis.",
    question:
      "Where does an ecommerce journey lose intent, and what should be tested first?",
    slips: [
      "Product viewed. No cart added.",
      "Checkout started. Order unfinished.",
    ],
    problem: "Where does a shopper lose intent?",
    test: "Test one clearer next step.",
    context: "A study in turning signals into a test.",
    connection:
      "Funnel and attribution questions inform my current work. This independent study uses public demo data to distinguish an observation from an explanation.",
    deliverables: [
      "Funnel definition & analysis",
      "Experiment brief",
      "Improved-flow prototype",
    ],
    steps: [
      "Define a narrow ecommerce funnel using public demo data.",
      "Inspect the drop-off and one relevant user segment.",
      "Develop competing explanations without claiming causation.",
      "Write an experiment brief and prototype the change.",
    ],
  },
  ai: {
    id: "ai",
    title: "Should This AI Ship?",
    type: "AI product quality",
    subtitle: "Making quality and release decisions for an AI product.",
    question:
      "What evidence should a team need before releasing an AI recommendation feature?",
    slips: ["The answer looks confident.", "Is the evidence good enough?"],
    problem: "A plausible answer can still be wrong.",
    test: "Evaluate before a limited rollout.",
    context: "A study in knowing when to release.",
    connection:
      "My current role includes structured AI workflow evaluation. This independent study explores release decisions using fictional scenarios, with no employer data.",
    deliverables: [
      "Sample scenario set",
      "Evaluation rubric",
      "Release-review prototype",
    ],
    steps: [
      "Define a fictional assistant and the decision it supports.",
      "Write ordinary, ambiguous, and risky scenarios.",
      "Define evaluation criteria and release-blocking failures.",
      "Prototype the review, rollout, and rollback process.",
    ],
  },
};
export const essays = [
  {
    title: "What the funnel couldn’t tell me",
    question:
      "An observed drop-off tells us where to look. How do we decide what to change?",
    project: "funnel",
    label: "Proposed essay",
  },
  {
    title: "From feedback to a product decision",
    question:
      "When every request sounds important, what evidence makes one next step defensible?",
    project: "feedback",
    label: "Planned essay",
  },
];
export const archive = [
  {
    title: "Tender Amendment Review",
    type: "Independent product case study",
    text: "Replay real UK tender amendments and trace which bid approvals need another look.",
    demo: "/demos/tender-amendment-review/index.html",
  },
  {
    title: "Negative Keyword Preflight",
    type: "Independent product tool",
    text: "Compare current and proposed negative lists to spot newly introduced conflicts on searches you need to keep.",
    demo: "/demos/negative-keyword-preflight/index.html",
  },
  {
    title: "Conversion Discrepancy Triage",
    type: "Independent product tool",
    text: "Compare two conversion reports and identify the next check supported by the evidence.",
    demo: "/demos/conversion-discrepancy-triage/index.html",
  },
  {
    title: "TrendSage Lite",
    type: "NLP & news analysis",
    text: "An NLP pipeline and Streamlit dashboard for exploring sentiment and named entities across 60+ headlines from 30+ countries.",
    url: "https://github.com/Anirudh0304/TrendSage-Lite",
  },
  {
    title: "XAI Governance",
    type: "Explainability & model risk",
    text: "A credit-risk system combining tree-based models, SHAP, fairness metrics, drift detection, and governance checks.",
  },
  {
    title: "QuantPEGY",
    type: "Data & financial modelling",
    text: "A factor-based portfolio construction project exploring fundamental signals and macroeconomic context.",
    url: "https://github.com/Anirudh0304/QuantPEGY",
  },
  {
    title: "SQL Data Warehouse",
    type: "Data engineering",
    text: "A data warehousing project using ETL, dimensional modelling, and SQL reporting.",
    url: "https://github.com/Anirudh0304/sql-data-warehouse-project",
  },
  {
    title: "Uber Analysis Dashboard",
    type: "Business intelligence",
    text: "A Power BI exploration of ride demand, time patterns, and trip data.",
    url: "https://github.com/Anirudh0304/Uber-Data-Analysis",
  },
  {
    title: "HR Analytics",
    type: "SQL & Power BI",
    text: "An exploration of absenteeism data and associated factors.",
    url: "https://github.com/Anirudh0304/HR-Analytics",
  },
  {
    title: "Task Manager",
    type: "Application development",
    text: "A Django task-management application with CRUD operations and authentication.",
    url: "https://github.com/Anirudh0304/Task-Manager",
  },
];

// Technical descriptions retained from the original portfolio; no performance claims.
export const previousDetails = {
  "Tender Amendment Review": {
    stack: ["Find a Tender OCDS releases", "Python data replay", "JavaScript", "Deterministic approval rules"],
    sections: [
      {
        id: "project-idea",
        title: "The decision",
        paragraphs: [
          "A bid manager has already agreed to pursue a tender. When the buyer publishes a revision, somebody must decide whether to revisit the commercial case, shift the submission plan, or leave both as they are. I focused this independent project on that decision and used a fictional bid team to make its assumptions explicit.",
          "I compared the idea with notice alerts, side-by-side diffs, and bid management tools that already extract requirements and support bid/no-bid reviews. The narrower product hypothesis was that a team could record the fields each approval depends on, then reopen only the approvals touched by a verified change.",
        ],
        links: [
          ["AutogenAI project workflow", "https://support.autogenai.com/hc/en-gb/articles/6397465843999-Creating-a-new-project"],
        ],
      },
      {
        id: "project-evidence",
        title: "What changed",
        paragraphs: [
          "In the British Council’s Tech Staff Augmentation tender, the published framework estimate moved from £666,666.67 to £9 million and then £45 million. A later revision moved the participation deadline from 30 to 31 March 2026 at 11 a.m. UK time. In the sample workflow, the value correction reopens the bid decision while the date change also reopens the submission plan.",
          "The Print Fulfilment and Mailing Hub tender supplied the counterexample. After a revision moved the submission deadline to 12 December 2025, a subsequent revision changed the outcome notification date alone. The submission deadline stayed in place, and the prose-only change called for human review.",
        ],
        links: [
          ["British Council release history", "https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages/ocds-h6vhtk-05e1c5"],
          ["Print Fulfilment release history", "https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages/ocds-h6vhtk-0514cc"],
        ],
      },
      {
        id: "project-build",
        title: "How the review works",
        paragraphs: [
          "A Python replay compares successive releases within the same procurement stage. The browser preserves the source timestamps and displays London time alongside them. It treats equal instants as the same value and filters each release’s own notice link out of the document comparison. Both notices remain cited.",
          "The review starts with three editable sample approvals. A changed field that matches a dependency produces Reopen. With no matching change, a revised notice note or document pointer produces Cannot assess. The buyer pack remains unverified throughout. A reviewer can add notes and download a brief with the release links, changed values, approval rules, and open questions.",
        ],
        links: [
          ["Open Contracting Data Standard release model", "https://standard.open-contracting.org/latest/en/primer/releases_and_records/"],
          ["Download the captured comparison data", "/demos/tender-amendment-review/data.json"],
        ],
      },
      {
        id: "project-validation",
        title: "What I validated",
        paragraphs: [
          "The demo replays eight comparisons across two public histories. The structured baseline surfaced the known value and deadline changes. In a separate bounded sample of 300 Find a Tender releases, 13 comparable pairs surfaced mostly document and note changes, with no change to a tracked value or submission deadline. That sample probes data coverage and gives little evidence about how often critical changes occur.",
          "The structured baseline handled the cases I could verify, so I shipped the portfolio prototype with deterministic rules. Buyer portal links and notice metadata could not establish what changed inside the pack. A model comparison and practitioner task test are still open. The next test would ask a bid manager to replay a past amendment with their current tracker and with the demo, then compare time, missed changes, and unnecessary reopenings.",
        ],
      },
    ],
  },
  "Negative Keyword Preflight": {
    stack: ["TypeScript", "Rule-based matching", "Synthetic test cases"],
    idea: "A negative keyword can block a search that a campaign was intended to reach. Review that overlap before approving a launch.",
    build: "Compare two complete list states against the same search set. A rule-level match on a must-keep search calls for launch review. Each query shows whether the conflict is new, existing, removed, or uncertain.",
    interface: "Restore the synthetic sample. Two conflicts are newly introduced, including one must-keep query, and one conflict already existed. Those are demo observations under a bounded text model, with no live ad-delivery test.",
  },
  "Conversion Discrepancy Triage": {
    stack: ["TypeScript", "CSV validation", "Synthetic report fixtures"],
    idea: "Two conversion reports can disagree because they measure different events, dates, or reporting settings. Give marketers a useful next check before they draw conclusions.",
    build: "Validate both CSVs and require daily coverage for the mapped events over the shared dates. An explicit zero counts as data. A missing day withholds a comparison.",
    interface: "Try the synthetic timing mismatch to see a 100 versus 86 comparison and an alignment check. The missing-day sample shows why the tool withholds a result when one source covers only two of three days.",
  },
  "TrendSage Lite": {
    stack: ["Python", "NLP", "Streamlit", "Data visualisation"],
    idea: "Explore news through countries, entities and sentiment.",
    build:
      "Analyse 60+ headlines across 30+ countries, extract geopolitical entities, apply sentiment analysis and connect country selections to related headlines.",
    interface:
      "A Streamlit dashboard brings together country filters, sentiment filters and a world choropleth map.",
  },
  QuantPEGY: {
    stack: [
      "Python",
      "Pandas",
      "Streamlit",
      "PyPortfolioOpt",
      "NumPy",
      "yfinance",
    ],
    idea: "Explore factor-based stock selection with macroeconomic context.",
    build:
      "Combine the PEGY ratio with macro-regime detection for risk-on, risk-off and neutral conditions.",
    interface:
      "A Streamlit interface exposes configuration, an equity-curve view and summary statistics.",
  },
  "XAI Governance": {
    focus: ["XGBoost", "SHAP", "Fairness", "Drift detection"],
    idea: "Explore how a credit-risk model can be understood and governed.",
    build:
      "Train Random Forest and XGBoost models on 1,000 samples, then apply SHAP, fairness metrics, feature selection, drift detection, and governance checks. The reported evaluation reached 78% accuracy and 0.775 ROC-AUC.",
    interface:
      "The project is included as earlier technical work. Additional artifacts will be added when available.",
  },
  "SQL Data Warehouse": {
    stack: ["PostgreSQL", "ETL", "Dimensional modelling"],
    idea: "Turn raw ERP and CRM data into structured reporting data.",
    build:
      "Use Bronze, Silver and Gold layers, ETL pipelines, and a star schema with fact and dimension tables.",
    interface: "SQL reporting makes the modelled data available for analysis.",
  },
  "Uber Analysis Dashboard": {
    stack: ["Power BI", "Power Query", "DAX"],
    idea: "Explore patterns in ride demand and trip data.",
    build: "Prepare ride data and analyse demand across time and location.",
    interface:
      "An interactive Power BI dashboard presents maps, peak-hour patterns and trip measures.",
  },
  "HR Analytics": {
    stack: ["SQL", "Power BI", "Data cleaning"],
    idea: "Explore absenteeism patterns and associated factors.",
    build:
      "Prepare the dataset in SQL and examine absence reasons, BMI, lifestyle and transportation expenses.",
    interface:
      "Power BI views make the relationships visible; observed correlations do not establish causes.",
  },
  "Task Manager": {
    stack: ["Python", "Django", "SQLite", "HTML", "CSS"],
    idea: "Keep personal tasks organised with dates, status and remarks.",
    build:
      "Implement task creation, updates, deletion and tracking with user authentication.",
    interface:
      "Django templates provide forms and task views with due dates, timestamps and status.",
  },
};
