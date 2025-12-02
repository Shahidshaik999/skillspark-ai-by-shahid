<h1 align="center">🚀 SkillsPark AI – Smart Resume Analyzer & Career Guide</h1>

<p align="center">
AI-powered resume analyzer that extracts your skills, infers best-fit tech roles, and generates interview prep – all from a single resume upload.
</p>

<p align="center">
  <b>Frontend:</b> React + TypeScript + Tailwind · 
  <b>Backend:</b> FastAPI (Python) · 
  <b>AI:</b> Google Gemini
</p>

---

## 📌 Overview

**SkillsPark AI** is a full-stack web app that helps students and early-career developers understand their profile from a hiring perspective.

You simply upload your **resume (PDF/DOCX)** and the app:

- Extracts your **technical skills**
- Infers **suitable job roles** (Frontend, Backend, ML Engineer, etc.)
- Detects **certifications & platforms**
- Guesses your **experience level**
- (Optionally) Uses **Google Gemini** to generate:
  - A personalized **career summary**
  - A set of **interview questions** to practice

There is also a clean, animated UI with
<img width="1830" height="960" alt="image" src="https://github.com/user-attachments/assets/bd62ebce-5c0d-4e2c-8d12-3df4a879866b" />
<img width="1832" height="905" alt="image" src="https://github.com/user-attachments/assets/28c2f090-bbb0-440f-b66c-2fc99d1460d1" />
<img width="1837" height="838" alt="image" src="https://github.com/user-attachments/assets/3a7dba16-b37e-44ca-968c-a16654646105" />
<img width="1655" height="968" alt="image" src="https://github.com/user-attachments/assets/d3101304-a11b-4df2-8491-3eefb54030b2" />
<img width="967" height="963" alt="image" src="https://github.com/user-attachments/assets/dfae31e0-7ca7-4bd8-b362-aa3af7d96b4b" />






---

## 🌐 Live Demo

> 🔗 **Backend API (FastAPI)**  
> `https://skillspark-ai-by-shahid.onrender.com`

> 🔗 **Frontend (React app) click the below link to access the app**  
> _https://skillspark-ai-by-shahid.vercel.app/

---

## 🧠 Core Features

### 📝 Smart Resume Parsing

- Supports **PDF** and **DOCX** files.
- Uses `pdfplumber` and `python-docx` to extract raw text.
- Detects whether the uploaded file actually looks like a **resume** using keywords like:
  - *Education, Experience, Skills, Projects, Internship, B.Tech, CV, Resume, etc.*
- If the file is clearly **not a resume** (e.g., random notes), the backend returns a friendly error instead of pretending to analyze it.

---

### 🧬 Skill Extraction

- Predefined tech stack list (Python, Java, JavaScript, React, Node.js, SQL, MongoDB, Pandas, NumPy, ML, DL, AWS, Docker, Git, etc.).
- Extracted from the resume text using simple but effective keyword matching.
- Displayed as **colorful badges** in the UI after analysis.

---

### 🎯 Role Suggestion

Based on detected skills, the backend infers **possible roles**, e.g.:

- 🎨 Frontend Developer  
- 🛠️ Backend Developer  
- 🔄 Full Stack Developer (if you extend logic)  
- 📊 Data Analyst  
- 🤖 Machine Learning Engineer  
- ⚙️ DevOps Engineer  
- 🧑‍💻 Generic Software Engineer (fallback)

These roles are shown as clickable cards. Clicking a role can take the user to a **role-specific roadmap/resources page**.

---

### 🎓 Certification Detection

Scans for known certification platforms/keywords like:

- Coursera, Udemy, NPTEL, edX  
- Google Data Analytics, Google Cloud  
- AWS Certified  
- IBM, Meta Front-End / Back-End, etc.

These are returned as a `certifications` list in the API response.

---

### 📊 Experience Level Heuristic

The backend tries to infer your experience:

- Looks for patterns like `"X years of experience"`.
- Maps to levels:
  - `Fresher`
  - `Junior (0–2 years)`
  - `Mid-level (2–5 years)`
  - `Senior (5+ years)`
- If unclear but “fresher” or “entry level” is found, it marks as **Fresher**.

---

### 🤖 AI-Powered Summary & Questions (Gemini)

If a valid **GEMINI_API_KEY** is set:

- Calls **Google Gemini** via `google-generativeai`.
- Generates:
  - A tailored **career summary** (3–5 sentences).
  - A list of **interview questions** to practice first (mix of theory, scenario-based, and project/design questions).

If Gemini is **not configured** or fails, the app gracefully falls back to **handwritten summaries & questions**, so the feature never breaks.

---

### 💻 Frontend UX

- Built with **React + TypeScript + Vite**
- **Tailwind CSS** + custom styles for a futuristic theme.
- Uses **Framer Motion** for smooth animations.
- Drag-and-drop + click-to-upload resume.
- Status states:
  - Idle → Uploading → Analyzing → Results  
- Results screen shows:
  - Extracted skills
  - Suggested job roles (clickable)
  - Button to navigate to job/results page

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                                 |
|--------------|------------------------------------------------------------------------------|
| Frontend     | React, TypeScript, Vite, Tailwind CSS, Framer Motion, shadcn/ui, lucide-react |
| Backend      | FastAPI (Python), Uvicorn                                                   |
| AI           | Google Gemini via `google-generativeai`                                     |
| Parsing      | `pdfplumber`, `python-docx`, `re`                                           |
| Hosting      | Frontend: (Vercel/Netlify) · Backend: Render                                |
| Other        | CORS, FormData, LocalStorage, Toast notifications                           |

---

## 🧱 Project Structure

> This is a simplified representation. Your repo may have more files.

```bash
skillspark-ai-main/
├── server/                 # Backend (FastAPI)
│   ├── main.py             # Main FastAPI app + Gemini logic + resume parsing
│   ├── requirements.txt    # Python dependencies
│   └── ...                 # venv (local only), etc.
└── src/                    # Frontend (React)
    ├── pages/
    │   ├── Upload.tsx      # Resume upload & analysis UI
    │   └── ...             # Other pages (Home, Results, RoleAdvice, etc.)
    ├── components/
    │   ├── Navbar.tsx
    │   └── ui/             # shadcn-ui components, Button, Badge, etc.
    ├── hooks/
    │   └── use-toast.ts
    ├── data/
    │   └── roleConfig.ts   # RoleKey type + role-based configs
    ├── main.tsx
    ├── App.tsx
    └── ...
## 📌 Future Enhancements

🔍 Support for more resume formats & multi-page resumes.

📊 More advanced ML-based skill extraction (NER instead of pure keyword match).

🧭 Detailed learning roadmaps per role, fully integrated into the UI.

💼 Job board integration with real-time openings (e.g. via APIs).

🌐 i18n support for multiple languages.


✨ Author

👤 Shaik Shahid
📧 shahidshaik9898p@gmail.com
