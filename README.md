# 💡 AI Code UI Playground

A modern full-stack AI-powered **UI component generator** built with **Next.js**, **Tailwind CSS**, **MongoDB**, and **OpenRouter LLM APIs**. This tool allows users to **generate, edit, and preview React UI components** simply by describing them in natural language.

---

## 🚀 Features

- ✨ **Prompt-to-Component Generation** using LLMs (like LLaMA 3, Gemma, GPT-4o-mini via OpenRouter)
- 🧠 Smart layout & code suggestions using AI
- 🎨 **Live code preview** of generated JSX + CSS
- 💾 **Session-based storage** – keep track of your component ideas
- 🔐 **Authentication system** with secure login/logout
- 📁 Persistent backend using **MongoDB**
- ⚡ Built-in code editor and live iframe renderer
- 🌙 Clean, responsive UI using Tailwind CSS

---


---

## 🛠️ Tech Stack

| Frontend          | Backend          | AI Integration        | Storage         |
|-------------------|------------------|------------------------|-----------------|
| Next.js 14 (App Router) | Node.js + Express (if used) | OpenRouter (LLaMA 3, GPT-4o-mini, etc.) | MongoDB (Mongoose) |
| Tailwind CSS      | REST API         | OpenAI-compatible APIs | Session-based DB |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Prateek-02/ai-component-generator.git
cd ai-component-generator
```

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the root and add:

env
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
💡 Get a free OpenRouter API key from https://openrouter.ai

🧪 Run Locally

npm run dev
Open http://localhost:3000 to view the app.

✍️ Usage
Login or register

Create a new session

Enter a prompt like:
“Create a login form with two fields and a submit button”

Instantly preview the JSX + CSS

Edit, view or copy code as needed


📂 Folder Structure
frontend/
└── src/
    ├── app/                # Next.js App Router pages and layouts
    │   ├── layout.tsx      # Root layout (navbar, providers, etc.)
    │   ├── page.tsx        # Home page (dashboard or landing)
    │   ├── login/          # Login page
    │   │   └── page.tsx
    │   ├── signup/         # Signup page
    │   │   └── page.tsx
    │   ├── sessions/       # Session management (list, create, view)
    │   │   ├── page.tsx    # List/create sessions
    │   │   └── [id]/       # Dynamic route for a single session
    │   │       └── page.tsx
    │   └── ...             # Other routes as needed
    │
    ├── components/         # Reusable UI components
    │   ├── AuthForm.tsx    # Shared login/signup form
    │   ├── ChatPanel.tsx   # Chat UI
    │   ├── CodePreview.tsx # Live code/preview
    │   ├── Tabs.tsx        # For JSX/CSS tabs
    │   └── ...             # Other UI components
    │
    ├── store/              # Zustand stores (auth, session, chat, etc.)
    │   └── auth.ts
    │
    ├── utils/              # API utilities, helpers
    │   └── api.ts
    │
    ├── styles/             # Tailwind/global styles (if needed)
    │   └── globals.css
    │
    └── types/              # TypeScript types/interfaces (optional)
        └── index.ts
backend/
├── middleware/
│   └── auth.js                  # Middleware for JWT/session authentication
│
├── models/
│   ├── Session.js               # Mongoose schema for code sessions
│   └── User.js                  # Mongoose schema for users
│
├── routes/
│   ├── ai.js                    # Routes to handle AI generation requests
│   ├── auth.js                  # Routes for login, register, logout
│   └── session.js               # Routes to create & fetch sessions
│
├── services/
│   └── ai.js                    # Service to interact with OpenRouter API
│
├── node_modules/                # Installed dependencies
│
├── .env.example                 # Example env file (API keys, DB URI)
├── .gitignore                  # Git ignored files/folders
├── db.js                        # MongoDB connection file
├── index.js                     # App entry point – sets up Express and starts the server
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Exact dependency versions



✅ Highlighted Capabilities
🌐 Works fully in-browser
🔗 Connects with LLMs via OpenRouter (Free & Fast)
📘 Modern React practices – hooks, stores, file-based routing
🧩 Modular & scalable codebase
💼 Built to impress – ideal for product demos & portfolios

🎯 Why This Project?
✅ Solves a real-world developer pain point
✅ Combines AI + UI + Code generation
✅ Showcases your full-stack expertise
✅ Demonstrates prompt engineering, state management, and live code rendering

🔒 Authentication & Logout
Token-based auth using localStorage
Secure Logout button built-in for session management

🌍 Deployment
You can deploy it on:

Vercel (Frontend + Next.js API Routes)
Render / Railway (For MongoDB and backend if separate)

🧠 Credits
OpenRouter.ai
Next.js
Tailwind CSS
MongoDB Atlas



