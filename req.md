# Requirements & QA Checklist — เว็บเช่ากล้อง (Plu For Rent)

> จัดทำโดย PM หลังสำรวจโค้ดปัจจุบัน (2026-08-15)
> วัตถุประสงค์: (1) ตรวจสอบความเรียบร้อยของโปรเจกต์ที่ทำไปแล้วบางส่วน (2) เพิ่มฟีเจอร์ใหม่ — เลือกสินค้าได้หลายชิ้น แล้วส่งรายการไปแชท IG ได้เลย

---

## 0. สถานะปัจจุบันของระบบ (Baseline)

โครงสร้าง: Next.js 16 (App Router) เป็น frontend ที่ root repo + NestJS/Prisma API แยกอยู่ที่ `api/` (deploy คนละที่กับ frontend)

**Deployment**: Frontend deploy บน Vercel (production) — Backend (`api/`) deploy บน **Render** (ยืนยันโดย PM เมื่อ 2026-08-15)

สิ่งที่ **ใช้งานได้จริงแล้ว**:
- หน้ารายการสินค้า `/products` — สลับ "สินค้าเดี่ยว" / "เซ็ตเช่า", ค้นหา, filter หมวดหมู่, sort
- หน้ารายละเอียดสินค้า/เซ็ต `/products/[id]`
- ระบบแอดมิน CRUD สินค้า/เซ็ต/หมวดหมู่/แบรนด์/ตั้งค่าเว็บ (`/admin/*`)
- อัปโหลดรูปผ่าน Cloudinary
- Prisma schema: `Category`, `Brand`, `Product`, `Bundle`, `BundleItem`, `SiteSettings`

สิ่งที่ **ยังเป็น mock / ยังไม่เสร็จ** (สำคัญมาก ต้องแก้ก่อนขึ้นจริง):
1. **ฟอร์มติดต่อ (`/contact`) กดส่งไม่ได้จริง** — ไม่มี submit handler, ไม่มี backend endpoint รับข้อมูล มีข้อความกำกับในหน้าเว็บว่า "นี่คือฟอร์มตัวอย่าง (mock)"
2. **ปุ่ม "จอง" เด้งไป IG DM เฉยๆ** (`https://ig.me/m/<handle>`) โดยไม่มีข้อมูลสินค้าติดไปด้วย เพราะ ig.me ไม่รองรับ prefilled message
3. **Admin login/logout เป็นของปลอมทั้งหมด** — กรอกอะไรก็ได้ ปุ่ม login คือแค่ลิงก์เด้งไปหน้า dashboard ไม่มีการเช็ค credential ใดๆ
4. **API ทุกเส้นไม่มี authentication/authorization เลย** — ใครก็ลบ/แก้สินค้า ราคา ตั้งค่าเว็บได้ผ่าน API ตรงๆ (รวมถึง `DELETE`)
5. **ไม่มีระบบเลือกสินค้าหลายชิ้น/ตะกร้าใดๆ** — ทุก flow ปัจจุบันเลือกได้ทีละ 1 ชิ้นเท่านั้น
6. **Dashboard แอดมินโชว์ mock data ล้วนๆ** (ยอดจอง, สถิติ) ไม่ได้ต่อกับข้อมูลจริง เพราะไม่มี Order/Booking model ในฐานข้อมูล
7. **มีคำว่า "จองผ่าน LINE" ในหน้าเว็บ แต่ไม่มีระบบ LINE เชื่อมจริง** — มีแค่ช่องกรอก LINE ID เฉยๆ
8. **แทบไม่มี automated test เลย** ทั้ง frontend และ backend (backend มี Jest ตั้งไว้แต่มีแค่ test เดโม 1 ไฟล์)
9. พบไฟล์ `.env` ที่ root มี Cloudinary credentials อยู่ในเครื่อง — ต้อง**ยืนยันว่าไม่ได้ถูก commit เข้า git**และไม่หลุดไปที่ไหน

---

## 1. ฟีเจอร์ใหม่ที่ขอเพิ่ม: เลือกสินค้าหลายชิ้น → ส่งไป IG Chat

### User story
ลูกค้าเข้าเว็บ, เลือกสินค้า/เซ็ตที่สนใจได้หลายชิ้น (ประมาณ 3-4 ชิ้น), กด "ขั้นตอนถัดไป" แล้วระบบพาไปที่แชท IG พร้อมข้อมูลของรายการที่เลือกไว้ทั้งหมด แล้วกด "ส่ง" ได้เลยจากฝั่งลูกค้า

