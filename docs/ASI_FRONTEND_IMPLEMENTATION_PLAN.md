# ASI Frontend Implementation Plan
## สำหรับ prototype/ASIHomepageUIUX.jsx

เอกสารนี้แปลง prototype หน้าแรกของ ASI ให้เป็นแผนการพัฒนา frontend แบบละเอียดสำหรับทีม dev โดยแยกให้ชัดใน 6 มิติ

- Route structure
- Component extraction plan
- Props contract
- State model
- API binding plan
- Mock data structure

รวมถึง implementation sequence, folder structure, testing scope, และ migration path จาก prototype สู่ production UI

## 1. Objective

เป้าหมายของแผนนี้คือการนำ `prototype/ASIHomepageUIUX.jsx` ซึ่งเป็นคอมโพเนนต์แบบ monolithic prototype ไปสู่ frontend architecture ที่:

- maintainable
- route-aware
- reusable
- testable
- API-bindable
- รองรับ state จริงใน production

## 2. Current Prototype Assessment

### 2.1 สิ่งที่ prototype ทำได้ดีแล้ว

- สื่อสารโครงสร้าง UX หน้าแรกได้ชัด
- วาง AI chat หลายระดับครบ
- มีข้อมูลตัวอย่างสำหรับ departments / decisions / settings / chat placements
- มี app-shell concept ชัด

### 2.2 ข้อจำกัดปัจจุบัน

- ทุกอย่างอยู่ในไฟล์เดียว
- ข้อมูลทั้งหมด hardcoded ภายใน component
- ยังไม่มี route separation
- ยังไม่มี typed props contract
- ยังไม่มี async state / loading / error paths
- ยังไม่มี API binding layer
- ยังไม่มี separation ระหว่าง layout กับ features

## 3. Frontend Target Architecture

### 3.1 Target Layers

- **App Shell Layer**
  - Navigation
  - Header
  - Utility/Chat Launcher
- **Feature Page Layer**
  - Homepage
  - Departments
  - Decisions
  - Governance
  - Lineage
  - Settings
- **Feature Section Layer**
  - Hero Assistant
  - Quick Actions
  - Department Grid
  - Decision Center
  - Lineage Summary
  - Settings Overview
- **Data Layer**
  - API clients
  - query hooks
  - event/subscription hooks
  - mock fixtures
- **State Layer**
  - UI state
  - page state
  - entity selection state
  - chat state

## 4. Route Plan

แม้ `ASIHomepageUIUX.jsx` จะเป็นหน้าแรก แต่ต้องวาง route structure ตั้งแต่ต้นเพื่อรองรับการแตกหน้า

### 4.1 Route Inventory

| Route | Purpose | Source from prototype |
| :--- | :--- | :--- |
| `/` | Homepage / service front door | ใช่ |
| `/departments` | Department index | แตกจาก AI Departments section |
| `/departments/:departmentId` | Department dashboard | แตกจาก department card action |
| `/decisions` | Decision board | แตกจาก decision center |
| `/decisions/:decisionId` | Decision detail | แตกจาก decision panel chat |
| `/governance` | Governance center | เชื่อมจาก quick action / settings |
| `/lineage` | Lineage and audit index | แตกจาก lineage & audit section |
| `/lineage/:eventId` | Lineage event detail / proof | ใช้จาก view lineage |
| `/settings` | Settings hub | แตกจาก settings overview |
| `/assistant` | Full universal assistant | แตกจาก global chat |

### 4.2 MVP Route Priority

- **Phase 1**
  - `/`
  - `/decisions`
  - `/decisions/:decisionId`
  - `/settings`
- **Phase 2**
  - `/departments`
  - `/departments/:departmentId`
  - `/lineage`
- **Phase 3**
  - `/governance`
  - `/assistant`
  - `/lineage/:eventId`

## 5. Component Extraction Plan

### 5.1 Extraction Strategy

แตก component ตาม 3 ระดับ:

- **Level A — Shell Components**: องค์ประกอบที่ใช้ซ้ำได้ทุกหน้า
- **Level B — Homepage Sections**: องค์ประกอบเฉพาะหน้าแรก
- **Level C — Feature Cards / Embedded Chat Components**: องค์ประกอบย่อยที่ reuse ได้ข้ามหลายหน้า

### 5.2 Level A — Shell Components

- **AppShell**:
  - **Responsibility**: จัด layout หลักของแอป, render sidebar, header, utility region, page content
- **SidebarNav**:
  - **Responsibility**: แสดง navigation หลัก, แสดง active route, รองรับ collapse mode
- **TopHeader**:
  - **Responsibility**: page title, command palette trigger, new workflow CTA, user/menu actions ในอนาคต
