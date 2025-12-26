#!/bin/bash

# Hackathon Chatbot Startup Script
# This script starts the entire application stack

echo "🚀 Starting Hackathon Chatbot Application..."
echo "================================================"

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists, if not copy from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "✅ .env file created. Please review and update if needed."
fi

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down

# Start the services
echo "🚢 Starting Docker containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."

# Wait for PostgreSQL
echo "🐘 Waiting for PostgreSQL..."
while ! docker-compose exec -T postgres pg_isready -U admin -d hackathon_db &>/dev/null; do
    sleep 2
    echo "   Still waiting for PostgreSQL..."
done
echo "✅ PostgreSQL is ready!"

# Wait for Elasticsearch
echo "🔍 Waiting for Elasticsearch..."
while ! curl -s http://localhost:9200/_cluster/health &>/dev/null; do
    sleep 2
    echo "   Still waiting for Elasticsearch..."
done
echo "✅ Elasticsearch is ready!"

# Wait for Backend API
echo "🔧 Waiting for Backend API..."
while ! curl -s http://localhost:8000/health &>/dev/null; do
    sleep 2
    echo "   Still waiting for Backend API..."
done
echo "✅ Backend API is ready!"

# Wait for Frontend
echo "🎨 Waiting for Frontend..."
while ! curl -s http://localhost:3000 &>/dev/null; do
    sleep 2
    echo "   Still waiting for Frontend..."
done
echo "✅ Frontend is ready!"

echo ""
echo "🎉 Application is now running!"
echo "================================================"
echo "🌐 Frontend:     http://localhost:3000"
echo "🔧 Backend API:  http://localhost:8000"
echo "📚 API Docs:     http://localhost:8000/docs"
echo "🗄️  Database UI:  http://localhost:8080"
echo "🔍 Elasticsearch: http://localhost:9200"
echo ""
echo "🚀 Ready for the hackathon! Good luck! 🏆"
echo ""
echo "To stop the application, run: docker-compose down"