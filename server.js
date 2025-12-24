require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = 7860;

app.use(cors({ origin: '*' })); 
app.use(express.json());
app.use(express.static(__dirname));

// --- FIREBASE LOGIN ---
console.log(">> [SYS] SYSTEM BOOTING...");

try {
    let serviceAccount;
    
    // 1. Check if Secret exists
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.log(">> [SYS] Reading Secret from Environment...");
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        } catch (e) {
            console.error(">> [FATAL] YOUR SECRET IS BAD JSON. Re-paste it carefully!");
            process.exit(1); // Stop here
        }
    } 
    // 2. Fallback for Localhost
    else {
        console.log(">> [SYS] No Secret found. Looking for local file...");
        try {
            serviceAccount = require('./serviceAccountKey.json');
        } catch (e) {
            console.error(">> [FATAL] NO LOGIN FOUND. Add FIREBASE_SERVICE_ACCOUNT to Secrets!");
            process.exit(1); // Stop here
        }
    }

    // 3. Initialize
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log(">> [SYS] FIREBASE CONNECTED SUCCESSFULLY.");
    }

} catch (error) {
    console.error(">> [CRITICAL FAILURE]", error.message);
    process.exit(1);
}

const db = admin.firestore();

// --- MIDDLEWARE ---
async function verifyUser(req, res, next) {
    const tokenHeader = req.headers.authorization;
    
    if (!tokenHeader) {
        return res.status(401).json({ success: false, error: "Unauthorized: No Token" });
    }

    try {
        // FIX: Handle both "Bearer <token>" AND raw "<token>"
        let token;
        if (tokenHeader.startsWith("Bearer ")) {
            token = tokenHeader.split(" ")[1];
        } else {
            token = tokenHeader;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.uid = decodedToken.uid; 
        next();
    } catch (e) {
        console.error("Token Verification Failed:", e.message);
        return res.status(403).json({ success: false, error: "Invalid Token" });
    }
}

// --- ROUTES ---
app.post('/api/mine', verifyUser, async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.uid);
        await db.runTransaction(async (t) => {
            const doc = await t.get(userRef);
            t.update(userRef, { credits: (doc.data()?.credits || 0) + 5 });
        });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/chat', verifyUser, async (req, res) => {
    try {
        const { prompt } = req.body;
        const userRef = db.collection('users').doc(req.uid);
        await db.runTransaction(async (t) => {
            const doc = await t.get(userRef);
            if ((doc.data()?.credits || 0) < 50) throw new Error("INSUFFICIENT_FUNDS");
            t.update(userRef, { credits: doc.data().credits - 50 });
        });

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using stable model with Retry Logic
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
        
        // Simple retry loop for 503 errors
        let text = "";
        for(let i=0; i<3; i++) {
            try {
                const result = await model.generateContent(prompt);
                text = result.response.text();
                break;
            } catch(e) {
                if(i===2) throw e;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        
        res.json({ success: true, text: text });

    } catch (error) {
        res.json({ success: true, text: JSON.stringify({ reply: error.message, translation: "System Error", iq: 0, logic: 0 }) });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => console.log(`>> SERVER ONLINE AT PORT ${PORT}`));