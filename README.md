# 🏭 Production Tracker Dashboard

ระบบติดตามการผลิตแบบ Real-time สำหรับโรงงานอุตสาหกรรม

## 🌟 Features

### 📊 Dashboard
- แสดงสถานะการผลิตแบบ Real-time
- จำนวนงานที่กำลังดำเนินการ
- สถิติการผลิตรายวัน
- การแจ้งเตือนเมื่อมีปัญหา

### 📝 Logs Management
- ดูประวัติการทำงานทั้งหมด
- แก้ไขข้อมูล Logs ได้
- กรองข้อมูลตามวันที่
- เรียงลำดับตาม Job Name และ Process Number

### 📋 Workplans Management
- จัดการแผนงานการผลิต
- กำหนดผู้ปฏิบัติงาน (สูงสุด 4 คน)
- ตั้งเวลาเริ่มต้นและสิ้นสุด
- ดูประวัติแผนงาน

## 🛠️ Technology Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** MySQL/MariaDB
- **Deployment:** Docker, Docker Compose
- **Version Control:** Git

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker และ Docker Compose
- MySQL/MariaDB Database

### Development
```bash
# Clone repository
git clone https://github.com/iTjitdhana/tracker.git

# เข้าไปในโฟลเดอร์
cd tracker

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

### Production Deployment
```bash
# Clone บน server
git clone https://github.com/iTjitdhana/tracker.git C:\tracker

# เข้าไปในโฟลเดอร์
cd C:\tracker

# Deploy ด้วย Docker
deploy.bat
```

## 📁 Project Structure

```
tracker/
├── pages/                 # Next.js pages
│   ├── index.tsx         # Dashboard
│   ├── logs.tsx          # Logs page
│   ├── workplans.tsx     # Workplans page
│   └── api/              # API endpoints
├── components/           # React components
├── public/              # Static files
├── styles/              # CSS files
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose
├── deploy.bat           # Windows deployment script
├── update.bat           # Windows update script
└── README.md           # This file
```

## 🌐 Access URLs

- **Dashboard:** http://localhost:3000
- **Logs:** http://localhost:3000/logs
- **Workplans:** http://localhost:3000/workplans

## 🔧 Configuration

### Database Configuration
แก้ไขใน `docker-compose.yml`:
```yaml
environment:
  - DB_HOST=192.168.0.93
  - DB_USER=root
  - DB_PASSWORD=123456
  - DB_NAME=esp_tracker
```

### Port Configuration
แก้ไขใน `docker-compose.yml`:
```yaml
ports:
  - "3000:3000"  # เปลี่ยน 3000 เป็น port ที่ต้องการ
```

## 📋 Database Schema

### Tables
- `logs` - ข้อมูล Logs การทำงาน
- `work_plans` - แผนงานการผลิต
- `work_plan_operators` - ผู้ปฏิบัติงานในแผนงาน

## 🔄 Update Process

### Development Workflow
1. แก้ไขโค้ดบนเครื่อง local
2. ทดสอบด้วย `npm run dev`
3. Commit และ push ไปยัง Git
4. รัน `update.bat` บน server

### Production Workflow
1. Server จะ auto-restart เมื่อ reboot
2. ใช้ `update.bat` เพื่อ update โปรแกรม
3. Monitor logs ด้วย `docker-compose logs -f tracker`

## 🛠️ Useful Commands

### Docker Commands
```bash
# ดูสถานะ containers
docker-compose ps

# ดู logs
docker-compose logs -f tracker

# Restart service
docker-compose restart tracker

# เข้าไปใน container
docker-compose exec tracker sh
```

### Git Commands
```bash
# ดูสถานะ Git
git status

# ดู commit history
git log --oneline

# Update บน server
git pull origin main
```

## 🔍 Troubleshooting

### ถ้า Container ไม่ Start
   ```bash
# ดู logs เพื่อหาสาเหตุ
docker-compose logs tracker
```

### ถ้า Database Connection Error
ตรวจสอบ:
- Database server ทำงานอยู่
- IP, Username, Password ถูกต้อง
- Database มีอยู่

### ถ้า Git Pull Error
   ```bash
# ดู Git status
git status

# ถ้ามี conflicts
git stash
git pull origin main
git stash pop
```

## 📞 Support

หากมีปัญหาหรือต้องการความช่วยเหลือ:
- สร้าง Issue บน GitHub
- ติดต่อทีมพัฒนา

## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ for Production Management** 