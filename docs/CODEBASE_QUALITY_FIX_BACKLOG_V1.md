# Codebase Quality Fix Backlog (v1)

เอกสารนี้สรุปสถานะล่าสุดของงานตรวจสอบคุณภาพโค้ด โดยจัดตาม 4 หมวด: typo, bug, comment/document discrepancy และ test improvement

## 1) งานแก้ข้อความพิมพ์ผิด (Typo Fix)
- **สถานะ:** ปิดงานแล้ว
- **ผลการตรวจ:** ชื่อแบรนด์ `Inspectra` เป็นคำที่ถูกต้องตามไฟล์ `prototype/constants/brand.js` (`canonical: Inspectra`) และ `Inspector` เป็นชื่อที่เลิกใช้ (`deprecated`) จึงไม่ใช่ typo
- **ผลลัพธ์:** คงคำ `Inspectra` ใน UI/เอกสาร เพื่อให้สอดคล้องกับ naming guideline

## 2) งานแก้บั๊ก (Bug Fix)
- **สถานะ:** ปิดงานแล้ว (data integrity) + ปิดงานเพิ่ม (routing robustness)
- **ผลการตรวจ:**
  1. ได้เพิ่ม validation ของข้อมูล mock สำหรับ `decision.owner_department` ให้สัมพันธ์กับรายการ department
  2. ได้แสดง fallback `Unknown Department` เมื่อพบ owner ที่ไม่รู้จัก
  3. แก้บั๊ก routing ใน `useASIAppState` ให้ fallback เป็น `overview` เมื่อ hash route ไม่ถูกต้อง และรองรับ environment ที่ไม่มี `window`
- **ผลลัพธ์:** ลดความเสี่ยงข้อมูล mock ไม่สอดคล้อง และลดโอกาส runtime error เมื่อรันใน context ที่ไม่ใช่ browser

## 3) งานแก้ความคลาดเคลื่อนของคอมเมนต์/เอกสาร (Comment/Documentation Discrepancy)
- **สถานะ:** ปิดงานแล้ว
- **ผลการตรวจ:** README เดิมระบุว่าข้อมูล mock อยู่ “ภายในคอมโพเนนต์” ซึ่งไม่ตรงกับโค้ดปัจจุบันที่แยกเป็น fixtures ภายใต้โฟลเดอร์ `prototype/data/`
- **ผลลัพธ์:** ปรับข้อความ README ให้สะท้อนโครงสร้างจริงของโค้ดและแนวทาง fixture-first

## 4) งานปรับปรุงการทดสอบ (Test Improvement)
- **สถานะ:** ปิดงานแล้ว
- **ผลการตรวจ:** repository มีทั้ง unit test, snapshot test และ data validation test แล้ว
- **ผลลัพธ์เพิ่มเติมรอบนี้:** เพิ่ม test ครอบคลุมพฤติกรรม route ของ `useASIAppState` ในกรณีสำคัญ ได้แก่ การรีเซ็ต hash ว่างเป็นค่า default, การ fallback route ที่ไม่รู้จัก, การอัปเดต route ที่รู้จัก และการปฏิเสธ route ที่ไม่ถูกต้อง
