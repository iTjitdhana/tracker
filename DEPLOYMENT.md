# 🐳 Docker Deployment Guide

## Prerequisites
- Docker และ Docker Compose ติดตั้งบน server แล้ว
- Database MySQL/MariaDB ทำงานที่ `192.168.0.93`

## 📋 ขั้นตอนการ Deploy

### 1. Copy โปรเจคไปยัง Server
```bash
# Copy โฟลเดอร์ tracker ไปยัง server
# ตัวอย่าง: C:\tracker
```

### 2. เข้าไปในโฟลเดอร์โปรเจค
```bash
cd C:\tracker
```

### 3. รันคำสั่ง Deploy
**สำหรับ Windows:**
```bash
deploy.bat
```

**สำหรับ Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**หรือใช้คำสั่ง Docker Compose โดยตรง:**
```bash
# Stop containers เดิม
docker-compose down

# Build image ใหม่
docker-compose build --no-cache

# Start containers
docker-compose up -d
```

## 🔧 คำสั่งที่มีประโยชน์

### ดูสถานะ Containers
```bash
docker-compose ps
```

### ดู Logs
```bash
# ดู logs ทั้งหมด
docker-compose logs

# ดู logs แบบ real-time
docker-compose logs -f

# ดู logs ของ service เฉพาะ
docker-compose logs tracker
```

### Stop/Start Services
```bash
# Stop services
docker-compose stop

# Start services
docker-compose start

# Restart services
docker-compose restart
```

### Update Application
เมื่อมีการแก้ไขโค้ด:
1. Copy โปรเจคใหม่ไปยัง server
2. รัน `deploy.bat` หรือ `./deploy.sh` อีกครั้ง

## 🌐 การเข้าถึง
- **Dashboard:** http://localhost:3000
- **Logs Page:** http://localhost:3000/logs  
- **Workplans Page:** http://localhost:3000/workplans

## 🔍 Troubleshooting

### ถ้า Container ไม่ Start
```bash
# ดู logs เพื่อหาสาเหตุ
docker-compose logs tracker
```

### ถ้า Database Connection Error
ตรวจสอบ:
- Database server ทำงานอยู่ที่ `192.168.0.93`
- Username/password ถูกต้อง
- Database `esp_tracker` มีอยู่

### ถ้าต้องการเข้าไปใน Container
```bash
docker-compose exec tracker sh
```

## 📝 Environment Variables
สามารถแก้ไขได้ใน `docker-compose.yml`:
- `DB_HOST`: Database server IP
- `DB_USER`: Database username  
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name 