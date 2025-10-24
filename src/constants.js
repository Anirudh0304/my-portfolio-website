
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import figmaLogo from './assets/tech_logo/figma.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import canvaLogo from './assets/tech_logo/canva.png';
import flaskLogo from './assets/tech_logo/flask.png';
import msofficeLogo from './assets/tech_logo/msoffice.png';
import opencvLogo from './assets/tech_logo/opencv.png';
import powerautomateLogo from './assets/tech_logo/powerautomate.png';
import powerbiLogo from './assets/tech_logo/powerbi.png';
import rLogo from './assets/tech_logo/r.png';
import streamLogo from './assets/tech_logo/stream.png';
import spacyLogo from './assets/tech_logo/spacy.png';
import numpyLogo from './assets/tech_logo/numpy.png';
import pandasLogo from './assets/tech_logo/pandas.png';
import matplotLogo from './assets/tech_logo/matplot.png';
import seabornLogo from './assets/tech_logo/seaborn.png';
import plotlyLogo from './assets/tech_logo/plotly.png';
import vyadhLogo from './assets/company_logo/vyadh.jpg';
import groLogo from './assets/company_logo/gro.jpg';
import vitLogo from './assets/education_logo/vit.jpg';
import vivekLogo from './assets/education_logo/vivek.png';
import trendLogo from './assets/work_logo/trend.jpg';
import uberLogo from './assets/work_logo/uber.png';
import HRLogo from './assets/work_logo/HR.png';
import sqlLogo from './assets/work_logo/sql.png';
import taskLogo from './assets/work_logo/task.png';
import quantLogo from './assets/work_logo/quant.png';
export const SkillsInfo = [
    {
    title: 'Languages',
    skills: [
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'R', logo: rLogo },
    ],
  },
    {
    title: 'Database',
    skills: [
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'Pandas', logo: pandasLogo },
      { name: 'NumPy', logo: numpyLogo },
      { name: 'Matplotlib', logo: matplotLogo },
      { name: 'Seaborn', logo: seabornLogo },
      { name: 'Plotly', logo: plotlyLogo },
      { name: 'Flask', logo: flaskLogo },
      { name: 'OpenCV', logo: opencvLogo },
      { name: 'Stream-lit', logo: streamLogo},
      { name: 'SpaCy', logo: spacyLogo},
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'PowerBI', logo: powerbiLogo },
      { name: 'MS Office Suite', logo: msofficeLogo },
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Canva', logo: canvaLogo },
      { name: 'Power Automate', logo: powerautomateLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

  export const experiences = [
    {
      id: 0,
      img: vyadhLogo,
      role: "External Management Head",
      company: "Team Vyadh",
      date: "September 2024 - Present",
      desc: "As External Management Head of Team Vyadh, I led and coordinated a team of 40+ students across 5+ cross-functional domains, ensuring smooth collaboration and alignment with project milestones. I implemented Agile workflows to enhance productivity, facilitated communication between technical and management teams, and resolved bottlenecks to keep deliverables on track. Beyond this, I strengthened the team’s external presence by driving targeted sponsorship outreach, securing partnerships, and expanding visibility through strategic social media initiatives. My role combined leadership, stakeholder engagement, and organizational strategy to position the team competitively at international rover challenges.",
      skills: [
        "Team Leadership",
        "Cross-functional Management",
        "Agile",
        "Strategic Planning",
        "Conflict Resolution",
        "Social Media Management",
        "Sponsorship Acquisition",
        "MS Office",
        "canva",
        " Figma",
      ],
    },
    {
      id: 1,
      img: groLogo,
      role: "Social Media Manager",
      company: "GroGoliath",
      date: "June 2024 - August 2024",
      desc: "As a Social Media Manager at GroGoliath (Aug 2024), I successfully managed and optimized social media strategies for two key clients, driving a measurable boost in audience reach and engagement. I conducted in-depth performance analysis and reporting to refine marketing approaches, ensuring campaigns were data-driven and effective. Additionally, I led a targeted email marketing campaign that resulted in a significant increase in client acquisition and customer interaction, strengthening brand visibility and overall impact.",
      skills: [
        "Social Media Strategy",
        "Content Management",
        "Marketing",
      ],
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: vitLogo,
      school: "Vellore Institute of Technology, Vellore",
      date: "Sept 2022 - July 2026",
      grade: "7.74 CGPA",
      degree: "B.Tech Computer Science and Engineering - Specialization in Data Science",
    },
    {
      id: 1,
      img: vivekLogo,
      school: "Sri Vivekananda Junior College",
      date: "July 2020 - March 2022",
      grade: "83.4%",
      degree: "XI & XII - PCM ",
    },
  ];
  
  export const projects = [
        {
      id: 0,
      title: "QuantPEGY: Multi-Region Macro-Aware Factor Engine",
      description:
        "QuantPEGY is a dynamic factor-based portfolio construction engine that selects undervalued, fundamentally strong stocks using the PEGY (P/E-to-Growth + Dividend Yield) ratio. This version incorporates macroeconomic regime detection to adjust investment strategies contextually (risk-on, risk-off, neutral).",
      image: quantLogo,
      tags: ["Python", "Pandas", "Streamlit", "PyPortfolioOpt", "NumPy", "yfinance"," Matplotlib","argparse"],
      github: "https://github.com/Anirudh0304/QuantPEGY",
    },
    {
      id: 1,
      title: "TrendSage Lite",
      description:
        "TrendSage Lite is an interactive news analytics dashboard that tracks global events in real time. It extracts geopolitical entities, applies sentiment analysis, and visualizes patterns on a world choropleth map. Users can click countries to explore related headlines and emotional tone.The tool helps researchers, journalists, and analysts monitor worldwide narratives effectively.",
      image: trendLogo,
      tags: ["Python", "NLP", "Streamlit", "Data Visualisation", "Data Analysis"],
      github: "https://github.com/Anirudh0304/TrendSage-Lite",
    },
    {
      id: 2,
      title: "Uber Analysis Dashboard",
      description:
        "I designed an interactive Power BI dashboard to analyze Uber ride data, uncovering key insights into demand patterns, peak hours, and customer behavior. The dashboard includes advanced visuals such as maps, heatmaps, KPIs, and real-time streaming datasets to track live trip activity. These insights empower ride-hailing companies to optimize driver allocation, reduce waiting times, and improve operational efficiency.",
      image: uberLogo,
      tags: ["PowerBI", "Power Query", "DAX", "Business Analysis"],
      github: "https://github.com/Anirudh0304/Uber-Data-Analysis",
    },
    {
      id: 3,
      title: "SQL Data Warehouse & Analysis",
      description:
        "I developed an end-to-end data warehousing solution using the Medallion Architecture (Bronze, Silver, Gold layers) to transform raw ERP and CRM data into business-ready insights. The project included building ETL pipelines, designing star schema models with fact and dimension tables, and implementing SQL-based reporting for advanced analytics. This solution showcases real-world enterprise practices in data engineering, modeling, and business intelligence.",
      image: sqlLogo,
      tags: ["Postgre SQL", "ETL Design", "Data Modeling", "Data Cleaning"],
      github: "https://github.com/Anirudh0304/sql-data-warehouse-project",
    },
    {
      id: 4,
      title: "HR Analytics",
      description:
        "I built a comprehensive HR analytics dashboard to analyze absenteeism trends by leveraging SQL for data preparation and Power BI for visualization. The project explored key factors such as absence reasons, lifestyle choices, BMI, and transportation expenses, uncovering correlations that impact workforce productivity. These insights enable HR managers to identify problem areas and design strategies to improve employee well-being and organizational efficiency.",
      image: HRLogo,
      tags: ["SQL", "Power BI", "Data Cleaning"],
      github: "https://github.com/Anirudh0304/HR-Analytics",
    },
    {
      id: 5,
      title: "Task Manager",
      description:
        "I developed a web-based task management application using Django that allows users to create, update, delete, and track tasks with features like due dates, statuses, remarks, and timestamps. The platform integrates secure user authentication, ensuring personalized task management for each user. It also employs a clean HTML/CSS frontend with Django templates for an intuitive user experience.",
      image: taskLogo,
      tags: ["HTML", "CSS"," Django", "SQLite", "CRUD Operations","Python"],
      github: "https://github.com/Anirudh0304/Task-Manager",
    },
  ];  