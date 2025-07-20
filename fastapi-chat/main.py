from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import asyncio
from datetime import datetime
from typing import List, Dict
import uuid

app = FastAPI(title="FastAPI Chat App", description="Real-time chat application using WebSockets")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# In-memory storage for active connections and chat history
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.users: Dict[str, str] = {}  # websocket_id -> username
        self.chat_history: List[Dict] = []
    
    async def connect(self, websocket: WebSocket, user_id: str, username: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.users[user_id] = username
        
        # Send chat history to new user
        for message in self.chat_history[-50:]:  # Last 50 messages
            await websocket.send_text(json.dumps(message))
        
        # Notify others about new user
        await self.broadcast_system_message(f"{username} joined the chat")
    
    def disconnect(self, websocket: WebSocket, user_id: str):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if user_id in self.users:
            username = self.users[user_id]
            del self.users[user_id]
            # Schedule system message about user leaving
            asyncio.create_task(self.broadcast_system_message(f"{username} left the chat"))
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, message: Dict):
        # Add to chat history
        self.chat_history.append(message)
        
        # Keep only last 1000 messages in memory
        if len(self.chat_history) > 1000:
            self.chat_history = self.chat_history[-1000:]
        
        # Broadcast to all connected clients
        message_str = json.dumps(message)
        disconnected = []
        
        for connection in self.active_connections:
            try:
                await connection.send_text(message_str)
            except:
                disconnected.append(connection)
        
        # Remove disconnected clients
        for connection in disconnected:
            if connection in self.active_connections:
                self.active_connections.remove(connection)
    
    async def broadcast_system_message(self, message: str):
        system_message = {
            "id": str(uuid.uuid4()),
            "type": "system",
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "username": "System"
        }
        await self.broadcast(system_message)

manager = ConnectionManager()

@app.get("/", response_class=HTMLResponse)
async def get_chat_page(request: Request):
    """Serve the main chat page"""
    return templates.TemplateResponse("chat.html", {"request": request})

@app.websocket("/ws/{user_id}/{username}")
async def websocket_endpoint(websocket: WebSocket, user_id: str, username: str):
    """WebSocket endpoint for real-time chat"""
    await manager.connect(websocket, user_id, username)
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Create message object
            message = {
                "id": str(uuid.uuid4()),
                "type": "user",
                "message": message_data["message"],
                "username": username,
                "timestamp": datetime.now().isoformat(),
                "user_id": user_id
            }
            
            # Broadcast message to all clients
            await manager.broadcast(message)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)

@app.get("/api/users")
async def get_active_users():
    """Get list of currently active users"""
    return {"users": list(manager.users.values()), "count": len(manager.users)}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "active_connections": len(manager.active_connections)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)