- **GlobalChatLauncher**:
  - **Responsibility**: floating chat button, open/close global assistant
- **GlobalChatPanel**:
  - **Responsibility**: universal assistant UI, transcript + prompt chips + composer

### 5.3 Level B — Homepage Sections

- **HomepageHero**: ประกอบด้วย badge, headline, intro text, inline AI command input
- **QuickActionGrid**: ประกอบด้วย quick action cards
- **DepartmentGrid**: grid ของ department cards
- **DepartmentAssistantPanel**: section assistant สำหรับมุมมอง department layer
- **DecisionCenter**: รายการ decisions ล่าสุด / pending
- **DecisionExplainerPanel**: AI assistant สำหรับ decision context
- **LineageAuditSummary**: summary panel สำหรับ proof, replay, audit
- **SettingsOverviewPanel**: settings summary cards
- **ChatPlacementMap**: แสดงตำแหน่ง AI chat ภายในระบบ

### 5.4 Level C — Reusable Feature Components

- `QuickActionCard`
- `DepartmentCard`
- `DecisionCard`
- `SettingsGroupCard`
- `ChatPromptChip`
- `ChatTranscript`
- `InlineAssistantInput`
- `StatusBadge`
- `SectionPanel`
- `PanelHeader`

## 6. Suggested Component Tree

```
ASIHomepagePage
└─ AppShell
   ├─ SidebarNav
   ├─ TopHeader
   ├─ HomepageContent
   │  ├─ HomepageHero
   │  │  └─ InlineAssistantInput
   │  ├─ QuickActionGrid
   │  │  └─ QuickActionCard[]
   │  ├─ GlobalChatPreviewPanel
   │  │  ├─ ChatTranscript
   │  │  └─ ChatPromptChip[]
   │  ├─ DepartmentGrid
   │  │  └─ DepartmentCard[]
   │  ├─ DepartmentAssistantPanel
   │  ├─ DecisionCenter
   │  │  └─ DecisionCard[]
   │  ├─ DecisionExplainerPanel
   │  ├─ LineageAuditSummary
   │  ├─ SettingsOverviewPanel
   │  │  └─ SettingsGroupCard[]
   │  └─ ChatPlacementMap
   └─ GlobalChatLauncher
```

## 7. Props Contract Plan

ด้านล่างคือ props ที่ควรกำหนดตั้งแต่ต้น

### 7.1 AppShell
```typescript
interface AppShellProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  floatingChat?: React.ReactNode;
}
```

### 7.2 SidebarNav
```typescript
interface NavItem {
  key: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarNavProps {
  appName: string;
  subtitle?: string;
  items: NavItem[];
  activeKey: string;
  onNavigate?: (key: string) => void;
  footerSlot?: React.ReactNode;
}
```

### 7.3 TopHeader
```typescript
interface TopHeaderProps {
  eyebrow?: string;
  title: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}
```

### 7.4 HomepageHero
```typescript
interface HomepageHeroProps {
  badge: string;
  title: string;
  description: string;
  commandPlaceholder: string;
  onSubmitCommand?: (value: string) => void;
}
```

### 7.5 QuickActionCard
```typescript
interface QuickActionCardProps {
  title: string;
  description: string;
  ctaLabel?: string;
  onClick?: () => void;
}
```

### 7.6 DepartmentCard
```typescript
interface DepartmentCardProps {
  name: string;
  status: string;
  tasks: number;
  pendingApprovals?: number;
  onOpenDashboard?: () => void;
  onOpenChat?: () => void;
  onOpenPolicies?: () => void;
}
```

### 7.7 DecisionCard
```typescript
interface DecisionCardProps {
  id: string;
  title: string;
  owner: string;
  state: string;
  risk: string;
  confidence?: number;
  onOpen?: () => void;
  onExplain?: () => void;
  onViewLineage?: () => void;
}
```

### 7.8 SettingsGroupCard
```typescript
interface SettingsGroupCardProps {
  title: string;
  items: string[];
  onConfigure?: () => void;
}
```

### 7.9 GlobalChatPanel
```typescript
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface PromptChip {
  id: string;
  label: string;
  value: string;
}

interface GlobalChatPanelProps {
  title: string;
  status?: string;
  messages: ChatMessage[];
  promptChips?: PromptChip[];
  inputPlaceholder?: string;
  onSubmit?: (value: string) => void;
  onChipClick?: (value: string) => void;
}
```

### 7.10 SectionAssistantPanel
```typescript
interface SectionAssistantPanelProps {
  title: string;
  description?: string;
  messages: ChatMessage[];
  inputPlaceholder?: string;
  onSubmit?: (value: string) => void;
}
```

## 8. State Model Plan

แนะนำให้แยก state ออกเป็น 4 ระดับ:

