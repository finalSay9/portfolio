class ChatApp {
    constructor() {
        this.ws = null;
        this.userId = this.generateUserId();
        this.username = '';
        this.isConnected = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.showUsernameModal();
    }

    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    initializeElements() {
        this.elements = {
            usernameModal: document.getElementById('usernameModal'),
            usernameInput: document.getElementById('usernameInput'),
            joinButton: document.getElementById('joinButton'),
            messagesContainer: document.getElementById('messages'),
            messageInput: document.getElementById('messageInput'),
            sendButton: document.getElementById('sendButton'),
            connectionStatus: document.getElementById('connectionStatus'),
            userCount: document.getElementById('userCount')
        };
    }

    setupEventListeners() {
        // Join chat button
        this.elements.joinButton.addEventListener('click', () => this.joinChat());
        
        // Username input enter key
        this.elements.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinChat();
        });
        
        // Send message button
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Message input enter key
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize message input
        this.elements.messageInput.addEventListener('input', () => {
            this.elements.messageInput.style.height = 'auto';
            this.elements.messageInput.style.height = this.elements.messageInput.scrollHeight + 'px';
        });

        // Focus message input when page loads
        window.addEventListener('load', () => {
            this.elements.usernameInput.focus();
        });
    }

    showUsernameModal() {
        this.elements.usernameModal.style.display = 'flex';
        this.elements.usernameInput.focus();
    }

    hideUsernameModal() {
        this.elements.usernameModal.style.display = 'none';
    }

    joinChat() {
        const username = this.elements.usernameInput.value.trim();
        
        if (!username) {
            this.showError('Please enter a username');
            return;
        }

        if (username.length > 20) {
            this.showError('Username must be 20 characters or less');
            return;
        }

        this.username = username;
        this.hideUsernameModal();
        this.connectWebSocket();
    }

    connectWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/${this.userId}/${encodeURIComponent(this.username)}`;
        
        this.updateConnectionStatus('connecting', 'Connecting...');
        
        try {
            this.ws = new WebSocket(wsUrl);
            this.setupWebSocketHandlers();
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            this.updateConnectionStatus('disconnected', 'Connection failed');
            this.showReconnectOption();
        }
    }

    setupWebSocketHandlers() {
        this.ws.onopen = () => {
            console.log('Connected to chat server');
            this.isConnected = true;
            this.updateConnectionStatus('connected', 'Connected');
            this.elements.messageInput.focus();
            this.updateUserCount();
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.displayMessage(message);
        };

        this.ws.onclose = (event) => {
            console.log('Disconnected from chat server');
            this.isConnected = false;
            this.updateConnectionStatus('disconnected', 'Disconnected');
            
            if (!event.wasClean) {
                this.showReconnectOption();
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.updateConnectionStatus('disconnected', 'Connection error');
        };
    }

    sendMessage() {
        const message = this.elements.messageInput.value.trim();
        
        if (!message || !this.isConnected) {
            return;
        }

        if (message.length > 500) {
            this.showError('Message is too long (max 500 characters)');
            return;
        }

        try {
            this.ws.send(JSON.stringify({
                message: message,
                timestamp: new Date().toISOString()
            }));
            
            this.elements.messageInput.value = '';
            this.elements.messageInput.style.height = 'auto';
        } catch (error) {
            console.error('Failed to send message:', error);
            this.showError('Failed to send message');
        }
    }

    displayMessage(messageData) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        if (messageData.type === 'system') {
            messageElement.classList.add('system');
            messageElement.innerHTML = `
                <div class="message-bubble">
                    <div class="message-content">${this.escapeHtml(messageData.message)}</div>
                </div>
            `;
        } else {
            const isOwnMessage = messageData.user_id === this.userId;
            messageElement.classList.add(isOwnMessage ? 'own' : 'other');
            
            const timestamp = new Date(messageData.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            messageElement.innerHTML = `
                <div class="message-bubble">
                    ${!isOwnMessage ? `<div class="message-header">${this.escapeHtml(messageData.username)}</div>` : ''}
                    <div class="message-content">${this.escapeHtml(messageData.message)}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
            `;
        }
        
        this.elements.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }

    updateConnectionStatus(status, message) {
        this.elements.connectionStatus.className = `connection-status ${status}`;
        this.elements.connectionStatus.innerHTML = `
            <i class="fas ${status === 'connected' ? 'fa-wifi' : status === 'connecting' ? 'fa-spinner fa-spin' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        `;
        
        // Hide status after 3 seconds if connected
        if (status === 'connected') {
            setTimeout(() => {
                this.elements.connectionStatus.style.opacity = '0';
                setTimeout(() => {
                    this.elements.connectionStatus.style.display = 'none';
                }, 300);
            }, 3000);
        } else {
            this.elements.connectionStatus.style.display = 'flex';
            this.elements.connectionStatus.style.opacity = '1';
        }
    }

    async updateUserCount() {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            this.elements.userCount.textContent = data.count;
        } catch (error) {
            console.error('Failed to update user count:', error);
        }
    }

    showReconnectOption() {
        const reconnectButton = document.createElement('button');
        reconnectButton.textContent = 'Reconnect';
        reconnectButton.style.cssText = `
            margin-left: 10px;
            padding: 5px 10px;
            background: white;
            color: #ef4444;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
        `;
        
        reconnectButton.onclick = () => {
            this.connectWebSocket();
            reconnectButton.remove();
        };
        
        this.elements.connectionStatus.appendChild(reconnectButton);
    }

    showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ef4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1001;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize chat app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible, update user count
        setTimeout(() => {
            if (window.chatApp && window.chatApp.isConnected) {
                window.chatApp.updateUserCount();
            }
        }, 1000);
    }
});