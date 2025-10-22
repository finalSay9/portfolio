#!/bin/bash

# FastAPI Chat Application Startup Script
echo "🚀 Starting FastAPI Chat Application..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

echo "✅ Dependencies ready"
echo "🌐 Starting server on http://localhost:8000"
echo "📝 Open your browser and visit: http://localhost:8000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload