@echo off
echo 🔄 Starting Tracker Update...

REM Pull latest changes
echo 📥 Pulling latest changes from Git...
git pull origin main

REM Stop existing containers
echo 📦 Stopping existing containers...
docker-compose down

REM Build new image
echo 🔨 Building new Docker image...
docker-compose build --no-cache

REM Start containers
echo ▶️ Starting containers...
docker-compose up -d

REM Check status
echo 📊 Checking container status...
docker-compose ps

echo ✅ Update completed!
echo 🌐 Tracker is running at: http://localhost:3000
echo 📝 To view logs: docker-compose logs -f tracker

pause 