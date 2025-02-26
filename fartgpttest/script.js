const fartSentences = [
    "Did you hear that? It was a fart!",
    "Silent but deadly...",
    "Farts are the music of the soul.",
    "Who let the fart out?",
    "Farting is just your body's way of saying hello.",
    "A fart a day keeps the doctor away.",
    "Farts: Nature's whoopee cushion.",
    "Farting is the ultimate stress reliever.",
    "Farts are like fingerprints, each one is unique.",
    "Farting is the sound of happiness.",
    "Farts: The unsung heroes of comedy.",
    "Farting is an art form.",
    "Farts are the spice of life.",
    "Farting is the body's way of saying 'I love you'.",
    "Farts: The original social media.",
    "Farting is the ultimate power move.",
    "Farts are the soundtrack of life.",
    "Farting is the body's way of saying 'I'm alive!'",
    "Farts: The universal language.",
    "Farting is the body's way of saying 'I'm here!'",
];

const fartSounds = Array.from({ length: 16 }, (_, i) => 
    new Audio(`fart-sounds/fart-${i + 1}.mp3`)
);

let isSoundPlaying = false;

// Özel Cevap Sistemi
function getSpecialResponse(message) {
    try {
        const lowerCaseMessage = message.toLowerCase().trim();
        
        if (lowerCaseMessage.includes("ca") || lowerCaseMessage.includes("contract address")) {
            return "xMJ9BnMvrpEUrTEihDKSuQUh8J7P89oEQrbuCWWpump";
        } else if (lowerCaseMessage.includes("twitter")) {
            return 'Share tweets. <a href="https://x.com/fartgpt_cto" target="_blank" class="chat-link">https://x.com/fartgpt_cto</a>';
        } else if (lowerCaseMessage.includes("telegram")) {
            return 'Join Telegram. <a href="https://t.me/ctofartgpt" target="_blank" class="chat-link">https://t.me/ctofartgpt</a>';
        } else if (lowerCaseMessage.includes("instagram")) {
            return 'Instagram: <a href="https://www.instagram.com/fartgpt_sol" target="_blank" class="chat-link">https://www.instagram.com/fartgpt_sol</a>';
        } else if (lowerCaseMessage.includes("tiktok")) {
            return 'TikTok: <a href="https://www.tiktok.com/@fartgpt_sol" target="_blank" class="chat-link">https://www.tiktok.com/@fartgpt_sol</a>';
        } else if (lowerCaseMessage.includes("dev")) {
            return "I never want to hear about that son of a bitch again. He was a dickhead and a big asshole, that's the only thing we know about him.";
        }

        return null;
    } catch (error) {
        console.error("Hata:", error);
        return null;
    }
}

// Mesaj Gönderme Sistemi
function sendMessage() {
    try {
        const userInput = document.getElementById('user-input');
        const chatBox = document.getElementById('chat-box');

        const userMessageText = userInput.value.trim();
        if (!userMessageText) return;

        // Kullanıcı Mesajı
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.innerHTML = `<div class="message-content">${sanitizeInput(userMessageText)}</div>`;
        userMessage.style.opacity = '0';
        chatBox.appendChild(userMessage);

        setTimeout(() => (userMessage.style.opacity = '1'), 100);
        playRandomFart();

        // Bot Yanıtı
        setTimeout(() => {
            const specialResponse = getSpecialResponse(userMessageText);
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');

            if (specialResponse) {
                botMessage.innerHTML = `<div class="message-content">${specialResponse}</div>`;
            } else {
                const randomIndex = Math.floor(Math.random() * fartSentences.length);
                botMessage.innerHTML = `<div class="message-content">${fartSentences[randomIndex]}</div>`;
            }

            botMessage.style.opacity = '0';
            chatBox.appendChild(botMessage);
            setTimeout(() => (botMessage.style.opacity = '1'), 300);
            chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
        }, 500);

        userInput.value = '';
    } catch (error) {
        console.error("Hata:", error);
    }
}

// Rastgele Ses Çalma
function playRandomFart() {
    if (isSoundPlaying) return;
    isSoundPlaying = true;
    const randomIndex = Math.floor(Math.random() * 16);
    const sound = fartSounds[randomIndex];
    sound.currentTime = 0;
    sound.play().finally(() => (isSoundPlaying = false));
}

// XSS Koruması
function sanitizeInput(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Etkileşimler
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('send-btn').addEventListener('touchend', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Mobil Sidebar Sistemi
document.getElementById('toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
});

document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) return;
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Tema Değiştirme
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Modaller
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.id + '-modal';
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'block';
    });
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// CA Kopyalama Sistemi
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const contractAddress = "xMJ9BnMvrpEUrTEihDKSuQUh8J7P89oEQrbuCWWpump";
        navigator.clipboard.writeText(contractAddress)
            .then(() => {
                const toast = document.createElement('div');
                toast.textContent = "CA copied to clipboard!";
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.left = '50%';
                toast.style.transform = 'translateX(-50%)';
                toast.style.backgroundColor = 'rgba(0,0,0,0.8)';
                toast.style.color = 'white';
                toast.style.padding = '10px 20px';
                toast.style.borderRadius = '8px';
                toast.style.zIndex = '9999';
                document.body.appendChild(toast);

                setTimeout(() => toast.remove(), 2000);
            })
            .catch(() => alert("Failed to copy!"));
    });
});

// Mobil Klavye Ayarları
window.addEventListener('resize', function() {
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 300);
});