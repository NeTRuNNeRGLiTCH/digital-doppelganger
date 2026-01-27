🧬 Digital Doppelgänger: Neural AI Ecosystem
  Digital Doppelgänger is a high-performance, full-stack AI simulation platform. It creates a persistent "digital twin" of the user by analyzing conversation patterns, logical reasoning, and linguistic styles. Built with a   focus on real-time data synchronization and complex state management, it offers a gamified "Cyberpunk" interface for interacting with LLMs.
  
🚀 Technical Highlights
  🧠 Advanced AI Prompt Engineering
    Dynamic Personas: Implemented a modular system to swap AI "Cores" (Zen, Rogue, Tactical, Corpo) via complex prompt injection, altering the LLM's tone, sentiment, and language constraints in real-time.
    Psyche Analysis: Developed a diagnostic tool that parses long-form conversation history to generate a structured JSON profile of user strengths, weaknesses, and behavioral traits.
    
  🔐 Robust Backend & Security
    Middleware Authentication: Secure API architecture using Firebase Admin SDK to verify JWT ID Tokens, ensuring only authenticated sessions can access expensive AI resources.
    Server-Side Transactions: Implemented Firestore transactions to manage the "Data Credits" economy, preventing race conditions and ensuring data integrity during mining or marketplace purchases.
    
  🎨 Frontend Engineering & 3D Visualization
    Reactive UI: A custom-built, responsive CSS architecture featuring CRT scanline effects, glitch animations, and dynamic theming (Red, Gold, Matrix, Noir) via CSS Custom Properties.
    Data Visualization: Integrated Three.js to render a 3D global surveillance globe and an interactive neural network background that reacts to window resizing and user state.
    Audio Engine: Created a Vanilla JS Web Audio API wrapper to provide low-latency haptic sound feedback for terminal interactions.
    
  🛠 Tech Stack
    Frontend: HTML5, CSS3 (SCSS logic), JavaScript (ES6+), Three.js.
    Backend: Node.js, Express.js.
    AI Integration: Google Generative AI (Gemini 1.5/2.5 Flash).
    Database & Auth: Firebase Firestore, Firebase Authentication.
    State Management: Real-time listeners (Snapshots) for multi-device sync.
    
📂 Core Features
  Feature	Description
  Neural Command	Persistence-based AI chat with IQ/Logic metric tracking.
  The Nexus	Global real-time public chat node with "Priority Pinning" logic.
  Marketplace	In-app economy for purchasing UI themes and AI personalities.
  Archives	A memory-management system allowing users to "save" specific AI responses to a private database shard.
  Luck Protocol	A probability-based slot machine game utilizing server-side credit validation.
  
🔧 Installation & Setup
  Clone & Install Dependencies:
  git clone https://github.com/NeTRuNNeRGLiTCH/digital-doppelganger.git
  cd digital-doppelganger
  npm install
  Environment Configuration:
  Create a .env file in the root:
  GEMINI_API_KEY=your_key_here
  FIREBASE_SERVICE_ACCOUNT={"your":"json_key_here"}
  Firebase Client Config:
  Update config.js with your Firebase Web SDK credentials.
  Launch:
  npm start
  
💡 Key Challenges & Solutions
  Challenge: AI response latency and "503 Service Unavailable" errors during peak times.
  Solution: Implemented a recursive retry-loop with exponential backoff in server.js to ensure high availability for AI content generation.
  Challenge: Managing real-time data across multiple complex UI panels without a framework like React.
  Solution: Leveraged Firebase onSnapshot listeners combined with a centralized userData object, ensuring the UI stays in sync with the database across all modules automatically.


and if this sounds so much then you can try it using this link:
https://netrunnerglitch-digital-doppelganger.hf.space
