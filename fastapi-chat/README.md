# FastAPI Real-time Chat Application

A modern, real-time chat application built with FastAPI, WebSockets, and vanilla JavaScript. Features a beautiful, responsive UI with real-time messaging capabilities.

## Features

- **Real-time messaging** using WebSockets
- **Modern, responsive UI** with beautiful animations
- **User presence tracking** - see who's online
- **Message history** - new users see recent messages
- **System notifications** - join/leave announcements
- **Connection status indicator**
- **Message validation** and error handling
- **Mobile-friendly design**
- **No database required** - uses in-memory storage

## Technologies Used

- **Backend**: FastAPI, WebSockets, Uvicorn
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Font Awesome

## Quick Start

### Prerequisites

- Python 3.7+
- pip

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd fastapi-chat
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:8000
   ```

### Using Docker (Optional)

```bash
# Build the image
docker build -t fastapi-chat .

# Run the container
docker run -p 8000:8000 fastapi-chat
```

## Project Structure

```
fastapi-chat/
├── main.py              # FastAPI application with WebSocket endpoints
├── requirements.txt     # Python dependencies
├── templates/
│   └── chat.html       # Main chat interface template
├── static/
│   ├── style.css       # Modern CSS styling
│   └── chat.js         # WebSocket client and chat functionality
└── README.md           # This file
```

## API Endpoints

### WebSocket
- `ws://localhost:8000/ws/{user_id}/{username}` - WebSocket connection for real-time chat

### HTTP Endpoints
- `GET /` - Main chat page
- `GET /api/users` - Get active users count
- `GET /api/health` - Health check endpoint

## Features in Detail

### Real-time Messaging
- Instant message delivery using WebSockets
- Automatic reconnection on connection loss
- Message validation (max 500 characters)

### User Experience
- Clean, modern interface with smooth animations
- Responsive design works on desktop and mobile
- Visual connection status indicator
- Online user counter

### Message Types
- **User messages**: Regular chat messages from users
- **System messages**: Join/leave notifications
- **Message history**: New users see the last 50 messages

### Security Features
- HTML escaping to prevent XSS attacks
- Message length validation
- Username length limits (20 characters)

## Customization

### Styling
Edit `static/style.css` to customize the appearance:
- Change color scheme by modifying the gradient values
- Adjust message bubble styles
- Modify animations and transitions

### Configuration
Modify `main.py` to adjust:
- Message history limit (currently 1000 messages in memory)
- Port and host settings
- WebSocket connection parameters

### Adding Features
The modular structure makes it easy to add:
- User authentication
- Private messaging
- File sharing
- Emoji support
- Message persistence with database

## Production Deployment

For production deployment, consider:

1. **Use a production ASGI server:**
   ```bash
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

2. **Add a reverse proxy** (Nginx) for static files and SSL termination

3. **Use a proper database** for message persistence (PostgreSQL, MongoDB)

4. **Add authentication** and user management

5. **Implement rate limiting** and message validation

6. **Add monitoring** and logging

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Troubleshooting

### Common Issues

**WebSocket connection fails:**
- Check if the server is running on the correct port
- Verify firewall settings
- Ensure WebSocket support in your browser

**Messages not appearing:**
- Check browser console for JavaScript errors
- Verify WebSocket connection status
- Refresh the page to reconnect

**Styling issues:**
- Clear browser cache
- Check if CSS files are loading correctly
- Verify Font Awesome CDN is accessible

### Development Mode

For development with auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Private/direct messaging
- [ ] File and image sharing
- [ ] Message reactions and emojis
- [ ] Chat rooms/channels
- [ ] Message search functionality
- [ ] Push notifications
- [ ] Database integration
- [ ] Message encryption
- [ ] Admin panel