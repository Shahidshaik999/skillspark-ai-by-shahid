from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Tuple
import pdfplumber
import docx
import io
import re
import os

# ✅ Gemini SDK
import google.generativeai as genai

app = FastAPI()

# ----------------- CORS -----------------
origins = [
    # local dev
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # backend itself (optional)
    "https://skillspark-ai-by-shahid.onrender.com",
    # 👇 IMPORTANT: no trailing slash here
    "https://skillspark-ai-by-shahid.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Gemini setup -----------------

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-pro"  # safe + available for most keys

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        print("✅ Gemini configured")
    except Exception:
        print("⚠️ Failed to configure Gemini, will use fallback only.")
        GEMINI_API_KEY = None
else:
    print("⚠️ GEMINI_API_KEY not set. Using fallback summaries/questions only.")

# ----------------- simple skill DB -----------------

KNOWN_SKILLS = [
    "python",
    "java",
    "javascript",
    "react",
    "node.js",
    "typescript",
    "html",
    "css",
    "sql",
    "mysql",
    "mongodb",
    "pandas",
    "numpy",
    "machine learning",
    "deep learning",
    "django",
    "flask",
    "fastapi",
    "aws",
    "docker",
    "git",
]

CERT_KEYWORDS: List[Tuple[str, str]] = [
    ("coursera", "Coursera"),
    ("udemy", "Udemy"),
    ("nptel", "NPTEL"),
    ("edx", "edX"),
    ("google data analytics", "Google Data Analytics"),
    ("google cloud", "Google Cloud"),
    ("aws certified", "AWS Certified"),
    ("azure", "Microsoft Azure"),
    ("oracle", "Oracle Certification"),
    ("ibm", "IBM Certification"),
    ("meta front-end", "Meta Front-End"),
    ("meta back-end", "Meta Back-End"),
    ("machine learning", "Machine Learning Certificate"),
    ("data science", "Data Science Certificate"),
    ("certification", "Certification"),
]

RESUME_KEYWORDS = [
    "education",
    "experience",
    "work experience",
    "professional experience",
    "projects",
    "skills",
    "technical skills",
    "internship",
    "b.tech",
    "btech",
    "curriculum vitae",
    "resume",
]


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text: List[str] = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text.append(page_text)
    return "\n".join(text)


def extract_text_from_docx(file_bytes: bytes) -> str:
    file_stream = io.BytesIO(file_bytes)
    document = docx.Document(file_stream)
    return "\n".join(p.text for p in document.paragraphs)


def looks_like_resume(text: str) -> bool:
    lower = text.lower()
    keyword_hits = sum(1 for kw in RESUME_KEYWORDS if kw in lower)
    return len(text) > 600 and keyword_hits >= 2


def extract_skills(text: str) -> List[str]:
    lower_text = text.lower()
    found: List[str] = []
    for skill in KNOWN_SKILLS:
        if skill in lower_text:
            found.append(skill.capitalize())
    return sorted(set(found))


def infer_roles(skills: List[str]) -> List[str]:
    s = {x.lower() for x in skills}
    roles: List[str] = []

    if "react" in s or "javascript" in s:
        roles.append("Frontend Developer")
    if "node.js" in s or "sql" in s or "mongodb" in s:
        roles.append("Backend Developer")
    if "python" in s and ("pandas" in s or "numpy" in s):
        roles.append("Data Analyst")
    if "machine learning" in s or "deep learning" in s:
        roles.append("Machine Learning Engineer")
    if "docker" in s or "aws" in s:
        roles.append("DevOps Engineer")

    if not roles:
        roles.append("Software Engineer")

    seen: set[str] = set()
    unique_roles: List[str] = []
    for r in roles:
        if r not in seen:
            seen.add(r)
            unique_roles.append(r)

    return unique_roles


def extract_certifications(text: str) -> List[str]:
    lower = text.lower()
    found: List[str] = []
    for kw, label in CERT_KEYWORDS:
        if kw in lower and label not in found:
            found.append(label)
    return found


def infer_experience_level(text: str) -> tuple[int, str]:
    lower = text.lower()
    matches = re.findall(r"(\d+)\+?\s+years?\s+of\s+experience", lower)
    years = 0
    if matches:
        years = max(int(m) for m in matches)

    if years == 0:
        if "fresher" in lower or "entry level" in lower:
            return 0, "Fresher"
        return 0, "Unknown (probably Fresher/Junior)"

    if years < 2:
        level = "Junior (0–2 years)"
    elif years < 5:
        level = "Mid-level (2–5 years)"
    else:
        level = "Senior (5+ years)"

    return years, level


# ------------- fallback text logic (no Gemini) -------------


def fallback_summary(skills: List[str], roles: List[str], experience_level: str) -> str:
    if not skills:
        return (
            "We couldn't detect many skills from your resume. Try uploading a more "
            "detailed version with your tech stack, tools and 2–3 projects."
        )
    main_role = roles[0] if roles else "Software Engineer"
    top_skills = ", ".join(skills[:5])
    return (
        f"Your profile currently looks like a {experience_level} {main_role} "
        f"with strengths in {top_skills}. Focus on building depth through a few strong "
        f"projects and practicing problem solving relevant to this role."
    )


def fallback_questions(roles: List[str]) -> List[str]:
    if not roles:
        return [
            "Explain a project you worked on end-to-end.",
            "Describe a challenging bug you fixed and how you approached it.",
        ]

    main = roles[0].lower()
    if "front" in main:
        return [
            "Explain the virtual DOM and how React uses it.",
            "What are the differences between state and props?",
            "How would you optimize performance in a large React app?",
        ]
    if "back" in main:
        return [
            "Explain REST and HTTP methods.",
            "How do you design an authentication system with JWT?",
            "What is connection pooling in databases and why is it useful?",
        ]
    if "full" in main:
        return [
            "Describe how you would design a full-stack app (frontend, backend, DB).",
            "How do you handle authentication and authorization across the stack?",
        ]
    if "machine" in main:
        return [
            "What is the difference between bias and variance?",
            "Explain overfitting and how to prevent it.",
            "How do you choose between different ML algorithms for a problem?",
        ]
    if "data engineer" in main:
        return [
            "Explain the difference between OLTP and OLAP.",
            "What is an ETL pipeline and what are its main stages?",
        ]
    return [
        "Explain a project you worked on end-to-end.",
        "Describe a challenging bug you fixed and how you approached it.",
    ]


# ------------- Gemini (google-generativeai) + silent fallback -------------


def generate_ai_summary(skills: List[str], roles: List[str], experience_level: str) -> str:
    if not GEMINI_API_KEY:
        return fallback_summary(skills, roles, experience_level)

    main_role = roles[0] if roles else "Software Engineer"
    skill_list = ", ".join(skills) if skills else "no clear skills detected"

    prompt = f"""
You are an experienced career coach for software engineers.

User profile:
- Suggested roles: {roles or ["Software Engineer"]}
- Main role to target: {main_role}
- Experience level: {experience_level}
- Detected skills: {skill_list}

Write a short personalised summary (3–5 sentences):
1. How their current profile looks for this role.
2. Their main strengths.
3. The top 2–3 focus areas for the next 1–2 months.

Keep it friendly, concrete and non-generic.
"""

    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        resp = model.generate_content(prompt)
        text = (getattr(resp, "text", "") or "").strip()
        if not text:
            return fallback_summary(skills, roles, experience_level)
        return text
    except Exception:
        return fallback_summary(skills, roles, experience_level)


def generate_ai_interview_questions(roles: List[str]) -> List[str]:
    if not GEMINI_API_KEY:
        return fallback_questions(roles)

    main_role = roles[0] if roles else "Software Engineer"

    prompt = f"""
You are preparing a candidate for interviews.

Target role: {main_role}

Generate 6 specific interview questions this candidate should practice FIRST.
Mix of:
- 2 conceptual / theory
- 2 practical / scenario-based
- 2 about projects / system design

Return them as a numbered list.
"""

    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        resp = model.generate_content(prompt)
        raw = (getattr(resp, "text", "") or "").strip()
        if not raw:
            return fallback_questions(roles)

        lines = [ln.strip(" -") for ln in raw.splitlines() if ln.strip()]
        questions = [ln for ln in lines if len(ln) > 10][:10]
        return questions or fallback_questions(roles)
    except Exception:
        return fallback_questions(roles)


# ------------- main endpoint -------------


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    file_bytes = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_bytes)
    elif filename.endswith(".docx"):
        text = extract_text_from_docx(file_bytes)
    else:
        return {"error": "Unsupported file type. Please upload a PDF or DOCX."}

    if not text.strip():
        return {"error": "Could not read any text from the file."}

    if not looks_like_resume(text):
        return {
            "error": (
                "This file doesn't look like a resume. "
                "Please upload your professional resume (PDF or DOCX) with sections like "
                "Education, Experience, Skills, and Projects."
            )
        }

    skills = extract_skills(text)
    roles = infer_roles(skills)
    certifications = extract_certifications(text)
    years, experience_level = infer_experience_level(text)

    summary = generate_ai_summary(skills, roles, experience_level)
    interview_questions = generate_ai_interview_questions(roles)

    return {
        "fileName": file.filename,
        "skills": skills,
        "suggestedRoles": roles,
        "certifications": certifications,
        "experienceYears": years,
        "experienceLevel": experience_level,
        "summary": summary,
        "interviewQuestions": interview_questions,
    }