### สิ่งที่ต้องออกแบบ/ตัดสินใจก่อนเริ่มพัฒนา (ต้องคุยกับ PM/Owner ก่อน)
- [ ] **⚠️ ยังไม่ตัดสินใจ (รอ Owner)** — ข้อจำกัดทางเทคนิคสำคัญ: **Instagram ไม่มี API สาธารณะที่ให้เว็บภายนอก "ส่งข้อความอัตโนมัติ" แทนผู้ใช้ได้** ไม่ว่าจะผ่าน `ig.me` หรือช่องทางไหนก็ตาม — ผู้ใช้ต้องกด "ส่ง" เองเสมอในแอป/เว็บ IG (ป้องกัน spam/security ฝั่ง Meta) ดังนั้นสิ่งที่ทำได้จริงในทางเทคนิคคือ "เตรียมข้อความให้พร้อมที่สุด" ไม่ใช่ "ส่งให้อัตโนมัติ" แนวทางที่เป็นไปได้ (ยังไม่ฟันธง รอ Owner ตัดสินใจ):
  - (ก) Copy ข้อความสรุปรายการไปยัง clipboard อัตโนมัติ ก่อนเปิดหน้าแชท IG (`ig.me`) ให้ผู้ใช้กด "วาง" (paste) เองในช่องแชท แล้วกดส่ง — ใกล้เคียงกับที่ขอมากที่สุดเท่าที่ทำได้จริงบน IG
  - (ข) เปลี่ยนช่องทางหลักเป็น LINE OA แทน (LINE รองรับ URL ที่ฝังข้อความล่วงหน้าในช่องพิมพ์ได้ดีกว่า ผ่าน LINE OA chat link) แต่ต้องเพิ่มงาน LINE integration ใหม่ทั้งหมด และเว็บนี้ปัจจุบันใช้ IG เป็นหลัก
  - **สถานะ: เว้นไว้ก่อน รอ Owner ให้ทิศทางเพิ่มเติม** — ทีม dev ยังไม่เริ่มเขียนโค้ดในส่วนนี้จนกว่าจะตัดสินใจ
- [ ] จำกัดจำนวนสูงสุดกี่ชิ้นต่อ 1 รายการ (โจทย์บอก "3-4 ชิ้น" — ยืนยันว่าเป็น minimum แนะนำ หรือ hard limit)
- [ ] เก็บ selection ไว้ที่ไหน: localStorage (ไม่ล็อกอินก็ใช้ได้ ง่ายสุด) หรือผูกกับ session/DB
- [ ] รูปแบบข้อความที่จะส่งไปหา IG ต้องมีอะไรบ้าง (ชื่อสินค้า/เซ็ต, ราคา/วัน, วันที่ต้องการเช่า, ชื่อ-เบอร์ลูกค้า?)

### Task breakdown ตามทีม

## Frontend
- [ ] **FE-1**: สร้าง selection state (Context API หรือ Zustand — ปัจจุบันไม่มี state library ติดตั้งอยู่เลย ต้องเลือก) เก็บรายการสินค้า/เซ็ตที่ผู้ใช้เลือกไว้ ผูก localStorage เพื่อไม่หายเมื่อ refresh
- [ ] **FE-2**: เพิ่มปุ่ม "เลือกรายการนี้" (checkbox/toggle) บน `ProductCard` และ `BundleCard` (`app/components/product-card.tsx`, `bundle-card.tsx`) และในหน้า `/products/[id]`
- [ ] **FE-3**: ทำ UI แสดงจำนวนที่เลือกไว้ (เช่น floating bar/badge ที่มุมจอ) พร้อมปุ่ม "ขั้นตอนถัดไป" ที่กดแล้วไปหน้าสรุปรายการ
- [ ] **FE-4**: สร้างหน้า/modal สรุปรายการที่เลือก (รายชื่อ, ราคารวมโดยประมาณ, ปุ่มลบออกทีละชิ้น)
- [ ] **FE-5**: ⚠️ **รอตัดสินใจแนวทางก่อนเริ่ม** — ทำปุ่ม "ส่งไป IG" ที่ประกอบข้อความสรุปรายการ (ตามแนวทางที่ Owner เลือกในหัวข้อด้านบน) — ยังไม่เริ่มจนกว่าจะมีคำตอบ
- [ ] **FE-6**: แก้ไขฟอร์ม `/contact` (`app/contact/page.tsx`) ให้เชื่อมกับ backend endpoint จริง (รอ BE-1) แทนการเป็น mock form ปัจจุบัน — ลบ label "* นี่คือฟอร์มตัวอย่าง (mock)" ออกเมื่อเสร็จ
- [ ] **FE-7**: แก้ inconsistency เบอร์โทรใน footer (`app/components/site-footer.tsx` บรรทัด ~50) ให้ดึงจาก `SiteSettings` แทนการ hardcode

