export const roles = {
  apm: {
    company: "Revspot.ai",
    title: "Associate Product Manager",
    date: "September 2026 — Present",
    place: "Bengaluru, India",
    intro:
      "I work on Spot, Revspot’s AI advertising product, making launches more reliable and product decisions easier to trust.",
    context: "Current product practice",
    themes: [
      {
        title: "Make launches correct",
        text: "Trace gaps between a campaign plan and what reaches an ad platform, then turn failures in setup, targeting, budgets and permissions into safer launch flows.",
        flow: ["Plan", "Launch path", "Platform reality"],
      },
      {
        title: "Test the workflow, not the demo",
        text: "Define evaluation criteria and controlled tests for AI-assisted advertising workflows so the team can see what improved, what failed and what to change next.",
      },
      {
        title: "Build a decision-grade view",
        text: "Develop internal analytics for revenue, customer-level P&L, voice-bot quality and false negatives. Clear definitions make the numbers useful in product decisions.",
      },
    ],
  },
  intern: {
    company: "Revspot.ai",
    title: "Product Management Intern",
    date: "June — August 2026",
    place: "Bengaluru, India",
    intro:
      "Worked on advertising workflows, product specifications, and evaluation frameworks before moving into the APM role.",
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
    title: "TrendSage Lite",
    type: "NLP & news analysis",
    text: "An undergraduate news and sentiment exploration project with entity extraction and a Streamlit dashboard.",
    url: "https://github.com/Anirudh0304/TrendSage-Lite",
  },
  {
    title: "XAI Governance",
    type: "Explainability & model risk",
    text: "An undergraduate credit-risk project exploring explainability, fairness, and model governance.",
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
  "TrendSage Lite": {
    stack: ["Python", "NLP", "Streamlit", "Data visualisation"],
    idea: "Explore news through countries, entities and sentiment.",
    build:
      "Extract geopolitical entities, apply sentiment analysis and connect country selections to related headlines.",
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
    focus: ["Explainability", "Fairness", "Model governance"],
    idea: "Explore how a credit-risk model can be understood and governed.",
    build:
      "The undergraduate project considers explainability, fairness and model risk in credit decisions.",
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
