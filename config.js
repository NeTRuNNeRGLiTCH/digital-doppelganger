export const GEMINI_API_KEY = ""; 

export const firebaseConfig = {
    apiKey: "AIzaSyCz6MbXeUirG-qXWbtNjxRa-xxB3uzB4A4",
    authDomain: "digital-doppelganger-bcf19.firebaseapp.com",
    projectId: "digital-doppelganger-bcf19",
    storageBucket: "digital-doppelganger-bcf19.firebasestorage.app",
    messagingSenderId: "259802988084",
    appId: "1:259802988084:web:e457fc34aabe934db41461",
    measurementId: "G-07XSMKF39J"
};

export const AudioSys = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    
    init: function() { 
        if(this.ctx.state === 'suspended') this.ctx.resume(); 
    },

    play: function(type) {
        this.init(); 
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
        } 
        else if (type === 'success') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(880, now + 0.1);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } 
        else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } 
        else if (type === 'type') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now); osc.stop(now + 0.05);
        }
    }
};