## Backend
- [ ] **BE-1**: เพิ่ม endpoint รับข้อมูล inquiry/booking จากฟอร์มติดต่อ และ (ถ้าเลือกแนวทางเก็บ selection ฝั่ง server) endpoint บันทึกรายการที่เลือกไว้ก่อนส่งไป IG — พิจารณาเพิ่ม `Inquiry`/`Booking` model ใหม่ใน Prisma schema
- [ ] **BE-2**: เพิ่ม authentication จริงให้ `/admin/*` ฝั่ง frontend และเพิ่ม auth guard ฝั่ง API — ตอนนี้ทุก endpoint (รวม `DELETE /products/:id` ฯลฯ) เปิดโล่งไม่มีการป้องกันเลย **(ความเสี่ยงด้านความปลอดภัยระดับสูง ควรรีบทำ)**
- [ ] **BE-3**: ถ้าตัดสินใจทำ LINE integration เพิ่ม service/module เชื่อม LINE (LIFF หรือ Messaging API)
- [ ] **BE-4**: เพิ่ม rate limiting (`@nestjs/throttler`) ให้ endpoint สาธารณะ โดยเฉพาะ endpoint รับฟอร์ม เพื่อกัน spam
- [ ] **BE-5**: ทำ Dashboard ให้ดึงข้อมูลจริงแทน mock data (`app/lib/mock-data.ts`) — ต้องรอ BE-1 มี Booking/Inquiry model ก่อน

## DevOps
- [x] **DO-1**: ตรวจสอบว่าไฟล์ `.env` (root และ `api/.env`) ไม่ได้ถูก commit เข้า git — เสร็จแล้ว (2026-08-15): เช็คทั้ง `git log --all --full-history` และ `git grep` ทั้ง history แล้ว ไม่เคยหลุดเลย ไม่ต้อง rotate credentials
- [x] **DO-2**: ยืนยัน `.gitignore` ครอบคลุม `api/dist/` และ `api/src/generated/prisma/` — เสร็จแล้ว (2026-08-15): ยืนยันด้วย `git status --ignored` ทั้งสอง dir ถูก ignore ถูกต้อง ไม่มีไฟล์ build/generated ถูก track
- [x] **DO-3**: ตั้ง CI pipeline (GitHub Actions) รัน lint + test + build อัตโนมัติเมื่อมี PR — เสร็จแล้ว (2026-08-15): `.github/workflows/frontend-ci.yml` (lint+build) และ `.github/workflows/backend-ci.yml` (lint + unit test + `prisma migrate deploy` + **e2e test** + build ใน `api/`, path-filtered เฉพาะ `api/**`) ยังไม่รวม auto-deploy
  - e2e test ใช้ Postgres service container ชั่วคราวใน GitHub Actions (ตามที่ PM confirm แนวทาง ก) เขียน `api/test/app.e2e-spec.ts` ใหม่ทั้งหมดให้ตรงกับ route จริง (`/health`, `/products`, `/categories`) เพราะ test เดิมเช็ค route `/` ที่ไม่มีอยู่จริงแล้ว
  - พบและแก้ 2 ปัญหา config ที่มีอยู่ก่อนแล้วในโปรเจกต์ (ไม่เคยมีใครรัน e2e test ผ่าน AppModule เต็มรูปแบบมาก่อนเลยไม่เคยเจอ): (1) `test/jest-e2e.json` ขาด `moduleNameMapper` สำหรับ resolve `.js` import extensions ที่ Prisma 7 generated client ใช้ — เพิ่มแล้ว (2) Prisma 7's WASM query compiler ใช้ dynamic `import()` ซึ่ง Jest CommonJS runner บล็อกไว้ — ต้องรันด้วย `NODE_OPTIONS=--experimental-vm-modules` (เพิ่มใน workflow แล้ว)
  - ทดสอบ full pipeline (lint → unit test → migrate → e2e → build) ในเครื่องด้วย Docker Postgres จำลอง CI แล้ว ผ่านหมด