1.  **Local UI State**: ใช้สำหรับ interaction ระยะสั้น (e.g., chat panel open/close, input value)
2.  **Page State**: ใช้สำหรับ state ของหน้าโดยรวม (e.g., homepage filters, selected decision preview)
3.  **Server State**: ใช้สำหรับข้อมูลจาก API (e.g., departments summary, decision list)
4.  **Session / Assistant State**: ใช้สำหรับ chat and assistant context (e.g., global assistant thread)

### 8.5 Recommended State Ownership

| State | Owner |
| :--- | :--- |
| nav active item | router |
| global chat open | app shell store |
| global chat transcript | assistant feature store / server state hybrid |
| selected decision preview | homepage page state |
| departments summary | query layer |
| decisions feed | query layer |
| settings summary | query layer |
| hero command input | local state |
| section assistant input | local state |

## 9. State Management Recommendation

- **MVP Recommendation**:
  - ใช้ **React Query/TanStack Query** สำหรับ server state
  - ใช้ **local component state** สำหรับ short-lived UI state
  - ใช้ lightweight global store เช่น **Zustand** สำหรับ:
    - global chat open/close
    - command palette visibility
    - selected workspace/session UI state

### Suggested Global Store Shape

```typescript
interface UiStore {
  isGlobalChatOpen: boolean;
  isCommandPaletteOpen: boolean;
  selectedDecisionId?: string;
  toggleGlobalChat: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  setSelectedDecisionId: (id?: string) => void;
}
```

## 10. API Binding Plan

แม้ prototype จะใช้ข้อมูลคงที่ แต่ production homepage ควร bind กับ API ตาม domain สำคัญ

### 10.1 Homepage API Requirements

| Section | API Needed |
| :--- | :--- |
| Hero summary | org summary / homepage metrics |
| Quick actions | static config + capability flags |
| Departments grid | departments summary API |
| Decision center | decisions list API |
| Decision explainer | decision detail + assistant endpoint |
| Lineage & audit summary| audit highlights / lineage summary API |
| Settings overview | settings summary API |
| Global chat | assistant chat endpoint |

### 10.2 Suggested Query Hooks

- `useHomepageSummary()`
- `useDepartmentsSummary()`
- `useDecisionFeed()`
- `useSettingsOverview()`
- `useLineageHighlights()`
- `useAssistantThread(scope)`

### 10.3 Suggested Endpoint Map

- **Homepage Summary**: `GET /api/overview/v1/homepage-summary`
- **Departments Summary**: `GET /api/departments/v1/summary`
- **Decisions Feed**: `GET /api/decisions/v1/feed?status=pending,recent`
- **Decision Detail Preview**: `GET /api/decisions/v1/{decisionId}`
- **Lineage Highlights**: `GET /api/lineage/v1/highlights`
- **Settings Overview**: `GET /api/settings/v1/overview`
- **Assistant Chat**: `POST /api/assistant/v1/chat` with scope (`global`, `department`, `decision`, `settings`)

### 10.4 API Binding by Component

| Component | Query / Mutation |
| :--- | :--- |
| HomepageHero | none initially / assistant mutation on submit |
| QuickActionGrid | static config |
| DepartmentGrid | `useDepartmentsSummary()` |
| DepartmentAssistantPanel | `useAssistantThread("department")` |
| DecisionCenter | `useDecisionFeed()` |
| DecisionExplainerPanel | `useDecisionFeed()` + `useAssistantThread("decision")` |
| LineageAuditSummary | `useLineageHighlights()` |
| SettingsOverviewPanel | `useSettingsOverview()` |
| GlobalChatPanel | `useAssistantThread("global")` |

## 11. Mock Data Structure Plan

เพื่อให้ทีม frontend เริ่มทำงานขนานกับ backend ได้ ควรแยก mock fixtures ออกจาก component ทันที

### 11.1 Suggested Mock Folder

```
src/mocks/
  homepage/
    navItems.ts
    quickActions.ts
    departments.ts
    decisions.ts
    settings.ts
    chat.ts
```

### 11.2 Mock Types

- **Navigation**: `NavItem { key, label, href }`
- **Quick Action**: `QuickAction { id, title, description, actionType }`
- **Department Summary**: `DepartmentSummary { id, name, status, tasks, pendingApprovals, alerts }`
- **Decision Feed Item**: `DecisionFeedItem { id, title, owner, state, risk, confidence, lineageAvailable }`
- **Settings Group**: `SettingsGroup { id, title, items }`
- **Chat Message**: `ChatMessage { id, role, content, timestamp }`
- **Chat Placement Item**: `ChatPlacementItem { id, area, detail }`

## 12. Folder Structure Recommendation

### 12.1 MVP Frontend Structure

