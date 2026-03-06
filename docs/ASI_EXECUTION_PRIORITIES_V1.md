# ASI Execution Priorities (V1)

เอกสารนี้สรุป **3 ลำดับความสำคัญเชิงสถาปัตยกรรมและการส่งมอบ** เพื่อให้ทีม Engineering และ Product ทำงานบนสมมติฐานเดียวกันในช่วงเริ่มต้นของ ASI

## 1) Vertical Slice Completion: Governed Budget Reallocation

**ข้อกำหนดหลัก:** ให้โฟกัสการส่งมอบ Use Case แรกคือ `Governed Budget Reallocation` ให้ครบทั้งลูปก่อนขยายไป use case อื่น

### เป้าหมายการพิสูจน์ (Definition of Done)
- พิสูจน์ **Lineage loop** ครบตั้งแต่ ingest → decision proposal → approval → execution → audit retrieval
- พิสูจน์ **Human Oversight loop** ครบทั้งการอนุมัติ, การปฏิเสธ, การ escalate และการ rollback
- ทุก material decision ต้อง trace กลับได้ถึง source, policy context และผู้อนุมัติ
- มี KPI ของ vertical slice ที่วัดได้จริง (เช่น approval latency, lineage retrieval success, rollback recovery time)

### ขอบเขตสำหรับรอบแรก
- รองรับเฉพาะ budget transfer ภายในขอบเขต governance ที่กำหนด
- ตัด non-critical features ออกจนกว่าจะผ่าน acceptance ของ loop หลัก
- บังคับใช้ contract-first (API/event schemas) เพื่อลด integration drift ระหว่างทีม

---

## 2) Glossary Definition: ใช้มาตรฐานคำศัพท์เดียวกันทั้ง Architecture และ UI

**ข้อกำหนดหลัก:** ต้องมี glossary กลางที่ใช้ร่วมกันทั้งเอกสารสถาปัตยกรรม, API contracts, UX copy และ UI labels

### Canonical Terms (Version 1)
| Canonical Term | คำอธิบายมาตรฐาน | ห้ามใช้สลับกับคำว่า |
|---|---|---|
| Governed Budget Reallocation | กระบวนการย้ายงบที่ต้องผ่าน policy + human approval + lineage | Budget Shift, Smart Rebudget |
| Decision Artifact | วัตถุที่แทนผลการตัดสินใจพร้อม metadata และหลักฐาน | Decision Record, Approval File |
| Lineage Proof | หลักฐานที่ยืนยันที่มา, ลำดับเหตุการณ์ และความถูกต้องของ decision chain | Audit Log (แบบทั่วไป) |
| Human Oversight | ขั้นตอนที่มนุษย์สามารถ approve/reject/escalate/override ตาม policy | Manual Review (อย่างเดียว) |
| Trust Plane | โดเมนที่รับผิดชอบ identity, signature, integrity verification และ tamper evidence | Security Layer (กว้างเกินไป) |
| GenesisCore | ระบบแกนของ Trust Plane สำหรับผูก identity + lineage + verification | Ledger Service (กำกวม) |

### แนวทางการใช้งาน
- Product และ Engineering ใช้คำ canonical เดียวกันใน ticket template, PRD, ADR และ UI copy
- ห้ามเปลี่ยน label ใน UI โดยไม่อัปเดต glossary และ release notes
- กำหนด owner ของ glossary ชัดเจน (Architecture + Product Design ร่วมกัน)

---

## 3) Hardening GenesisCore: Security ของ Trust Plane เป็นงานลำดับสูงสุด

**ข้อกำหนดหลัก:** งาน security ที่เกี่ยวกับ `GenesisCore` และ `Trust Plane` เป็น **P0** ของ roadmap เพราะเป็นรากความน่าเชื่อถือทั้งระบบ

### Security Priorities (P0)
- Strong service identity + mTLS ระหว่างบริการที่แตะ trust data
- Digital signature verification สำหรับ material events ทุกตัว
- Append-only lineage store + tamper-evident chain validation
- Key management และ rotation policy (พร้อม break-glass procedure)
- Least privilege + policy enforcement at runtime
- Immutable audit trail สำหรับ actions ของมนุษย์และระบบ

### Security Gates ก่อน production
- ผ่าน threat modeling สำหรับ Trust Plane และ approval APIs
- ผ่าน penetration test สำหรับ lineage verification endpoints
- ผ่าน key compromise simulation และ lineage recovery drill
- มี SLO/SLI ของ trust services และ incident runbook ที่ซ้อมจริง

### ข้อห้ามสำคัญ
- ห้าม onboard use case ใหม่ ถ้า trust controls ขั้นต่ำยังไม่ผ่าน gate
- ห้าม bypass signature/lineage verification ใน production path

---

## Suggested 90-Day Sequencing
1. **Day 0-30:** ปิดขอบเขต vertical slice + freeze glossary + baseline security controls
2. **Day 31-60:** ปิด loop lineage + human oversight แบบ end-to-end บน use case แรก
3. **Day 61-90:** hardening, security drills, reliability tuning และ production readiness review

> สรุป: ให้ทีมส่งมอบคุณค่าธุรกิจผ่าน use case เดียวที่พิสูจน์ trust ได้จริง พร้อมภาษากลางที่ตรงกัน และยกระดับ security ของ GenesisCore เป็นเงื่อนไขก่อนขยายระบบ
