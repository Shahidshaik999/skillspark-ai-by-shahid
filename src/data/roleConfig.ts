// src/data/roleConfig.ts

// all supported role keys in the app
export type RoleKey =
  | "fullstack"
  | "frontend"
  | "backend"
  | "data-engineer"
  | "ml-engineer"
  | "devops";

export interface RoleConfig {
  id: RoleKey;
  displayName: string;
  coreSkills: string[];
  niceToHaveSkills: string[];
  recommendedCerts: string[];
  resources: {
    youtube: { label: string; url: string }[];
    courses: { label: string; url: string }[];
    interview: { label: string; url: string }[];
    projects: string[];
  };
  jobLinks: { label: string; url: string }[];
}

export const ROLE_CONFIG: Record<RoleKey, RoleConfig> = {
  fullstack: {
    id: "fullstack",
    displayName: "Full Stack Developer",
    coreSkills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "HTML",
      "CSS",
      "REST APIs",
      "MongoDB",
      "SQL",
      "Git",
    ],
    niceToHaveSkills: ["Docker", "AWS", "Testing", "CI/CD"],
    recommendedCerts: [
      "Full Stack",
      "MERN",
      "Meta Front-End",
      "Meta Back-End",
      "JavaScript",
    ],
    resources: {
      youtube: [
        {
          label: "freeCodeCamp (Full stack / JS / React)",
          url: "https://www.youtube.com/c/Freecodecamp",
        },
        {
          label: "Traversy Media (React / Node)",
          url: "https://www.youtube.com/c/TraversyMedia",
        },
      ],
      courses: [
        {
          label: "freeCodeCamp Full Curriculum",
          url: "https://www.freecodecamp.org/learn",
        },
      ],
      interview: [
        {
          label: "Full stack interview questions",
          url: "https://www.interviewbit.com/full-stack-interview-questions/",
        },
      ],
      projects: [
        "E-commerce app (auth + cart + payments)",
        "Job portal or ATS dashboard",
        "SaaS dashboard with charts + external API",
      ],
    },
    jobLinks: [
      {
        label: "Full Stack jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer",
      },
      {
        label: "Full Stack jobs on Glassdoor",
        url: "https://www.glassdoor.com/Job/full-stack-developer-jobs-SRCH_KO0,21.htm",
      },
    ],
  },

  "ml-engineer": {
    id: "ml-engineer",
    displayName: "Machine Learning Engineer",
    coreSkills: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
    ],
    niceToHaveSkills: ["TensorFlow", "PyTorch", "Deep Learning", "MLOps", "Docker"],
    recommendedCerts: [
      "Andrew Ng",
      "Machine Learning",
      "Deep Learning",
      "Google Data Analytics",
    ],
    resources: {
      youtube: [
        {
          label: "StatQuest (Stats + ML)",
          url: "https://www.youtube.com/c/joshstarmer",
        },
        {
          label: "Krish Naik (ML / DS)",
          url: "https://www.youtube.com/c/KrishNaik",
        },
      ],
      courses: [
        {
          label: "Andrew Ng ML (Coursera)",
          url: "https://www.coursera.org/learn/machine-learning",
        },
      ],
      interview: [
        {
          label: "Top ML interview questions",
          url: "https://www.interviewbit.com/machine-learning-interview-questions/",
        },
      ],
      projects: [
        "Customer churn prediction",
        "Recommendation system",
        "Image classifier with CNN",
      ],
    },
    jobLinks: [
      {
        label: "ML Engineer jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=Machine%20Learning%20Engineer",
      },
    ],
  },

  // simple placeholders for now – you can enrich later
  frontend: {
    id: "frontend",
    displayName: "Frontend Developer",
    coreSkills: ["HTML", "CSS", "JavaScript", "React"],
    niceToHaveSkills: ["TypeScript", "Next.js", "Testing"],
    recommendedCerts: ["Meta Front-End", "JavaScript"],
    resources: {
      youtube: [
        {
          label: "Web Dev Simplified",
          url: "https://www.youtube.com/c/WebDevSimplified",
        },
      ],
      courses: [
        {
          label: "freeCodeCamp Frontend path",
          url: "https://www.freecodecamp.org/learn",
        },
      ],
      interview: [
        {
          label: "Frontend interview questions",
          url: "https://www.interviewbit.com/front-end-developer-interview-questions/",
        },
      ],
      projects: [
        "Portfolio site",
        "Landing page with animations",
        "Dashboard UI with charts",
      ],
    },
    jobLinks: [
      {
        label: "Frontend jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=Frontend%20Developer",
      },
    ],
  },

  backend: {
    id: "backend",
    displayName: "Backend Developer",
    coreSkills: ["Node.js", "Python", "SQL", "REST APIs"],
    niceToHaveSkills: ["Docker", "AWS", "Redis", "Microservices"],
    recommendedCerts: ["Back-End", "Node.js", "Databases"],
    resources: {
      youtube: [
        {
          label: "Hussein Nasser (DB / backend)",
          url: "https://www.youtube.com/c/HusseinNasser-software-engineering",
        },
      ],
      courses: [
        {
          label: "Node.js / Express course (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        },
      ],
      interview: [
        {
          label: "Backend interview questions",
          url: "https://www.interviewbit.com/backend-developer-interview-questions/",
        },
      ],
      projects: [
        "REST API for e-commerce",
        "Authentication + JWT service",
        "URL shortener or file sharing backend",
      ],
    },
    jobLinks: [
      {
        label: "Backend jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=Backend%20Developer",
      },
    ],
  },

  "data-engineer": {
    id: "data-engineer",
    displayName: "Data Engineer",
    coreSkills: ["Python", "SQL", "ETL", "Data Pipelines"],
    niceToHaveSkills: ["Spark", "Airflow", "Kafka", "AWS"],
    recommendedCerts: ["Data Engineering", "Big Data"],
    resources: {
      youtube: [
        {
          label: "Seattle Data Guy",
          url: "https://www.youtube.com/c/SeattleDataGuy",
        },
      ],
      courses: [
        {
          label: "Data Engineering zoomcamp",
          url: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
        },
      ],
      interview: [
        {
          label: "Data engineer interview questions",
          url: "https://www.interviewbit.com/data-engineer-interview-questions/",
        },
      ],
      projects: [
        "Build ETL pipeline with Airflow",
        "Data warehouse + reporting dashboard",
        "Streaming pipeline with Kafka (optional)",
      ],
    },
    jobLinks: [
      {
        label: "Data Engineer jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=Data%20Engineer",
      },
    ],
  },

  devops: {
    id: "devops",
    displayName: "DevOps Engineer",
    coreSkills: ["Linux", "Git", "CI/CD", "Docker"],
    niceToHaveSkills: ["Kubernetes", "AWS", "Terraform", "Monitoring"],
    recommendedCerts: ["DevOps", "AWS Cloud Practitioner"],
    resources: {
      youtube: [
        {
          label: "TechWorld with Nana",
          url: "https://www.youtube.com/c/TechWorldwithNana",
        },
      ],
      courses: [
        {
          label: "DevOps bootcamp playlist",
          url: "https://www.youtube.com/results?search_query=devops+for+beginners",
        },
      ],
      interview: [
        {
          label: "DevOps interview questions",
          url: "https://www.interviewbit.com/devops-interview-questions/",
        },
      ],
      projects: [
        "CI/CD pipeline for a Node/React app",
        "Dockerize and deploy app to cloud",
        "Monitoring with Prometheus / Grafana",
      ],
    },
    jobLinks: [
      {
        label: "DevOps jobs on LinkedIn",
        url: "https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer",
      },
    ],
  },
};
