# CODEBASE REVIEW: RECOMMENDED FIXES (1 PER CATEGORY)

เอกสารนี้สรุปงานแก้ไขที่แนะนำจากการตรวจสอบโค้ด โดยคัดมาอย่างละ 1 งานตามที่ร้องขอ

## 1) งานแก้ไขข้อความพิมพ์ผิด (Typo Fix)
**หัวข้อ:** แก้ชื่อพร็อพ `chatThreads.departments` เป็น `chatThreads.department`

- **ตำแหน่ง:** `prototype/ASIHomepageUIUX.jsx`
- **ปัญหา:** ในไฟล์มีการส่งพร็อพ `chat={mockData.chatThreads.departments}` ซึ่งสะกดชื่อ key ไม่ตรงกับโครงสร้างข้อมูลจริงที่ใช้ `department` (เอกพจน์)
- **ผลกระทบ:** เมื่อเข้าถึงเธรดแชตระดับแผนก อาจได้ค่า `undefined` และนำไปสู่ข้อผิดพลาด runtime ในส่วนที่อ่าน `thread.messages`
- **งานที่เสนอ:**
  - แก้ key ให้ตรงเป็น `department`
  - เพิ่มเช็กพื้นฐานในจุดเรียกใช้งานเพื่อกัน null/undefined

## 2) งานแก้ไขบั๊ก (Bug Fix)
**หัวข้อ:** แก้การ import `mockData` ที่ไม่มีการ export จริง

- **ตำแหน่ง:** `prototype/ASIHomepageUIUX.jsx`, `prototype/data/mockData.js`
- **ปัญหา:** `ASIHomepageUIUX.jsx` ใช้ `import { mockData } from './data/mockData';` แต่ `mockData.js` ไม่มี `export const mockData` ทำให้สัญญาการใช้งานข้อมูลไม่ตรงกัน
- **ผลกระทบ:** หน้า component gallery อาจล้มเหลวตั้งแต่ขั้น resolve module/bundle หรือทำงานผิดพลาดตอน runtime
- **งานที่เสนอ:**
  - เลือกแนวทางใดแนวทางหนึ่ง:
    1. สร้าง aggregate export `mockData` ใน `mockData.js` ให้ตรงกับที่ consumer ใช้
    2. หรือแก้ consumer ให้ import เป็น named exports รายตัว (`quickActions`, `departments`, `chatThreads`, ...)
  - เพิ่ม regression test เพื่อป้องกันการนำเข้าข้อมูลผิดสัญญาในอนาคต

## 3) งานแก้ไขความคลาดเคลื่อนของเอกสาร/คอมเมนต์ (Docs/Comment Discrepancy)
**หัวข้อ:** อัปเดต backlog เอกสารให้สอดคล้องกับสถานะโค้ดปัจจุบัน

- **ตำแหน่ง:** `docs/CODEBASE_QUALITY_FIX_BACKLOG_V1.md` เทียบกับ `prototype/state/useASIAppState.js`
- **ปัญหา:** backlog ระบุว่ายังต้องแก้บั๊ก routing ใน `useASIAppState` (fallback route + รองรับ environment ที่ไม่มี `window`) แต่โค้ดปัจจุบันมี fallback และ guard สำหรับ browser/non-browser แล้ว
- **ผลกระทบ:** ทีมอาจเสียเวลาไปกับงานที่แก้แล้ว หรือประเมินสถานะคุณภาพโค้ดผิด
- **งานที่เสนอ:**
  - ปรับรายการ backlog ข้อนี้เป็นสถานะ "Done" พร้อมอ้างอิง commit/ไฟล์
  - เพิ่มวันที่และผู้ยืนยันสถานะล่าสุดในเอกสาร

## 4) งานปรับปรุงการทดสอบ (Test Improvement)
**หัวข้อ:** เพิ่ม test ครอบคลุม data-contract ระหว่างหน้า UI และ mock dataset

- **ตำแหน่งที่เกี่ยวข้อง:** `prototype/__tests__/ASIHomepageUIUX.test.jsx`
- **ช่องว่างปัจจุบัน:** เทสปัจจุบันตรวจหัวข้อ UI เป็นหลัก แต่ยังไม่ล็อกพฤติกรรมในจุดเสี่ยง เช่น key ของ `chatThreads` และโครงสร้าง object ที่ component คาดหวัง
- **งานที่เสนอ:**
  - เพิ่ม test เคสที่ยืนยันว่า `Department Assistant` render ข้อความจาก `chatThreads.department.messages` ได้
  - เพิ่ม test ที่ fail ชัดเจนเมื่อ data contract แตก (เช่น key ผิดเป็น `departments`)
  - (ทางเลือก) เพิ่ม schema-level test สำหรับ shape ของ mock dataset ก่อนส่งเข้า component

---

## หลักฐานที่ใช้พิจารณา
- อ่านโค้ดในไฟล์:
  - `prototype/ASIHomepageUIUX.jsx`
  - `prototype/data/mockData.js`
  - `prototype/state/useASIAppState.js`
  - `prototype/__tests__/ASIHomepageUIUX.test.jsx`
  - `docs/CODEBASE_QUALITY_FIX_BACKLOG_V1.md`