- [x] **DO-4**: เอกสาร deployment ของ backend (`api/`) ให้ชัดเจน — ยืนยันแล้วโดย PM: deploy อยู่บน **Render** (ดู baseline ด้านบน)
- [ ] **DO-5**: ตั้งค่า `CORS_ORIGIN` ของ production ให้ตรงกับ frontend domain จริง (ปัจจุบัน default เป็น localhost) — รอตรวจสอบค่าจริงบน Render dashboard (ไม่มี Render CLI/credentials ในเครื่อง dev ให้เช็คอัตโนมัติได้)
- [x] **DO-6**: พิจารณาตั้ง monitoring/alerting เบื้องต้น (เช่น uptime check) เนื่องจากระบบยังไม่มีเลย — เสร็จบางส่วน (2026-08-15): เพิ่ม `GET /health` endpoint ใน backend (`api/src/health/`) คืน `{"status":"ok"}` ทดสอบรันจริงแล้วผ่าน ยังต้องทำที่เหลือ **นอกโค้ด** (ต้อง Owner/PM ตั้งเอง เพราะต้องใช้ account ภายนอก):
  1. ตั้ง UptimeRobot (หรือบริการ uptime check ฟรีอื่นๆ) ให้ ping `https://<render-backend-url>/health` ทุก 5 นาที พร้อม alert (email/LINE/Discord) เมื่อ down
  2. ใน Render dashboard → service settings → ตั้ง **Health Check Path** เป็น `/health` (ปัจจุบัน Render อาจ default เช็คที่ `/` ซึ่งไม่มี route แล้วจะ 404)
  3. (ทางเลือกเสริม) ตั้ง uptime check ฝั่ง frontend (Vercel) ด้วย เช่น ping หน้าแรก `/` เป็นระยะ

## QA
- [ ] **QA-1**: ตั้ง test framework ฝั่ง frontend (แนะนำ Vitest/Playwright) — ปัจจุบันไม่มี test เลยสักไฟล์
- [ ] **QA-2**: เขียน unit test ให้ backend services (`products.service.ts`, `bundles.service.ts`, `brands.service.ts`, `categories.service.ts`, `settings.service.ts`) — ปัจจุบันมีแค่ e2e test เดโม 1 ไฟล์ที่ยังไม่ตรงกับ route จริงด้วยซ้ำ
- [ ] **QA-3**: ทดสอบ flow ใหม่แบบ manual end-to-end: เลือกสินค้า 3-4 ชิ้น → กดขั้นตอนถัดไป → ตรวจสอบข้อมูลที่จะส่งไป IG ถูกต้องครบถ้วน → กดส่งได้จริงบนมือถือ (iOS/Android) และเดสก์ท็อป
- [ ] **QA-4**: ทดสอบ edge case: เลือกสินค้าที่ไม่ว่าง (`available=false`), เลือกเกิน limit, เลือก 0 ชิ้นแล้วกดขั้นตอนถัดไป, refresh หน้าเว็บระหว่างเลือก (localStorage ต้องไม่หาย)
- [ ] **QA-5**: ตรวจสอบ regression บนฟีเจอร์เดิมที่มีอยู่แล้ว: filter/search/sort หน้า `/products`, การอัปโหลดรูป Cloudinary, CRUD ฝั่ง admin ทั้งหมด
- [ ] **QA-6**: ทดสอบความปลอดภัย — ยืนยันว่าหลัง BE-2 เสร็จ endpoint แอดมินเข้าถึงไม่ได้โดยไม่ login และ route `/admin/*` มี middleware ป้องกันจริง

---

## 2. ลำดับความสำคัญที่แนะนำ

1. **ต้องทำก่อน (blocker ด้านความปลอดภัย)**: BE-2 (auth), DO-1 (เช็ค secret หลุด)
2. **ฟีเจอร์หลักตามที่ขอ**: FE-1 → FE-2 → FE-3 → FE-4 → FE-5 (ตามลำดับ dependency), คู่ขนานกับ BE-1 ถ้าต้องเก็บ state ฝั่ง server
3. **ปิดช่องว่างเดิมที่เป็น mock**: FE-6 + BE-1 (ฟอร์มติดต่อใช้งานได้จริง)
4. **คุณภาพ/ความยั่งยืน**: QA-1/QA-2 (วาง test foundation), DO-3 (CI)
5. **Nice to have / รอตัดสินใจ scope**: BE-3 (LINE), BE-5 (dashboard จริง)

---

## 3. คำถามที่ยังต้องได้คำตอบจาก Owner/PM ก่อนเริ่มเขียนโค้ด

1. **[ค้างอยู่]** ยืนยันแนวทางเตรียมข้อความไป IG — copy-to-clipboard + ให้ผู้ใช้วางเอง หรือเปลี่ยนไปใช้ LINE OA แทน (ดูรายละเอียดข้อจำกัดในหัวข้อ 1) — **ทีม dev รองานนี้อยู่ ยังไม่เริ่ม FE-5**
2. จำนวนสูงสุดของรายการที่เลือกได้คือเท่าไหร่แน่ (hard limit หรือแค่คำแนะนำ)
3. ฟอร์มติดต่อเดิม กับฟีเจอร์เลือกหลายชิ้นใหม่ ควรรวมเป็น flow เดียวกันหรือแยกกัน
4. Auth ของ admin ต้องการระดับไหน (username/password ธรรมดา พอ หรือต้องมี role/permission หลายระดับ)
5. มี deadline หรือ milestone ที่ต้องส่งมอบเมื่อไหร่
