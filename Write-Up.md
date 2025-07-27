🧠 AI Component Generator – Write-Up
A full-stack AI-powered platform that allows users to generate, preview, and auto-save web components (HTML/CSS/JS) in real-time, with authentication and a sandboxed environment for safe rendering.

🏗️ Architecture Diagram (Text-Based)
               +--------------------------+
               |     Client (Next.js)     |
               |  - React Components      |
               |  - MUI UI                |
               |  - Auth Pages            |
               +------------+-------------+
                            |
                            | (REST API Calls)
                            ▼
               +--------------------------+
               |   Backend (Node + Express)|
               |  - Auth (Supabase Auth)   |
               |  - Component CRUD         |
               |  - Auto-save Handler      |
               +------------+-------------+
                            |
                            | (MongoDB Queries)
                            ▼
                  +------------------+
                  |   MongoDB Atlas   |
                  | - Users           |
                  | - Components      |
                  +------------------+

               +--------------------------+
               |  Sandboxed Preview Iframe |
               | - Loads HTML/CSS/JS live  |
               | - Isolated & Secure       |
               +--------------------------+

💾 State Management & Persistence Strategy
Frontend (Next.js + React):
State Management: Local component state via useState and useEffect.

Real-time Preview: Updates inside a sandboxed <iframe> using srcDoc as the source.

Authentication: Managed via Supabase Auth, storing session in local storage for persistent login.

Auto-save: Debounced logic triggers every few seconds of inactivity, sending changes to the backend.

Backend (Node.js + Express + MongoDB):
CRUD API Endpoints: For creating, reading, updating, and deleting AI-generated components.

Auto-save API: Receives frequent updates and persists to MongoDB.

User-specific isolation: Each user's components are stored with user ID for scoped access.

⚖️ Key Decisions & Trade-offs
✅ Sandboxing Preview
Decision: Use an <iframe> with srcDoc for rendering generated code.

Pros: Isolated execution, avoids breaking the main app UI.

Cons: Cannot access React context or hooks inside the preview.

✅ Auto-save Logic
Decision: Implement debounced auto-save after delay of inactivity (e.g., 2–3 seconds).

Pros: User experience is seamless; data isn't lost on refresh or accidental close.

Cons: Requires precise debounce tuning to balance performance and frequency.

✅ Next.js for Frontend
Decision: Chosen for server-side rendering capabilities and rapid development with React.

Pros: Optimized performance, easy routing, SEO-friendly.

Cons: Requires handling of client/server lifecycle differences carefully.

✅ MongoDB for Storage
Decision: Use MongoDB Atlas for storing user components and metadata.

Pros: Flexible document schema, scalable, cloud-hosted.

Cons: Needs careful indexing and structure to avoid performance bottlenecks at scale.

