# Plu For Rent — เว็บเช่ากล้อง

เว็บแอปสำหรับเช่ากล้องและอุปกรณ์ถ่ายภาพ ลูกค้าเลือกดูสินค้าเดี่ยวหรือเซ็ตเช่า (bundle) ส่งคำขอจองผ่านฟอร์มติดต่อหรือ Instagram DM ทีมงานจัดการสินค้า/หมวดหมู่/แบรนด์/คำขอติดต่อผ่านระบบแอดมิน

## โครงสร้างโปรเจกต์

Repo นี้เป็น monorepo แบบ 2 ส่วน แยก deploy กันคนละที่:

```
my-next-app/
├── app/            # Frontend — Next.js 16 (App Router)
├── api/            # Backend — NestJS + Prisma + PostgreSQL
└── public/         # รูปภาพ/asset สาธารณะของ frontend
```

| ส่วน | เทคโนโลยี | Deploy ที่ |
|---|---|---|
| Frontend (`app/`) | Next.js 16, React 19, Tailwind CSS 4, Motion | Vercel |
| Backend (`api/`) | NestJS 11, Prisma 7, PostgreSQL (Neon) | Render |

## ฟีเจอร์หลัก

- **แคตตาล็อกสินค้า** (`/products`) — ค้นหา, filter ตามหมวดหมู่, เรียงตามราคา/ความนิยม, สลับดูสินค้าเดี่ยว/เซ็ตเช่า
- **หน้ารายละเอียดสินค้า/เซ็ต** (`/products/[id]`) — สเปก, สินค้าที่รวมอยู่ในเซ็ต, ปุ่มจองผ่าน Instagram
- **ฟอร์มติดต่อ** (`/contact`) — ส่งคำขอจองพร้อมวันที่ต้องการเช่า บันทึกลงระบบจริง
- **ระบบแอดมิน** (`/admin`) — CRUD สินค้า, เซ็ตเช่า, หมวดหมู่, แบรนด์, ตั้งค่าเว็บไซต์, ดู dashboard สรุปคำขอติดต่อ
- **Authentication** — ระบบแอดมินป้องกันด้วย JWT, single admin account

## เริ่มต้นใช้งาน (Local Development)

### สิ่งที่ต้องมีก่อน

- Node.js 20+
- PostgreSQL database (แนะนำ [Neon](https://neon.tech) — ใช้ตัวเดียวกับ production)

### 1. ตั้งค่า Backend (`api/`)

```bash
cd api
npm install
cp .env.example .env
```

แก้ไข `api/.env` ให้ครบ:

```bash
DATABASE_URL="postgresql://..."   # connection string จาก Neon
PORT=3001
CORS_ORIGIN="http://localhost:4000"

# generate ค่าด้านล่างด้วยคำสั่งที่อยู่ใน .env.example
JWT_SECRET="..."
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="..."
```

รัน migration และ seed ข้อมูลตัวอย่าง:

```bash
npx prisma migrate dev
npx tsx prisma/seed.ts
```

เริ่ม backend:

```bash
npm run start:dev   # http://localhost:3001
```

### 2. ตั้งค่า Frontend (`app/`)

```bash
npm install
cp .env.example .env
```

แก้ไข `.env` ที่ root ให้ครบ:

```bash
API_URL="http://localhost:3001"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

เริ่ม frontend:

```bash
npm run dev   # http://localhost:4000
```

### 3. เข้าใช้งาน

- เว็บลูกค้า: http://localhost:4000
- ระบบแอดมิน: http://localhost:4000/admin/login (login ด้วย `ADMIN_USERNAME`/รหัสผ่านต้นฉบับที่ hash ไว้ใน `ADMIN_PASSWORD_HASH`)
- API โดยตรง: http://localhost:3001

## คำสั่งที่ใช้บ่อย

**Frontend** (รันจาก root):

```bash
npm run dev      # เริ่ม dev server (port 4000)
npm run build    # build production
npm run lint     # ตรวจสอบโค้ดด้วย ESLint
```

**Backend** (รันจาก `api/`):

```bash
npm run start:dev   # เริ่ม dev server พร้อม watch mode (port 3001)
npm run build        # build production
npm run lint          # ตรวจสอบโค้ดด้วย ESLint
npm run test           # unit test
npm run test:e2e        # e2e test (ต้องมี DATABASE_URL)
```

## Database

Schema จัดการด้วย Prisma (`api/prisma/schema.prisma`) โมเดลหลัก:

- `Product`, `Bundle`, `BundleItem` — สินค้าเดี่ยวและเซ็ตเช่า
- `Category`, `Brand` — หมวดหมู่และแบรนด์
- `Inquiry` — คำขอติดต่อจากลูกค้า (ชื่อ, เบอร์โทร, สินค้าที่สนใจ, ช่วงวันที่ต้องการเช่า)
- `SiteSettings` — ข้อมูลติดต่อ/ข้อความหน้าเว็บที่แก้ไขได้ผ่านระบบแอดมิน

คำสั่งที่เกี่ยวข้อง (รันใน `api/`):

```bash
npx prisma studio          # เปิด GUI ดู/แก้ข้อมูลในฐานข้อมูล
npx prisma migrate dev     # สร้าง migration ใหม่ระหว่างพัฒนา
npx prisma generate        # generate Prisma Client ใหม่ (รันอัตโนมัติหลัง npm install)
```

## Deployment

- **Frontend** deploy บน Vercel อัตโนมัติเมื่อ push เข้า `main` (`api/` ถูก exclude ผ่าน `.vercelignore`)
- **Backend** deploy บน Render อัตโนมัติเมื่อ push เข้า `main` — ต้องตั้ง environment variables ให้ครบบน Render dashboard ก่อน (ดูรายการใน `api/.env.example`) มิฉะนั้น service จะ crash ตอน startup
- CI (GitHub Actions) รัน lint + build (+ test สำหรับ backend) แยกกันตาม path ที่เปลี่ยน ดูที่ `.github/workflows/`

## เอกสารเพิ่มเติม

ดูสถานะโปรเจกต์ ประวัติการตรวจสอบ และ task list ที่ [req.md](req.md)
