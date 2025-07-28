# ⚡ CodePreview – AI-Powered Live Code Generator

CodePreview is a full-stack AI-driven platform that allows users to **generate, preview, and edit live code** (JSX + CSS) instantly using natural language prompts. Powered by OpenRouter LLMs, it simplifies UI prototyping and boosts developer productivity.

---

## 🔥 Features

- 🧠 **Prompt-to-Code**: Describe what you want, and get JSX + CSS code instantly.
- ✨ **Live Preview**: View and edit generated code in real-time.
- 🔐 **Authentication**: Secure login, signup, and logout.
- 🧩 **Session Management**: Save and revisit your code sessions.
- 🚀 **Fast & Free LLM Integration**: Uses models like `GPT-4o-mini`, `Gemma`, `LLaMA 3/4`, and `Gemini 2.0 Flash` via OpenRouter.

---

## 🚀 Live Demo

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000?logo=vercel&labelColor=000)](https://ai-component-generator-gold.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-0077CC?logo=render&labelColor=0077CC)](https://ai-component-generator.onrender.com)


---

## ✍️ Usage

1. **Login or Register**
2. **Create a New Session**
3. **Enter a Prompt**  
   _Example_:  
   `"Create a login form with two fields and a submit button"`
4. **Get JSX + CSS**  
   Instantly preview, edit, and copy code.

---

## 🧪 Run Locally

### 1️⃣ Clone & Install
```bash
git clone https://github.com/Prateek-02/ai-component-generator.git
cd ai-component-generator
npm install

2️⃣ Setup Environment Variables
Create .env files in both frontend/ and backend/ 

Backend .env.
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key

💡 Get a free OpenRouter API key at: https://openrouter.ai

3️⃣ Run Development Servers
Start Backend
cd backend
npm run dev

Start Frontend
cd frontend
npm run dev
Visit http://localhost:3000


📂 Folder Structure

🔷 Frontend – Next.js + TypeScript + Tailwind
frontend/
└── src/
    ├── app/
    │   ├── layout.tsx          # Global layout
    │   ├── page.tsx            # Landing/dashboard
    │   ├── login/page.tsx      # Login page
    │   ├── signup/page.tsx     # Signup page
    │   └── sessions/
    │       ├── page.tsx        # Session list + create
    │       └── [id]/page.tsx   # View single session
    ├── components/
    │   ├── AuthForm.tsx        # Reusable login/signup form
    │   ├── ChatPanel.tsx       # Prompt + response UI
    │   ├── CodePreview.tsx     # Live JSX/CSS preview
    │   └── Tabs.tsx            # Tab switcher
    ├── store/                  # Zustand stores
    │   └── auth.ts
    ├── utils/
    │   └── api.ts              # API calls (auth, ai, session)
    ├── styles/
    │   └── globals.css
    └── types/
        └── index.ts

🔶 Backend – Node.js + Express + MongoDB
backend/
├── middleware/
│   └── auth.js                 # Auth middleware
├── models/
│   ├── Session.js              # Mongoose schema for sessions
│   └── User.js                 # Mongoose schema for users
├── routes/
│   ├── ai.js                   # AI generation route
│   ├── auth.js                 # Register/login/logout
│   └── session.js              # Create/fetch sessions
├── services/
│   └── ai.js                   # OpenRouter interaction logic
├── db.js                       # MongoDB connection logic
├── index.js                    # Express app entry point
├── .env.example                # Sample env variables
├── .gitignore
├── package.json
└── package-lock.json

✅ Highlighted Capabilities

🌐 Fully in-browser, no extensions needed
⚡ Fast code generation with free-tier LLMs via OpenRouter
💼 Resume-worthy: AI + UI + Real-world developer tooling
🧠 State management with Zustand
🔒 Token-based auth using localStorage
📦 Clean, modular, and scalable structure

🌍 Deployment Options
Frontend → Vercel
Backend → Render or Railway
Database → MongoDB Atlas


🧠 Built With
OpenRouter.ai
Next.js
Tailwind CSS
MongoDB
Express.js
Zustand

🙌 Credits
Special thanks to the open-source AI community and LLM providers making tools like this possible for everyone.

🚀 License
This project is licensed under the MIT License.