```
src/
  app/
    router.tsx
    providers.tsx
  pages/
    homepage/
      ASIHomepagePage.tsx
      components/
        HomepageHero.tsx
        QuickActionGrid.tsx
        DepartmentGrid.tsx
        DepartmentAssistantPanel.tsx
        DecisionCenter.tsx
        DecisionExplainerPanel.tsx
        LineageAuditSummary.tsx
        SettingsOverviewPanel.tsx
        ChatPlacementMap.tsx
  components/
    shell/
      AppShell.tsx
      SidebarNav.tsx
      TopHeader.tsx
      GlobalChatLauncher.tsx
      GlobalChatPanel.tsx
    common/
      SectionPanel.tsx
      PanelHeader.tsx
      StatusBadge.tsx
      ChatTranscript.tsx
      ChatPromptChip.tsx
  features/
    assistant/
      hooks/
      api/
      store/
    decisions/
      api/
      hooks/
      types/
    departments/
    ...
  mocks/
  store/
    uiStore.ts
  lib/
    apiClient.ts
    queryClient.ts
  types/
```

## 13. Migration Path from Prototype to Production

1.  **Step 1 — Freeze visual intent**: ย้าย JSX เดิมไปเป็น `ASIHomepagePage`, แยก hardcoded arrays ไป `mocks/`
2.  **Step 2 — Extract shell**: แยก `AppShell`, `SidebarNav`, `TopHeader`, `GlobalChatLauncher`
3.  **Step 3 — Extract homepage sections**: แยก sections ตาม functional boundaries
4.  **Step 4 — Introduce types**: เพิ่ม TypeScript interfaces ให้ทุก data shape
5.  **Step 5 — Introduce query layer**: สลับจาก mock data เป็น hooks ที่ fallback ไป mock ได้
6.  **Step 6 — Introduce assistant state**: แยก global/section/entity chat state
7.  **Step 7 — Add loading/error/empty states**: ใส่ skeleton, empty, inline error ต่อ section
8.  **Step 8 — Bind real APIs**: ค่อยๆ bind ทีละ section ตาม backend readiness

## 14. Implementation Sequence

- **Wave 1 — Structural Refactor**: extract shell, homepage sections, move mock data, add route
- **Wave 2 — Type Safety & State**: add TS contracts, query hooks, global UI store
- **Wave 3 — Feature Binding**: bind departments, decisions, settings, lineage
- **Wave 4 — Assistant Integration**: global, department, decision assistants
- **Wave 5 — Production Hardening**: loading/error states, a11y, responsive refinement, tests

## 15. Loading / Empty / Error State Plan

ทุก section ต้องรองรับอย่างน้อย 4 states:

- **DepartmentGrid**: loading (skeleton), empty, error, success
- **DecisionCenter**: loading (skeleton), empty, error, success
- **SettingsOverviewPanel**: loading (skeleton), empty, error, success
- **Chat Panels**: loading (typing), empty (welcome), error (retry)

## 16. Testing Plan

- **Unit Tests**: component rendering, props mapping, states
- **Integration Tests**: homepage renders sections, navigation works, chat toggles
- **Contract Tests**: mock data matches types, API adapters return correct shape
- **Visual Regression**: desktop, tablet, mobile layouts

## 17. Frontend Performance Plan

- Lazy load full global assistant panel
- Virtualize long decision lists
- Memoize static card sections
- Split queries by section
- Keep homepage fast

## 18. Accessibility Plan

- Keyboard focusable sidebar
- Visible focus ring
- Semantic headings
- Labeled inputs
- Accessible floating chat

## 19. Example Page Container Implementation Split

`ASIHomepagePage.tsx` ควรรับผิดชอบแค่:

- assemble hooks
- pass data to sections
- manage selected decision preview state
- wire interactions to router/store

ไม่ควร:

- contain raw mock arrays
- define low-level card markup
- implement shell layout

## 20. Final Recommended Deliverables for Frontend Team

- **Immediate**: `ASIHomepagePage`, `AppShell`, `SidebarNav`, `TopHeader`, homepage section components, typed mocks, query stubs, UI store
- **Next**: `/decisions` route, `/settings` route, global assistant panel, data binding

## 21. Summary

`prototype/ASIHomepageUIUX.jsx` ควรถูกมองเป็น **visual architecture seed** ไม่ใช่ final component

แนวทางที่ถูกต้องคือ:

- แยก shell > page > sections > cards
- แยก mock data ออกจาก component
- แยก UI state ออกจาก server state
- แยก assistant scope ตามบริบท

ผลลัพธ์คือ frontend ที่ยังคง UX เดิม แต่สามารถขยายต่อเป็นระบบ route-based, typed, data-bound, และ maintainable ได้จริง
