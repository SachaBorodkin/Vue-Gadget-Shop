app.component('chat-bot', {
    template: /*html*/`
    <div class="chatbot-container" :class="{ 'open': isOpen }">
        <button class="chat-toggle" @click="isOpen = !isOpen">
            {{ isOpen ? '✖' : '💬 Besoin d\\'aide ?' }}
        </button>
        
        <div v-if="isOpen" class="chat-window">
            <div class="chat-header">Assistant Gemini</div>
            <div class="chat-messages" ref="scrollBox">
                <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
                    <strong>{{ msg.role === 'user' ? 'Vous' : 'Gemini' }}:</strong>
                    <p>{{ msg.text }}</p>
                </div>
                <div v-if="loading" class="message bot"><em>Gemini réfléchit...</em></div>
            </div>
            <div class="chat-input">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Posez une question...">
                <button @click="sendMessage" :disabled="loading">Envoyer</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            isOpen: false,
            userInput: '',
            messages: [{ id: 1, role: 'bot', text: 'Bonjour ! Comment puis-je vous aider avec nos gadgets ?' }],
            loading: false,
            // Note: In production, never expose your API key. Use a backend proxy.
            apiKey: 'AIzaSyDIflUTDmf_aGqGU9HlBKKanpUVjk8Gx_0' 
        }
    },
    methods: {
        async sendMessage() {
            if (!this.userInput.trim() || this.loading) return;

            const userText = this.userInput;
            this.messages.push({ id: Date.now(), role: 'user', text: userText });
            this.userInput = '';
            this.loading = true;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: userText }] }]
                    })
                });

                const data = await response.json();
                const botReply = data.candidates[0].content.parts[0].text;
                
                this.messages.push({ id: Date.now() + 1, role: 'bot', text: botReply });
            } catch (error) {
                this.messages.push({ id: Date.now() + 1, role: 'bot', text: "Désolé, je rencontre une erreur technique." });
            } finally {
                this.loading = false;
                this.$nextTick(() => {
                    const box = this.$refs.scrollBox;
                    box.scrollTop = box.scrollHeight;
                });
            }
        }
    }
});