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
const featured = ["TrendSage Lite", "QuantPEGY"];
const images = {
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
      fetchPriority="high"
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
  const menu = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [location]);
  return (
    <>
      <header className="masthead">
        <Go className="brand" to="/">
          Konduri Anirudh
        </Go>
        <span className="discipline">Product Management</span>
        <div className="utilities">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé <Arrow />
          </a>
          <Go to="/contact">
            Contact <Arrow />
          </Go>
        </div>
      </header>
      <details
        className="mobile-explore"
        ref={menu}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            menu.current.open = false;
            menu.current.querySelector("summary").focus();
          }
        }}
      >
        <summary
          onClick={(event) => {
            menu.current.dataset.keyboard = String(event.detail === 0);
          }}
        >
          Explore <span className="menu-mark" aria-hidden="true" />
        </summary>
        <Navigation mobile />
        <div className="mobile-utilities">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Résumé <Arrow />
          </a>
          <Go to="/contact">
            Contact <Arrow />
          </Go>
        </div>
      </details>
    </>
  );
}
function Index() {
  return (
    <aside className="index">
      <Label>Explore</Label>
      <Navigation />
      <p className="signature">
        Product, data &amp;
        <br />
        experiments
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
        <h1 tabIndex={-1}>
          Konduri
          <br />
          Anirudh
        </h1>
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
          <p>I’m Anirudh, an Associate Product Manager at Revspot.ai.</p>
          <p>
            I work on launch flows, AI evaluation and internal analytics—turning
            advertising operations into product decisions.
          </p>
        </div>
        <div className="home-invitation">
          <Action to="/experience">Follow my journey</Action>
        </div>
      </div>
      <aside className="right-fold home-current">
        <Label>Current chapter</Label>
        <h2>Revspot.ai</h2>
        <p>Associate Product Manager</p>
        <p className="small">September 2026 — Present</p>
        <div className="previous-role">
          <p className="previous-label">Previously</p>
          <p>Product Management Intern</p>
          <p className="small">June — August 2026</p>
        </div>
      </aside>
      <footer className="folio home-folio">
        <span>Current practice</span>
        <b>Reliable launches &amp; AI evaluation</b>
        <span>Product workflows, platform guardrails &amp; decision-grade analytics</span>
        <Action to="/experience">Explore experience</Action>
      </footer>
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
        <div className="role-heading">
          <h2>{role.company}</h2>
          <h3>{role.title}</h3>
          <p className="small">
            {role.date} · {role.place}
          </p>
        </div>
        <p className="lead">{role.intro}</p>
        <div className="themes">
          {role.themes.map((theme, i) => (
            <section key={theme.title}>
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
      </article>
      <aside className="right-fold role-history">
        <Label>{id === "apm" ? "Earlier chapters" : "Other chapters"}</Label>
        {Object.entries(roles)
          .filter(([key]) => key !== id)
          .map(([key, item]) => (
            <section key={key}>
              <h2>{item.company}</h2>
              <p>{item.title}</p>
              <p className="small">{item.date}</p>
              <Action to={`/experience?role=${key}`}>View experience</Action>
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
function Projects() {
  return (
    <>
      <article className="centre chapter projects-chapter">
        <h1 tabIndex={-1}>Projects</h1>
        <p className="projects-intro">
          Finished work in data, machine learning and software.
        </p>
        <div className="previous-featured selected-work">
          {featured.map((name) => {
            const p = archive.find((item) => item.title === name);
            return (
              <article key={name}>
                <Go to={`/projects/${slug(name)}`} className="preview-image">
                  <Screenshot
                    key={images[name]}
                    data-project-image={slug(name)}
                    src={images[name]}
                    alt={`${name} application screenshot`}
                    loading="lazy"
                  />
                </Go>
                <h2>{name}</h2>
                <p>{p.text}</p>
                <Action to={`/projects/${slug(name)}`}>View project</Action>
              </article>
            );
          })}
        </div>
      </article>
      <aside className="right-fold project-list coming-next">
        <Label>Coming next</Label>
        <p className="small">Independent studies in development.</p>
        <ul>
          {Object.values(projects).map((p) => (
            <li key={p.id}>
              <Go to={`/projects/${p.id}`}>{p.title}</Go>
            </li>
          ))}
        </ul>
      </aside>
      <Footer to={afterProjects[0]} title={afterProjects[1]}>
        Selected work above. More projects below.
      </Footer>
      <section className="previous-spread" id="more-projects">
        <Material />
        <div className="previous-inner">
          <header className="previous-heading">
            <h2>More projects</h2>
            <p>
              Earlier explorations in data, machine learning and building
              software.
            </p>
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
                  <Action to={`/projects/${slug(item.title)}`}>
                    View project
                  </Action>
                </article>
              ))}
          </div>
          <p className="annotation">
            A collection of undergraduate and technical work.
          </p>
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
      <aside className="right-fold writing-next">
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
      <aside className="right-fold contact-links">
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
              {[
                ["project-idea", "The idea", detail.idea],
                ["project-build", "The build", detail.build],
                ["project-interface", "The interface", detail.interface],
              ].map(([key, title, text]) => (
                <section id={key} key={key} tabIndex={-1}>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </section>
              ))}{" "}
            </div>
          </>
        )}
      </article>
      <aside className="right-fold detail-aside">
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
              {[
                ["project-idea", "The idea"],
                ["project-build", "The build"],
                ["project-interface", "The interface"],
              ].map(([key, title]) => (
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
            <p className="annotation">Previous project</p>
          </>
        )}
      </aside>
      <Footer
        to={
          !planned && nextTitle ? `/projects/${slug(nextTitle)}` : "/projects"
        }
        title={!planned && nextTitle ? `Next / ${nextTitle}` : "All projects"}
      >
        {planned ? "Independent study · In development" : "Finished project"}
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
    const footer = page.querySelector(":scope > .folio");
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
      page.querySelector(":scope > .centre"),
      page.querySelector(":scope > .masthead"),
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
    const outgoing = animate && !source && desktopLayout() ? makeLeaves() : [];
    flushSync(() => navigate(to));
    if (animate && clone) {
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
    if (
      previous.current !== entryKey &&
      navType === "POP" &&
      positions.current.has(entryKey)
    ) {
      window.scrollTo(0, positions.current.get(entryKey));
      previous.current = entryKey;
      sheet.current.querySelector("h1")?.focus({ preventScroll: true });
    } else if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
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
