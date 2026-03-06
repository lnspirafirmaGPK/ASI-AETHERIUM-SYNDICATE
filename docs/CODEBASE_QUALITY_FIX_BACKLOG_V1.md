# Codebase Quality Fix Backlog (v1)

เอกสารนี้สรุปงานแก้ไขที่แนะนำจากการตรวจสอบโค้ดเบื้องต้น โดยจัดให้ครบ 4 หมวดตามคำขอ: typo, bug, comment/document discrepancy และ test improvement

## 1) งานแก้ข้อความพิมพ์ผิด (Typo Fix)
- **ปัญหา:** พบคำว่า `Inspectra` ในชื่อผลิตภัณฑ์บน sidebar ซึ่งมีแนวโน้มเป็นการสะกดผิดจากคำที่พบได้ทั่วไปว่า `Inspector`
- **หลักฐาน:** `prototype/ASIHomepageUIUX.jsx` แสดงหัวข้อ `Aetherium Syndicate Inspectra`
- **งานที่เสนอ:**
  1. ยืนยันชื่อแบรนด์ที่ถูกต้องกับทีม Product/Brand
  2. หากเป็น typo ให้แก้ข้อความ UI ทุกจุดเป็นชื่อเดียวกัน
  3. ตรวจความสอดคล้องชื่อใน README และเอกสารสถาปัตยกรรมทั้งหมด
- **ผลลัพธ์ที่คาดหวัง:** ชื่อผลิตภัณฑ์สะกดสอดคล้องกันทั้งระบบ ลดความสับสนในการสื่อสาร

## 2) งานแก้บั๊ก (Bug Fix)
- **ปัญหา:** ข้อมูล mock ในหน้าเดียวกันไม่สอดคล้องกัน: `decisionFeed` อ้างถึง `Risk AI` แต่ใน `deptCards` ไม่มีแผนก `Risk AI`
- **หลักฐาน:**
  - `deptCards` มี Finance/Legal/Strategy/Operations
  - `decisionFeed` มีรายการ `Vendor Risk Flag` ที่ owner เป็น `Risk AI`
- **งานที่เสนอ:**
  1. เพิ่ม `Risk AI` ใน `deptCards` หรือปรับ owner ใน `decisionFeed` ให้ตรงกับแผนกที่มีอยู่
  2. เพิ่ม validation ของ mock dataset ก่อน render (เช่น ตรวจว่า owner ทุกตัวมีอยู่ในรายการ department)
  3. แสดง fallback badge `Unknown Department` หากข้อมูลไม่ครบ เพื่อป้องกัน UI พัง/สับสน
- **ผลลัพธ์ที่คาดหวัง:** หน้า Dashboard แสดงข้อมูลสอดคล้องกันทุกส่วนและลด data integrity issue

## 3) งานแก้ความคลาดเคลื่อนของคอมเมนต์/เอกสาร (Comment/Documentation Discrepancy)
- **ปัญหา:** README ระบุว่าแพลตฟอร์มมี `AI Director for every department` แต่ใน prototype ปุ่มของแต่ละแผนกแสดงเป็น `Chat AI` แบบ generic
- **หลักฐาน:**
  - README: ระบุ `AI Director for every department`
  - Prototype: ปุ่มในแต่ละ department card ใช้ label `Chat AI`
- **งานที่เสนอ:**
  1. กำหนดศัพท์มาตรฐาน (เช่น `AI Director` vs `Chat AI`) ให้ชัดเจน
  2. อัปเดต README หรือ UI label ให้ตรงกัน
  3. เพิ่ม glossary ย่อในเอกสารเพื่อเลี่ยงการใช้คำสลับกัน
- **ผลลัพธ์ที่คาดหวัง:** เอกสารและ UI ใช้คำเรียกบทบาท AI ตรงกัน ลด misunderstanding ระหว่างทีม

## 4) งานปรับปรุงการทดสอบ (Test Improvement)
- **ปัญหา:** repository ปัจจุบันยังไม่มี test coverage สำหรับ prototype component
- **งานที่เสนอ:**
  1. เพิ่ม unit test ของ `ASIHomepageUIUX` เพื่อตรวจว่า section สำคัญ render ครบ (Navigation, Department Layer, Decision Center, Chat Placement Map)
  2. เพิ่ม data consistency test สำหรับความสัมพันธ์ `decisionFeed.owner` ↔ `deptCards.name`
  3. เพิ่ม snapshot test สำหรับโครงสร้างหลักของหน้า เพื่อช่วย detect regression จากการแก้ข้อความ/โครงสร้าง
- **ผลลัพธ์ที่คาดหวัง:** ลดโอกาส regression ด้าน UI และความไม่สอดคล้องของข้อมูล mock
