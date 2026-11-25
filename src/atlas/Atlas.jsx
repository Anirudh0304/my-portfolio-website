/* eslint-disable react/prop-types -- These file-local components share the content.js contract. */
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { roles, projects, essays, archive, previousDetails } from "./content";
const trend = "/screenshots/trend.webp";
const quant = "/screenshots/quant.webp";
const sql = "/screenshots/sql.webp";
const uber = "/screenshots/uber.webp";
const hr = "/screenshots/hr.webp";
const task = "/screenshots/task.webp";
import "./atlas.css";
import "./dossier.css";
import "./portfolio-refinement.css";
const email = "kondurianirudh0304@gmail.com";
const siteOrigin = "https://kondurianirudh.netlify.app";
/* Writing stays hidden until one real, published piece exists. Set to true
   to restore the chapter, its navigation entry and its route. */
const showWriting = false;
const chapters = [
  ["/", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ...(showWriting ? [["/writing", "Writing"]] : []),
];
const afterProjects = showWriting
  ? ["/writing", "Continue to Writing", "Earlier builds. Next, the thinking behind the work."]
  : ["/contact", "Let’s talk", "That’s the work so far."];
const featured = ["Tender Amendment Review", "Negative Keyword Preflight"];
const images = {
  "Tender Amendment Review": "/screenshots/tender-amendment-review.webp",
  "Negative Keyword Preflight": "/screenshots/preflight.webp",
  "Conversion Discrepancy Triage": "/screenshots/conversion-triage.webp",
  "TrendSage Lite": trend,
  QuantPEGY: quant,
  "SQL Data Warehouse": sql,
  "Uber Analysis Dashboard": uber,
  "HR Analytics": hr,
  "Task Manager": task,
};
const pageTitle = (pathname, projectId) => {
  if (pathname === "/") return "Konduri Anirudh — Product Management";
  if (pathname === "/experience") return "Experience — Konduri Anirudh";
  if (pathname === "/projects") return "Projects — Konduri Anirudh";
  if (pathname === "/writing") return "Writing — Konduri Anirudh";
  if (pathname === "/contact") return "Contact — Konduri Anirudh";
  if (pathname.startsWith("/projects/")) {
    const project =
      projects[projectId] || archive.find((item) => slug(item.title) === projectId);
    return project
      ? `${project.title} — Konduri Anirudh`
      : "Projects — Konduri Anirudh";
  }
  return "Konduri Anirudh — Product Management";
};
const slug = (t) => t.toLowerCase().replaceAll(" ", "-");
const anchor = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const practice = [
  ["Campaign launches", "Turn setup, targeting and budget problems into safer launch flows."],
  ["AI workflow evaluation", "Use structured evaluations to see what works and what needs to change."],
  ["Reporting quality", "Define reliable measures for revenue, performance and operational quality."],
].map(([title, text], index) => ({
  title,
  text,
  to: `/experience#${anchor(roles.apm.themes[index].title)}`,
}));
const Journey = createContext(null);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktopLayout = () => matchMedia("(min-width: 60.0625em)").matches;
const ease = "cubic-bezier(.77,0,.175,1)";
function Arrow({ direction = "out" }) {
  return (
    <svg className="arrow" aria-hidden="true" viewBox="0 0 24 24">
      <path
        d={
          direction === "left"
            ? "M21 12H3m8-8-8 8 8 8"
            : direction === "right"
              ? "M3 12h18m-8-8 8 8-8 8"
              : "M4 20 20 4M5 4h15v15"
        }
      />
    </svg>
  );
}
function Go({ to, children, className = "", ...rest }) {
  const travel = useContext(Journey);
  return (
    <Link
      to={to}
      className={className}
      {...rest}
      onClick={(e) => {
        if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        e.preventDefault();
        travel(to, e.detail > 0, e.currentTarget);
      }}
    >
      {children}
    </Link>
  );
}
function Action({ to, children }) {
  return (
    <Go to={to} className="action">
      {children} <Arrow direction="right" />
    </Go>
  );
}
function Insert() {
  return (
    <img
      className="insert-material"
      onError={(event) => {
        event.currentTarget.hidden = true;
      }}
      src="/materials/insert.webp"
      alt=""
      aria-hidden="true"
    />
  );
}
function Label({ children }) {
  return <p className="print-label">{children}</p>;
}
function Material() {
  return (
    <img
      className="paper"
      onError={(event) => {
        event.currentTarget.hidden = true;
        event.currentTarget.parentElement?.classList.add("paper-unavailable");
      }}
      src="/materials/paper.webp"
      alt=""
      aria-hidden="true"
    />
  );
}
function Navigation({ mobile = false }) {
  const { pathname } = useLocation();
  return (
    <nav aria-label={mobile ? "Mobile chapters" : "Chapters"}>
      {chapters.map(([url, title], i) => (
        <Go
          key={url}
          to={url}
          aria-current={
            (url === "/" ? pathname === "/" : pathname.startsWith(url))
              ? "page"
              : undefined
          }
        >
          <span className="chapter-number">0{i + 1}</span>
          <span>{title}</span>
        </Go>
      ))}
    </nav>
  );
}
function Header() {
  const location = useLocation();
  return (
    <div className="site-header">
      <header className="masthead">
        {location.pathname === "/" ? (
          <Go className="brand brand-mark" to="/" aria-label="Konduri Anirudh, home">
            KA
          </Go>
        ) : (
          <Go className="brand" to="/" aria-label="Konduri Anirudh, home">
            <span className="desktop-brand">Konduri Anirudh</span>
            <span className="mobile-brand">KA</span>
          </Go>
        )}
        <span className="mobile-specialty">Product management</span>
        <span className="discipline">Product · AI workflows · Analytics</span>
        <div className="utilities">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé <Arrow />
          </a>
          <Go to="/contact" aria-current={location.pathname === "/contact" ? "page" : undefined}>
            Contact <Arrow direction="right" />
          </Go>
        </div>
      </header>
    </div>
  );
}
function DossierTabs() {
  const { pathname } = useLocation();
  return (
    <nav className="dossier-tabs" aria-label="Mobile chapters">
      {chapters.map(([url, title]) => (
        <Go key={url} to={url} aria-current={(url === "/" ? pathname === "/" : pathname.startsWith(url)) ? "page" : undefined}>
          <span>{title}</span>
        </Go>
      ))}
    </nav>
  );
}
function DossierLocation() {
  const { pathname } = useLocation();
  const chapter = pathname === "/contact" ? ["/contact", "Contact"]
    : chapters.find(([url]) => url === "/" ? pathname === "/" : pathname.startsWith(url));
  return (
    <nav className="dossier-location" aria-label="Current chapter">
      <Go to={chapter?.[0] || "/"}>{chapter?.[1] || "Portfolio"}</Go>
      <span aria-hidden="true" />
    </nav>
  );
}
function Index() {
  return (
    <aside className="index" aria-label="Portfolio navigation">
      <Label>Explore</Label>
      <Navigation />
      <p className="signature">
        <span>Based in</span>
        Bengaluru, India
      </p>
    </aside>
  );
}
function Footer({ to, title, children }) {
  const { pathname } = useLocation();
  const back = pathname.startsWith("/projects/")
    ? ["/projects", "Projects"]
    : {
        "/experience": ["/", "About"],
        "/projects": ["/experience", "Experience"],
        "/writing": ["/projects", "Projects"],
        "/contact": showWriting ? ["/writing", "Writing"] : ["/projects", "Projects"],
      }[pathname] || ["/", "About"];
  return (
    <footer className="folio">
      <Go to={back[0]} className="previous-chapter">
        <Arrow direction="left" />
        {back[1]}
      </Go>
      <span>{children || "Continue the journey"}</span>
      <Action to={to}>{title}</Action>
    </footer>
  );
}
function Home() {
  const [portraitFailed, setPortraitFailed] = useState(false);
  return (
    <>
      <div className="centre home-centre">
        <div className="home-identity">
          <h1 tabIndex={-1}>
            Konduri
            <br />
            Anirudh
          </h1>
          <p className="mobile-intro-role">Associate Product Manager at <strong>Revspot.ai</strong></p>
        </div>
        {portraitFailed ? (
          <p
            className="portrait portrait-unavailable"
            role="img"
            aria-label="Portrait of Konduri Anirudh unavailable"
          >
            Portrait unavailable
          </p>
        ) : (
          <img
            className="portrait"
            src="/materials/portrait.webp"
            alt="Portrait of Konduri Anirudh"
            width="659"
            height="696"
            onError={() => setPortraitFailed(true)}
          />
        )}
        <div className="home-bio">
          <p className="home-lede">
            I build and evaluate AI workflows for advertising.
          </p>
        </div>
        <div className="home-invitation">
          <Action to="/projects">See selected work</Action>
        </div>
      </div>
      <section className="folio home-folio" aria-label="Selected work">
        <span>Start with</span>
        <nav className="proof-links" aria-label="Selected work links">
          {featured.map((title) => (
            <Go key={title} to={`/projects/${slug(title)}`}>
              {title} <Arrow direction="right" />
            </Go>
          ))}
        </nav>
      </section>
      <section className="dossier-feature" aria-label="Featured project">
        <Go to={`/projects/${slug(featured[0])}`}>
          <h2>{featured[0]}</h2>
          <Arrow direction="right" />
        </Go>
      </section>
      <aside className="right-fold home-current" aria-label="Current product work">
        <Label>Current work</Label>
        {practice.map(({ title, text, to }) => (
          <section key={title}>
            <h2><Go to={to}>{title}</Go></h2>
            <p>{text}</p>
          </section>
        ))}
      </aside>
    </>
  );
}
function Experience() {
  const [query] = useSearchParams();
  const requestedRole = query.get("role");
  const id = Object.hasOwn(roles, requestedRole) ? requestedRole : "apm";
  const role = roles[id];
  return (
    <>
      <article className="centre chapter experience">
        <h1 tabIndex={-1}>Experience</h1>
        <nav className="mobile-role-picker" aria-label="Choose experience">
          {Object.entries(roles).map(([key, item]) => (
            <Go key={key} to={`/experience?role=${key}`} aria-current={id === key ? "true" : undefined}>
              {key === "apm" ? "Product" : key === "intern" ? "Internship" : "Marketing"}
              <span className="visually-hidden">: {item.company}, {item.title}</span>
            </Go>
          ))}
        </nav>
        <div className="role-heading">
          <h2>{role.company}</h2>
          <h3>{role.title}</h3>
          <p className="small">
            {role.date} · {role.place}
          </p>
        </div>
        <p className="lead">{id === "apm" ? "I work on Spot, Revspot’s AI advertising product." : role.intro}</p>
        {id === "apm" && <div className="mobile-overview-jump">
          <Action to="/experience#all-work-areas">Explore all five work areas</Action>
        </div>}
        {id === "apm" && <nav className="practice-index" aria-label="Current product work">
          {practice.map(({ title, text, to }) => (
            <Go key={title} to={to}>
              <strong>{title}</strong>
              <span>{text}</span>
              <Arrow direction="right" />
            </Go>
          ))}
        </nav>}
        <details className="experience-details" key={id} open={id !== "apm" || undefined}>
          <summary>{id === "apm" ? "All five areas of my work" : "Work in this role"}</summary>
          <div className="themes" id={id === "apm" ? "all-work-areas" : undefined} tabIndex={id === "apm" ? -1 : undefined}>
          {role.themes.map((theme, i) => (
            <section key={theme.title} id={anchor(theme.title)} tabIndex={-1}>
              <span className="theme-number">0{i + 1}</span>
              <div>
                <h3>
                  {theme.title}
                </h3>
                <p>{theme.text}</p>
              </div>
            </section>
          ))}
          </div>
        </details>
      </article>
      <aside className="right-fold role-history" aria-label="Other roles and education">
        <Label>{id === "apm" ? "Earlier chapters" : "Other chapters"}</Label>
        {Object.entries(roles)
          .filter(([key]) => key !== id)
          .map(([key, item]) => (
            <section key={key}>
              <h2>{item.company}</h2>
              <p>{item.title}</p>
              <p className="small">{item.date}</p>
              <Action to={`/experience?role=${key}`}>
                {key === "apm" ? "View product role" : key === "intern" ? "View internship" : "View marketing role"}
              </Action>
            </section>
          ))}
        <p className="annotation">
          A progression from marketing to product practice.
        </p>
        <section className="education-note">
          <Label>Education</Label>
          <h2>Vellore Institute of Technology</h2>
          <p>B.Tech, Computer Science &amp; Engineering (Data Science)</p>
          <p className="small">May 2026</p>
        </section>
      </aside>
      <Footer to="/projects" title="Explore the projects" />
    </>
  );
}
function ComingNext() {
  return (
    <aside className="project-studies coming-next" aria-label="Studies in development">
      <Label>In development</Label>
      <p className="small">Independent product studies.</p>
      <ul>
        {Object.values(projects).map((p) => (
          <li key={p.id}>
            <Go to={`/projects/${p.id}`}>{p.title}</Go>
            <p className="study-summary">{p.subtitle}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function Projects() {
  return (
    <>
      <article className="centre chapter projects-chapter">
        <h1 tabIndex={-1}>Projects</h1>
        <p className="projects-intro">
          Independent projects on evidence review, ad launches, and conversion reporting.
        </p>
        <div className="mobile-overview-jump">
          <Action to="/projects#more-projects">Browse earlier projects</Action>
        </div>
        <div className="previous-featured selected-work">
          {featured.map((name) => {
            const p = archive.find((item) => item.title === name);
            return (
              <article key={name}>
                <h2>{name}</h2>
                <p>{p.text}</p>
                {images[name] && <Go to={`/projects/${slug(name)}`} className="preview-image">
                  <Screenshot
                    key={images[name]}
                    data-project-image={slug(name)}
                    src={images[name]}
                    alt={`${name} demo screenshot`}
                    loading="lazy"
                  />
                </Go>}
                <Go to={`/projects/${slug(name)}`} className="action" aria-label={`View ${name} project`}>
                  View project <Arrow direction="right" />
                </Go>
              </article>
            );
          })}
        </div>
      </article>
      <aside className="right-fold project-discovery" aria-label="Other finished projects">
        <Label>Also in the archive</Label>
        {archive.filter((item) => ["XAI Governance", "SQL Data Warehouse"].includes(item.title)).map((item) => (
          <section key={item.title}>
            <h2><Go to={`/projects/${slug(item.title)}`}>{item.title}</Go></h2>
            <p>{item.type}</p>
          </section>
        ))}
      </aside>
      <nav className="catalogue-continuation" aria-label="Continue through projects">
        <Action to="/projects#more-projects">See more projects</Action>
      </nav>
      <section className="previous-spread" id="more-projects" tabIndex={-1}>
        <Material />
        <div className="previous-inner">
          <header className="previous-heading">
            <h2>More projects</h2>
          </header>
          <div className="project-register">
            {archive
              .filter((item) => !featured.includes(item.title))
              .map((item) => (
                <article key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="project-summary">{item.text}</p>
                  </div>
                  <span>{item.type}</span>
                  <Go to={`/projects/${slug(item.title)}`} className="action" aria-label={`View ${item.title} project`}>
                    View project <Arrow direction="right" />
                  </Go>
                </article>
              ))}
          </div>
          <ComingNext />
        </div>
        <Footer to={afterProjects[0]} title={afterProjects[1]}>
          {afterProjects[2]}
        </Footer>
      </section>
    </>
  );
}
function Writing() {
  return (
    <>
      <article className="centre chapter writing">
        <h1 tabIndex={-1}>Writing</h1>
        <p className="lead">Notes on the questions behind the work.</p>
        <div className="manuscript">
          <span className="small">Proposed essay · Not yet published</span>
          <h2>{essays[0].title}</h2>
          <p>{essays[0].question}</p>
        </div>
        <div className="outline">
          <Insert />
          <Label>Proposed outline</Label>
          <p>What did the data actually show?</p>
          <p>What explanations are still possible?</p>
          <p>What would I test next?</p>
        </div>
        <p className="annotation">
          Writing will appear here as the independent studies develop.
        </p>
      </article>
      <aside className="right-fold writing-next" aria-label="More planned writing">
        <Label>Also taking shape</Label>
        <h2>{essays[1].title}</h2>
        <p>{essays[1].question}</p>
        <span className="small">Planned essay</span>
        <div className="related">
          <p>Related independent study</p>
          <Action to="/projects/feedback">Feedback → Decision</Action>
        </div>
      </aside>
      <Footer to="/contact" title="Let’s talk" />
    </>
  );
}
function Contact() {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email address copied.");
    } catch {
      setStatus(
        "Select the email address above to copy it, or use Open email.",
      );
    }
  }
  return (
    <>
      <article className="centre chapter contact">
        <h1 tabIndex={-1}>Let’s talk.</h1>
        <p className="lead">
          For a conversation about product, data, or something worth building.
        </p>
        <div className="correspondence">
          <Insert />
          <Label>To / Anirudh</Label>
          <a className="email-address" href={`mailto:${email}`}>
            {email.split("@")[0]}
            <wbr />@{email.split("@")[1]}
          </a>
          <div className="email-actions">
            <a className="action" href={`mailto:${email}`}>
              Open email <Arrow />
            </a>
            <button className="text-button" onClick={copy}>
              Copy address
            </button>
          </div>
          <p role="status" className="copy-status">
            {status}
          </p>
        </div>
      </article>
      <aside className="right-fold contact-links" aria-label="Profiles and résumé">
        <Label>Elsewhere</Label>
        <a
          href="https://www.linkedin.com/in/konduri-anirudh/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <Arrow />
        </a>
        <a
          href="https://github.com/Anirudh0304"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Arrow />
        </a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Résumé <Arrow />
        </a>
      </aside>
      <Footer to="/" title="Back to the beginning" />
    </>
  );
}
function Screenshot({ src, alt, onUnavailable, onAvailable, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span
        className="media-unavailable"
        role="img"
        aria-label={`${alt}. Image unavailable.`}
      >
        Screenshot unavailable
      </span>
    );
  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      onLoad={onAvailable}
      onError={() => {
        setFailed(true);
        onUnavailable?.();
      }}
    />
  );
}
function ProjectDetail() {
  const { id } = useParams();
  const planned = Object.hasOwn(projects, id) ? projects[id] : undefined;
  const earlier = archive.find((item) => slug(item.title) === id);
  const dialog = useRef(null);
  const imageTrigger = useRef(null);
  const [failedImage, setFailedImage] = useState(null);
  if (!planned && !earlier) return <NotFound />;
  const item = planned || earlier;
  const detail = previousDetails[item.title];
  const sections = detail?.sections ?? (detail ? [
    { id: "project-idea", title: "The idea", paragraphs: [detail.idea] },
    { id: "project-build", title: "The build", paragraphs: [detail.build] },
    { id: "project-interface", title: "The interface", paragraphs: [detail.interface] },
  ] : []);
  const ordered = [
    ...featured,
    ...archive
      .filter((p) => !featured.includes(p.title))
      .map((p) => p.title),
  ];
  const nextTitle = ordered[ordered.indexOf(item.title) + 1];
  const image = images[item.title];
  const imageFailed = !!image && failedImage === image;
  return (
    <>
      <article
        className={`centre chapter project-detail ${planned ? "planned-detail" : ""}`}
      >
        <Go to="/projects" className="back-link">
          <Arrow direction="left" /> All projects
        </Go>
        <h1 tabIndex={-1}>{item.title}</h1>
        <p className="lead">{planned ? item.subtitle : item.text}</p>
        {item.demo && <a className="action project-demo" href={item.demo} target="_blank" rel="noreferrer">
          Try the demo <span className="visually-hidden">(opens in a new tab)</span><Arrow />
        </a>}
        {planned ? (
          <>
            <p className="development">Independent project · In development</p>
            <h2>The question</h2>
            <p>{item.question}</p>
            <h2>The process</h2>
            <ol>
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="annotation">
              Planned work. Completed research, prototypes and results will be
              added when available.
            </p>
          </>
        ) : (
          <>
            <nav className="mobile-project-contents" aria-label="Jump to project section">
              {sections.map(({ id: key, title }) => (
                <Link key={key} to={`/projects/${id}#${key}`}>{title}</Link>
              ))}
            </nav>
            {image && (
              <button
                className="detail-image"
                ref={imageTrigger}
                onClick={() => dialog.current.showModal()}
                disabled={imageFailed}
                aria-label={
                  imageFailed
                    ? `${item.title} screenshot unavailable`
                    : `Enlarge ${item.title} screenshot`
                }
              >
                <Screenshot
                  key={image}
                  onUnavailable={() => setFailedImage(image)}
                  onAvailable={() => setFailedImage(null)}
                  data-project-image={id}
                  src={image}
                  alt={`${item.title} application screenshot`}
                />
                <span>
                  {imageFailed ? (
                    "Screenshot unavailable"
                  ) : (
                    <>
                      Enlarge screenshot <Arrow />
                    </>
                  )}
                </span>
              </button>
            )}
            <div className="detail-sections">
              {sections.map(({ id: key, title, paragraphs, links }) => (
                <section id={key} key={key} tabIndex={-1}>
                  <h2>{title}</h2>
                  {paragraphs.map((text) => <p key={text}>{text}</p>)}
                  {links && (
                    <ul>
                      {links.map(([label, href]) => (
                        <li key={href}><a href={href}>{label}</a></li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </>
        )}
      </article>
      <aside className="right-fold detail-aside" aria-label={planned ? "Planned project artifacts" : "Project details"}>
        <Label>{planned ? "Planned artifacts" : "Project contents"}</Label>
        {planned ? (
          <>
            <ul>
              {item.deliverables.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <p>{item.connection}</p>
          </>
        ) : (
          <>
            <nav className="in-project" aria-label="Project contents">
              {sections.map(({ id: key, title }) => (
                <Link key={key} to={`/projects/${id}#${key}`}>
                  {title}
                </Link>
              ))}
            </nav>
            <div className="built-with">
              <Label>{detail.stack ? "Built with" : "Focus"}</Label>
              <ul>
                {(detail.stack || detail.focus).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            {item.url && (
              <a
                className="action"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                View source <Arrow />
              </a>
            )}
            <p className="annotation">{detail.sections ? item.type : "Previous project"}</p>
          </>
        )}
      </aside>
      <Footer
        to={
          !planned && nextTitle ? `/projects/${slug(nextTitle)}` : "/projects"
        }
        title={!planned && nextTitle ? `Next / ${nextTitle}` : "All projects"}
      >
        {planned ? "Independent study · In development" : item.demo ? "Independent prototype" : "Finished project"}
      </Footer>
      {image && (
        <dialog
          className="image-dialog"
          ref={dialog}
          onClose={() => imageTrigger.current?.focus({ preventScroll: true })}
          aria-label={`${item.title} screenshot`}
        >
          <button
            className="dialog-close"
            onClick={() => dialog.current.close()}
            autoFocus
          >
            Close screenshot{" "}
            <svg className="arrow" aria-hidden="true" viewBox="0 0 24 24">
              <path d="m5 5 14 14M5 19 19 5" />
            </svg>
          </button>
          <Screenshot
            key={image}
            src={image}
            alt={`${item.title} enlarged application screenshot`}
          />
        </dialog>
      )}
    </>
  );
}
function NotFound() {
  return (
    <>
      <article className="centre chapter">
        <h1 tabIndex={-1}>A missing page.</h1>
        <p className="lead">This address doesn’t lead to a chapter.</p>
        <Action to="/">Return to About</Action>
      </article>
      <Footer to="/projects" title="Browse the projects" />
    </>
  );
}
function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();
  const sheet = useRef(null);
  const overlay = useRef(null);
  const positions = useRef(new Map());
  const entryKey = `${location.key}:${location.pathname}${location.search}${location.hash}`;
  const previous = useRef(entryKey);
  const active = useRef([]);
  const intro = useRef(false);
  useLayoutEffect(() => {
    const page = sheet.current;
    if (location.pathname !== "/projects" || !page) return;
    const footer = page.querySelector(".catalogue-continuation");
    if (!footer) return;
    const measure = () => {
      const height =
        footer.getBoundingClientRect().bottom -
        page.getBoundingClientRect().top;
      if (height > 0)
        page.style.setProperty("--opening-height", `${Math.ceil(height)}px`);
    };
    measure();
    const observer =
      typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    [
      page,
      footer,
      page.querySelector(".centre"),
      page.querySelector(".masthead"),
    ]
      .filter(Boolean)
      .forEach((element) => observer?.observe(element));
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      page.style.removeProperty("--opening-height");
    };
  }, [location.pathname]);
  function clearMotion() {
    sheet.current?.classList.remove("is-opening");
    active.current.forEach((a) => a.cancel());
    active.current = [];
    overlay.current?.replaceChildren();
  }
  function makeLeaves() {
    const rect = sheet.current.getBoundingClientRect();
    return [
      [0.2, 0.58],
      [0.78, 0.22],
    ].map(([left, width]) => {
      const leaf = document.createElement("div");
      leaf.className = "motion-leaf";
      leaf.inert = true;
      leaf.setAttribute("aria-hidden", "true");
      Object.assign(leaf.style, {
        left: `${rect.left + rect.width * left}px`,
        top: `${rect.top}px`,
        width: `${rect.width * width}px`,
        height: `${Math.min(rect.height, (rect.width * 2) / 3)}px`,
        transformOrigin: "left center",
      });
      const copy = sheet.current.cloneNode(true);
      copy.removeAttribute("id");
      copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      Object.assign(copy.style, {
        width: `${rect.width}px`,
        margin: "0",
        position: "absolute",
        left: `${-rect.width * left}px`,
        top: "0",
      });
      leaf.append(copy);
      overlay.current.append(leaf);
      return leaf;
    });
  }
  function makeMobilePage() {
    const page = sheet.current?.querySelector(".dossier-body");
    if (!page) return null;
    const rect = page.getBoundingClientRect();
    const visibleHeight = Math.min(rect.height, window.innerHeight - rect.top);
    if (visibleHeight <= 0 || rect.top < 0) return null;
    const wrapper = document.createElement("div");
    wrapper.className = "mobile-page-turn";
    wrapper.inert = true;
    wrapper.setAttribute("aria-hidden", "true");
    Object.assign(wrapper.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${visibleHeight}px`,
    });
    const bandCount = 7;
    const bandHeight = visibleHeight / bandCount;
    const bands = Array.from({ length: bandCount }, (_, index) => {
      const top = index * bandHeight;
      const frame = document.createElement("div");
      frame.className = "mobile-page-band-frame";
      Object.assign(frame.style, {
        top: `${Math.max(0, top - 1)}px`,
        height: `${bandHeight + 2}px`,
      });
      const leaf = document.createElement("div");
      leaf.className = "mobile-page-leaf";
      const front = document.createElement("div");
      front.className = "mobile-page-front";
      const copy = page.cloneNode(true);
      copy.querySelector(".dossier-edge")?.remove();
      copy.removeAttribute("id");
      copy.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
      Object.assign(copy.style, {
        position: "absolute",
        left: "0",
        top: `${-top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        margin: "0",
      });
      front.append(copy);
      const back = document.createElement("div");
      back.className = "mobile-page-back";
      leaf.append(front, back);
      frame.append(leaf);
      wrapper.append(frame);
      return { leaf, index };
    });
    overlay.current.append(wrapper);
    return { wrapper, bands, rect };
  }
  function travel(to, pointer, trigger) {
    if (to === location.pathname + location.search + location.hash) {
      const disclosure = trigger?.closest("details.mobile-explore");
      if (disclosure) {
        disclosure.open = false;
        sheet.current.querySelector("h1")?.focus({ preventScroll: true });
      }
      return;
    }
    positions.current.set(entryKey, window.scrollY);
    clearMotion();
    const source = trigger?.querySelector("img[data-project-image]");
    const sourceRect = source?.getBoundingClientRect();
    const clone = source?.cloneNode(true);
    const animate = pointer && !reduced();
    const changesPage = to.split(/[?#]/)[0] !== location.pathname;
    const mobilePage = animate && changesPage && !desktopLayout() ? makeMobilePage() : null;
    const outgoing = animate && !source && desktopLayout() ? makeLeaves() : [];
    flushSync(() => navigate(to));
    if (mobilePage) {
      const finalX = mobilePage.rect.width * 0.16;
      const finalY = mobilePage.rect.height * -0.16;
      const turns = mobilePage.bands.map(({ leaf, index }) => {
        const fromBottom = mobilePage.bands.length - 1 - index;
        const turn = leaf.animate(
          [
            { transform: "translate3d(0, 0, 0) rotateX(0deg) rotateZ(0deg)" },
            {
              offset: 0.22,
              transform: `translate3d(${finalX * 0.08}px, ${finalY * 0.05}px, 10px) rotateX(8deg) rotateZ(0.2deg)`,
            },
            {
              offset: 0.56,
              transform: `translate3d(${finalX * 0.48}px, ${finalY * 0.46}px, 22px) rotateX(48deg) rotateZ(1.2deg)`,
            },
            {
              transform: `translate3d(${finalX}px, ${finalY}px, 0) rotateX(104deg) rotateZ(3deg)`,
            },
          ],
          {
            duration: 520,
            delay: fromBottom * 18,
            fill: "both",
            easing: "cubic-bezier(.77,0,.175,1)",
          },
        );
        active.current.push(turn);
        return turn.finished;
      });
      Promise.allSettled(turns).then(() => mobilePage.wrapper.remove());
    } else if (animate && clone) {
      const target = sheet.current.querySelector(
        `img[data-project-image="${source.dataset.projectImage}"]`,
      );
      if (target) {
        const rect = target.getBoundingClientRect();
        Object.assign(clone.style, {
          position: "fixed",
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: 30,
          objectFit: "contain",
          pointerEvents: "none",
          transformOrigin: "top left",
        });
        overlay.current.append(clone);
        const a = clone.animate(
          [
            {
              transform: `translate(${sourceRect.left - rect.left}px,${sourceRect.top - rect.top}px) scale(${sourceRect.width / rect.width},${sourceRect.height / rect.height})`,
            },
            { transform: "none" },
          ],
          { duration: 280, easing: ease },
        );
        active.current.push(a);
        a.finished.then(() => clone.remove()).catch(() => {});
      }
    } else
      outgoing.forEach((leaf, i) => {
        const a = leaf.animate(
          [
            { transform: "rotateY(0deg)" },
            { transform: `rotateY(${i ? 95 : -95}deg)` },
          ],
          { duration: 280, easing: ease },
        );
        active.current.push(a);
        a.finished.then(() => leaf.remove()).catch(() => {});
      });
  }
  useLayoutEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    const details = target && target.closest("details.experience-details");
    if (details) details.open = true;
    if (
      previous.current !== entryKey &&
      navType === "POP" &&
      positions.current.has(entryKey)
    ) {
      window.scrollTo(0, positions.current.get(entryKey));
      previous.current = entryKey;
      sheet.current.querySelector("h1")?.focus({ preventScroll: true });
    } else if (location.hash) {
      if (target) {
        target.scrollIntoView();
        target.focus({ preventScroll: true });
      }
      previous.current = entryKey;
    } else if (previous.current !== entryKey) {
      window.scrollTo(
        0,
        navType === "POP" ? positions.current.get(entryKey) || 0 : 0,
      );
      previous.current = entryKey;
      sheet.current.querySelector("h1")?.focus({ preventScroll: true });
    }
    document.title = pageTitle(location.pathname, location.pathname.split("/")[2]);
    const pageUrl = `${siteOrigin}${location.pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", pageUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    try {
      sessionStorage.setItem(
        "portfolio-route",
        location.pathname + location.search,
      );
    } catch {
      /* Storage unavailable. */
    }
  }, [location, navType, entryKey]);
  useEffect(() => {
    const save = () => positions.current.set(previous.current, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);
  useEffect(() => {
    if (intro.current) return;
    intro.current = true;
    let seen = false;
    try {
      seen = sessionStorage.getItem("portfolio-opened");
      sessionStorage.setItem("portfolio-opened", "true");
    } catch {
      seen = true;
    }
    if (seen || reduced() || !desktopLayout()) return;
    const rect = sheet.current.getBoundingClientRect();
    [
      [0, 0.2, 175],
      [0.78, 0.22, -175],
    ].forEach(([left, width, angle], i) => {
      const leaf = document.createElement("div");
      leaf.className = "opening-leaf";
      leaf.inert = true;
      leaf.setAttribute("aria-hidden", "true");
      Object.assign(leaf.style, {
        left: `${rect.left + rect.width * left}px`,
        top: `${rect.top}px`,
        width: `${rect.width * width}px`,
        height: `${(rect.width * 2) / 3}px`,
        transformOrigin: i ? "left center" : "right center",
      });
      const front = document.createElement("div");
      front.className = "leaf-front";
      const copy = sheet.current.cloneNode(true);
      copy.removeAttribute("id");
      copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      Object.assign(copy.style, {
        position: "absolute",
        width: `${rect.width}px`,
        left: `${-rect.width * left}px`,
        margin: "0",
        top: "0",
      });
      front.append(copy);
      const back = document.createElement("div");
      back.className = "leaf-back";
      leaf.append(front, back);
      overlay.current.append(leaf);
      const a = leaf.animate(
        [{ transform: `rotateY(${angle}deg)` }, { transform: "rotateY(0deg)" }],
        { duration: 740, delay: i * 60, fill: "both", easing: ease },
      );
      active.current.push(a);
      a.finished.then(() => leaf.remove()).catch(() => {});
    });
    sheet.current.classList.add("is-opening");
    Promise.allSettled(active.current.map((a) => a.finished)).then(() =>
      sheet.current?.classList.remove("is-opening"),
    );
    const print = sheet.current.querySelector(".centre");
    if (print)
      active.current.push(
        print.animate([{ opacity: 0.12 }, { opacity: 1 }], {
          duration: 380,
          delay: 170,
          easing: "cubic-bezier(.23,1,.32,1)",
        }),
      );
    const interrupt = () => {
      sheet.current?.classList.remove("is-opening");
      active.current.forEach((a) => a.cancel());
      overlay.current?.replaceChildren();
    };
    window.addEventListener("keydown", interrupt, { once: true });
    return () => window.removeEventListener("keydown", interrupt);
  }, []);
  return (
    <Journey.Provider value={travel}>
      <a
        href="#main"
        className="skip"
        onClick={(e) => {
          e.preventDefault();
          sheet.current.querySelector("h1")?.focus();
        }}
      >
        Skip to content
      </a>
      <main
        id="main"
        className={`sheet route-${location.pathname.split("/")[1] || "home"}`}
        ref={sheet}
      >
        <Material />
        <Header />
        <Index />
        <div className="dossier-layout">
          <DossierTabs />
          <div className="dossier-body">
            <img className="dossier-edge" src="/materials/dossier-top.webp" alt="" aria-hidden="true" width="2172" height="385" onError={(event) => { event.currentTarget.hidden = true; }} />
            <DossierLocation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/start" element={<Navigate to="/" replace />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route
            path="/writing"
            element={showWriting ? <Writing /> : <Navigate to="/projects" replace />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          </div>
        </div>
      </main>
      <div className="motion-overlay" ref={overlay} aria-hidden="true" />
    </Journey.Provider>
  );
}
export default function Atlas() {
  const legacy = window.location.hash;
  if (legacy.startsWith("#/") && !legacy.startsWith("#//")) {
    /* Older shared links used hash routes (#/projects); keep them working. */
    window.history.replaceState(null, "", legacy.slice(1));
  } else if (window.location.pathname === "/" && !legacy) {
    try {
      const saved = sessionStorage.getItem("portfolio-route");
      if (saved?.startsWith("/") && !saved.startsWith("//") && saved !== "/")
        window.history.replaceState(null, "", saved);
    } catch {
      /* Use homepage when storage unavailable. */
    }
  }
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
