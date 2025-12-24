/*
remember to change the host in all pages to upload it...
hehe, surely i won't but just incase.
*/

import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const BACKEND_URL = "/api";

export async function generateResponse(model, prompt) {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const token = await user.getIdToken();

        const response = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token 
            },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error);

        let rawText = data.text;
        try {
            const match = rawText.match(/\{[\s\S]*\}/);
            return match ? JSON.parse(match[0]) : { reply: rawText, translation: "Raw", iq: 100, logic: 50 };
        } catch {
            return { reply: rawText, translation: "Raw", iq: 100, logic: 50 };
        }

    } catch (e) {
        return { reply: `[ERROR] ${e.message}`, translation: "System", iq: 0, logic: 0 };
    }
}


export async function discoverModel() { return "gemini-2.5-flash"; }
export async function summarizeMemory(history) {
    return "Memory Summarized."; 
}