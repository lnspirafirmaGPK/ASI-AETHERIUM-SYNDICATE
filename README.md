# ASI Frontend Prototype Reference

เอกสารนี้เป็นจุดอ้างอิงสำหรับต้นแบบหน้าแดชบอร์ดองค์กรของ **ASI (Aetherium Syndicate Inspectra)** ที่ใช้ AI เป็นแกนกลางของประสบการณ์ใช้งาน (ใช้ชื่อแบรนด์มาตรฐานว่า **Inspectra** ทั่วทั้งระบบ)

## New React Prototype

### ASI Homepage UI/UX React Prototype

ไฟล์ต้นแบบหลัก:

- `prototype/ASIHomepageUIUX.jsx`

คอมโพเนนต์นี้เป็นต้นแบบแดชบอร์ดองค์กรแบบครบวงจรสำหรับระบบ **AI-native enterprise** โดยรวมความสามารถหลักไว้ในหน้าเดียวเพื่อใช้เป็น baseline สำหรับงานออกแบบและพัฒนาระยะต้น

## สิ่งที่คอมโพเนนต์นี้ครอบคลุม

- การนำทางแบบถาวรทางด้านซ้าย (left sidebar navigation)
- ส่วนหัวแบบติดอยู่กับที่ (sticky top header)
- hero section สำหรับเริ่ม workflow และถาม AI
- quick actions สำหรับงานหลักขององค์กร
- department cards สำหรับ AI departments
- decision center สำหรับรายการตัดสินใจที่รออนุมัติหรือเพิ่งเสร็จสิ้น
- lineage & audit section
- settings overview

## ตำแหน่ง AI Chat หลายระดับ

- global floating chat
- hero inline chat
- section assistant
- decision explainer chat
- settings assistant concept

## จุดประสงค์ของต้นแบบนี้

ต้นแบบนี้เหมาะสำหรับ:

- ใช้เป็น baseline ของ UX หน้าแรก
- ใช้สาธิตแนวทาง AI-first operating dashboard
- ใช้แตกงาน frontend implementation
- ใช้ต่อยอดเป็น Figma specification
- ใช้เป็น reference สำหรับ design system และ component inventory

## สถาปัตยกรรม UI โดยสรุป

### 1) App Shell

ประกอบด้วย:

- left sidebar
- sticky top header
- main content area
- floating chat action

### 2) Homepage Regions

- Executive summary / hero
- Inline command + AI assistant
- Quick actions
- Department snapshot grid
- Decision center
- Lineage & audit panel
- Settings overview
- Chat placement map

### 3) AI Chat Placement Strategy

คอมโพเนนต์นี้ออกแบบให้ AI ไม่ได้อยู่เฉพาะในหน้าต่างแชทหลัก แต่ถูกฝังในหลายบริบทของระบบ ได้แก่:

- Global AI Chat
- Page-level assistant
- Section assistant
- Decision-specific assistant
- Settings assistant

## การใช้งาน

```jsx
import ASIHomepageUIUX from "./prototype/ASIHomepageUIUX";

export default function App() {
  return <ASIHomepageUIUX />;
}
```

## เทคโนโลยีที่ใช้ในต้นแบบ

- React
- Tailwind utility classes
- static mock data ที่แยกเป็น fixtures ภายใต้ `prototype/data/`

## หมายเหตุสำคัญ

คอมโพเนนต์นี้เป็น prototype UI ไม่ได้เชื่อมต่อ API จริง และใช้ข้อมูลจำลองจากไฟล์ fixtures ใน `prototype/data/` เพื่อให้ทีมสามารถ review โครงสร้างหน้า การวางองค์ประกอบ และ interaction model ก่อนลงระบบ production

## สิ่งที่ควรต่อยอดจากต้นแบบนี้

### Design / UX

- แปลงเป็น high-fidelity screens
- แตกเป็น page-specific variants
- สร้าง interactive flows ใน Figma

### Frontend Engineering

- แยก app shell ออกจาก page sections
- สร้าง reusable component library
- แยก static data เป็น typed mock fixtures
- bind กับ API/query layer จริง
- เพิ่ม state management สำหรับ chat, decisions, governance, settings

### Product / Architecture

- เชื่อมกับ route map
- เชื่อมกับ component map
- เชื่อมกับ event-driven UI states
- เชื่อมกับ decision artifact views


## Architecture Execution Priorities

สำหรับการขับเคลื่อนงาน architecture และ cross-team alignment ล่าสุด ดูเอกสาร:

- `docs/ASI_EXECUTION_PRIORITIES_V1.md`

## Component Summary

### Recommended top-level prototype component

- `ASIHomepageUIUX`

### Recommended future extraction

- `AppShell`
- `SidebarNav`
- `TopHeader`
- `HeroAssistant`
- `QuickActionGrid`
- `DepartmentCardGrid`
- `DecisionCenter`
- `DecisionExplainerPanel`
- `LineageAuditPanel`
- `SettingsOverviewPanel`
- `GlobalChatLauncher`

## Review Effort

- ระดับ: ปานกลาง
- เวลาตรวจโดยประมาณ: 15 นาที

## Poem

แดชบอร์ดเคลื่อนไหวใต้แสงแห่ง AI
บทสนทนาไหลผ่านทุกบริบทอย่างมีความหมาย
แผนก การตัดสินใจ และสายใยแห่งที่มา
รวมตัวเป็นระบบเดียวขององค์กรอนาคต
