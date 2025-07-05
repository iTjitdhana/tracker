# Production Dashboard Bundle

โปรเจค Dashboard สำหรับแสดงตารางงานการผลิตสินค้าครัวกลาง

## โครงสร้างไฟล์

```
dashboard_bundle/
├── pages/
│   ├── index.tsx              # หน้าแรก Dashboard
│   ├── _app.tsx               # App wrapper
│   └── _document.tsx          # Document wrapper
├── components/
│   └── ui/
│       ├── badge.tsx          # Badge Component
│       └── card.tsx           # Card Component
├── lib/
│   └── utils.ts               # Utility functions
├── public/
│   └── images/
│       ├── jdn-logo.png           # โลโก้ JDN
│       ├── banana-leaf-logo.png   # โลโก้ Banana Leaf
│       ├── shabu101-logo.jpg      # โลโก้ Shabu 101
│       ├── meating-house-logo.png # โลโก้ The Meating House
│       ├── clean-kitchen-background.jpg      # พื้นหลังครัวสะอาด
│       ├── completed-dish-background.jpg     # พื้นหลังอาหารเสร็จ
│       ├── quality-control-background.jpg    # พื้นหลังควบคุมคุณภาพ
│       └── storage-room-background.jpg       # พื้นหลังห้องเก็บของ
├── styles/
│   └── globals.css            # Global styles
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## ฟีเจอร์หลัก

- **แสดงสถานะงาน**: เสร็จสิ้น, กำลังดำเนินการ, รอดำเนินการ, ยกเลิก
- **ตารางงานการผลิต**: แสดงรายละเอียดงานแต่ละชิ้น
- **การกรองตามสถานะ**: คลิกที่สถานะเพื่อกรองข้อมูล
- **การเลือกวันที่**: สามารถเลือกวันที่ที่ต้องการดู
- **แสดงเวลาจริง**: แสดงเวลาปัจจุบัน

## การใช้งาน

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

2. รันโปรเจค:
   ```bash
   npm run dev
   ```

3. เปิดเว็บเบราว์เซอร์ไปที่ `http://localhost:3000`

## ข้อกำหนด

- Next.js
- React
- Tailwind CSS
- Lucide React (สำหรับ icons)
- Class Variance Authority (สำหรับ UI components)

## การปรับแต่ง

- แก้ไขข้อมูลใน `productionData` array เพื่อเปลี่ยนข้อมูลงาน
- ปรับแต่งสีและสไตล์ใน `statusConfig` object
- เพิ่มหรือลบสถานะงานตามต้องการ 