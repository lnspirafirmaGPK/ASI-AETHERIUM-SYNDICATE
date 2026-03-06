# ASI Wireframes and Design System

## Scope

เอกสารนี้ต่อยอดจาก mockup หน้าแรกของ ASI เพื่อให้ทีม Product, UX/UI, Frontend และ Platform ใช้เป็น baseline สำหรับการออกแบบและพัฒนา โดยแบ่งเป็น 2 ส่วนหลัก:

1. Detailed wireframes แยกทุกหน้าหลัก
2. Design system + component map สำหรับทีม frontend/dev

---

## Part I — Detailed Wireframes

### 1) Information Architecture

#### Primary Navigation

- Overview
- Workflows
- Departments
- Decisions
- Governance
- Lineage & Audit
- Knowledge
- Settings

#### Persistent Utilities

- Global Search / Command Palette
- Notifications / Alerts
- Global AI Chat
- User Menu / Workspace Switcher

#### Persistent AI Chat Placement

- Global floating chat
- Inline page assistant
- Section assistant
- Entity-specific chat (Decision / Department / Audit item)
- Settings assistant

### 2) Homepage / Service Front Door

#### Page Goal

เป็นจุดเริ่มต้นของทั้งระบบสำหรับ:

- เริ่ม workflow ใหม่
- ดูสถานะองค์กร
- เข้าถึง AI chat ทุกระดับ
- เข้า decision / audit / settings ได้เร็ว

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Top Nav: Logo | Search/Command | Alerts | User | New Workflow       │
├───────────────┬──────────────────────────────────────────────────────┤
│ Left Sidebar  │ Hero / Executive Summary                            │
│ Overview      │ - Headline                                           │
│ Workflows     │ - Inline AI chat / command bar                      │
│ Departments   │ - Quick actions                                      │
│ Decisions     │                                                      │
│ Governance    ├──────────────────────────────────────────────────────┤
│ Lineage       │ Department Snapshot Cards                           │
│ Settings      │ - Finance AI  - Legal AI - Strategy AI - Ops AI     │
│               │ - each card has mini metrics + section chat button  │
│               ├──────────────────────────────────────────────────────┤
│               │ Pending Decisions / Alerts / Drift / Lineage Tiles  │
│               ├──────────────────────────────────────────────────────┤
│               │ Right Utility Rail                                  │
│               │ - Global AI Chat window                             │
│               │ - Recent activity                                   │
│               │ - Recommended actions                               │
└───────────────┴──────────────────────────────────────────────────────┘
```

#### Key Regions

- **A. Hero Region**
  - Headline
  - Org summary metrics
  - Inline AI command/chat
  - Primary actions:
    - Start workflow
    - Pending approvals
    - Drift alerts
    - Open lineage
- **B. Department Snapshot Grid**
  - Department name
  - status chip
  - open tasks
  - pending decisions
  - mini chat CTA
  - open dashboard CTA
- **C. Decision & Alert Region**
  - Awaiting approval
  - Escalated items
  - Drift alerts
  - Integrity failures
- **D. Global AI Utility Rail**
  - mini chat transcript
  - suggested prompts
  - quick commands

### 3) Workflows Page

#### Page Goal

จัดการ lifecycle ของ workflows ทั้งหมด เช่น Budget Reallocation, Risk Review, Policy Override

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Workflows | Filter | Search | Start New Workflow            │
├──────────────────────────────────────────────────────────────────────┤
│ Workflow Tabs: Active | Awaiting Review | Approved | Archived       │
├───────────────────────┬──────────────────────────────────────────────┤
│ Filter Panel          │ Workflow Table / Cards                       │
│ - domain              │ - workflow id                                │
│ - owner               │ - type                                       │
│ - status              │ - assigned agent(s)                          │
│ - risk                │ - current stage                              │
│ - time                │ - SLA status                                 │
│                       │ - open / chat / lineage                      │
├───────────────────────┴──────────────────────────────────────────────┤
│ Bottom / Side AI Assistant: “ช่วยกรอง workflows และสรุปสถานะ”      │
└──────────────────────────────────────────────────────────────────────┘
```

#### Notes

- รองรับ table view และ board view
- มี AI chat สำหรับถามสถานะ workflows เช่น “งานที่เกิน SLA คืออะไร”

### 4) Department Dashboard

#### Page Goal

ดูสถานะของ AI department เฉพาะ domain เช่น Finance AI, Legal AI, Operations AI

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Finance AI | Status | Open Tasks | Policies | Chat          │
├──────────────────────────────────────────────────────────────────────┤
│ KPI Row                                                              │
│ - Active tasks  - Pending approval  - Risk items  - Drift score      │
├────────────────────────────┬─────────────────────────────────────────┤
│ Task List / Queue          │ Department Assistant Chat               │
│ - assigned tasks           │ - ask domain-specific questions         │
│ - priority                 │ - summarize approvals                   │
│ - due time                 │ - explain policy conflicts              │
├────────────────────────────┼─────────────────────────────────────────┤
│ Recent Decisions           │ Policy / Governance Snapshot            │
│ - decision cards           │ - autonomy band                         │
│ - confidence               │ - threshold                             │
│ - open / lineage / explain │ - escalation rules                      │
└────────────────────────────┴─────────────────────────────────────────┘
```

#### Embedded Chats

- Department chat panel fixed on right or drawer mode on smaller screens
- decision-specific mini-chat accessible from each card

### 5) Decisions Board

#### Page Goal

เป็นศูนย์กลางของ governed decisioning

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Decisions | Filters | Search | Export                       │
├──────────────────────────────────────────────────────────────────────┤
│ Status Tabs: Proposed | Reviewed | Awaiting Approval | Approved     │
├────────────────────────────┬─────────────────────────────────────────┤
│ Decision List / Board      │ Decision Detail Panel                   │
│ - decision cards           │ - summary                               │
│ - owner                    │ - reasoning summary                     │
│ - status                   │ - evidence refs                         │
│ - risk                     │ - policy scope                          │
│ - confidence               │ - approval state                        │
│                            │ - actions: approve/reject/open lineage  │
│                            │ - decision AI explainer chat            │
└────────────────────────────┴─────────────────────────────────────────┘
```

#### Decision Detail Panel Must Include

- Decision Artifact summary
- Reasoning summary
- Evidence list
- Policy results
- Review chain
- Human approval actions
- lineage/proof button
- AI explainer chat

### 6) Governance Center

#### Page Goal

ให้ผู้บริหารและ operators ดู policy, drift, autonomy bands, interventions

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Governance | Policy Status | Interventions | Alerts         │
├──────────────────────────────────────────────────────────────────────┤
│ KPI Row: Policies active | Drift incidents | Safe mode | Escalation │
├───────────────────────────┬──────────────────────────────────────────┤
│ Policy Inventory          │ Drift / Alert Feed                       │
│ - policy cards            │ - anomaly cards                          │
│ - versions                │ - severity                               │
│ - enforce/monitor mode    │ - affected domain                        │
├───────────────────────────┼──────────────────────────────────────────┤
│ Autonomy Settings         │ Governance Assistant Chat                │
│ - thresholds              │ - explain a policy                       │
│ - human approval bands    │ - recommend intervention                 │
│ - override rules          │ - compare drift history                  │
└───────────────────────────┴──────────────────────────────────────────┘
```

### 7) Lineage & Audit Center

#### Page Goal

ตรวจสอบ proof, event chain, replay และ forensic trace

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Lineage & Audit | Search by decision/event/trace            │
├──────────────────────────────────────────────────────────────────────┤
│ Search result summary / filters                                      │
├───────────────────────────┬──────────────────────────────────────────┤
│ Event Chain Explorer      │ Proof / Metadata Panel                   │
│ - timeline                │ - lineage hash                           │
│ - tree / chain view       │ - parent hash                            │
│ - actor/service names     │ - signature state                        │
│ - state changes           │ - payload refs                           │
├───────────────────────────┼──────────────────────────────────────────┤
│ Replay Controls           │ Audit Assistant Chat                     │
│ - replay scope            │ - explain event chain                    │
│ - compare versions        │ - summarize anomalies                    │
│ - export                  │ - tell story in business language        │
└───────────────────────────┴──────────────────────────────────────────┘
```

#### Special UX Requirement

- ต้องมี dual-mode view:
  - technical mode
  - executive explanation mode

### 8) Settings Hub

#### Page Goal

รวมการตั้งค่าทั้งหมดของระบบ โดยมี AI assistant ช่วยอธิบายผลกระทบของการตั้งค่า

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Header: Settings                                                     │
├───────────────────────┬──────────────────────────────────────────────┤
│ Settings Nav          │ Settings Content                            │
│ - Workspace           │ selected settings form/panel                │
│ - Appearance          │                                              │
│ - Notifications       │ AI Settings Assistant                       │
│ - Governance          │ - explain effect of change                  │
│ - Security & Access   │ - recommend safe config                     │
│ - AI Chat Controls    │                                              │
│ - Integrations        │                                              │
│ - Audit & Retention   │                                              │
└───────────────────────┴──────────────────────────────────────────────┘
```

#### Settings Categories

- **Workspace**: org name, workspace branding, language, timezone
- **Appearance**: theme mode, density, dashboard layout mode
- **Notifications**: alert severity routing, digest frequency, approval reminders
- **Governance**: approval thresholds, autonomy bands, intervention rules, policy mode
- **Security & Access**: SSO/OIDC, role permissions, session timeout, audit viewer access
- **AI Chat Controls**: global chat enable/disable, inline assistant visibility, department assistant visibility, command shortcuts, saved prompts
- **Integrations**: ERP, CRM, storage, vector services, SIEM/observability
- **Audit & Retention**: event retention, proof retention, archive export, replay permission

### 9) Chat-First Modal / Universal Assistant

#### Page Goal

เป็นหน้าต่างแชทเต็มจอสำหรับ operator/executive ใช้ถามหรือสั่งงานทั้งระบบ

#### Layout (wireframe)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Universal Assistant                                                  │
├────────────────────────────┬─────────────────────────────────────────┤
│ Suggested Commands         │ Conversation Panel                      │
│ - start workflow           │ - transcript                            │
│ - pending approvals        │ - references to decisions               │
│ - drift alerts             │ - quick action buttons                  │
│ - open lineage             │                                         │
├────────────────────────────┴─────────────────────────────────────────┤
│ Composer: input + attachments + command chips                       │
└──────────────────────────────────────────────────────────────────────┘
```

#### AI UX Rules

- แชทต้องไม่บัง critical approval context
- ต้องเปิด side-by-side กับ decision/lineage panel ได้
- ต้องตอบกลับพร้อม action chips เมื่อเกี่ยวกับ workflow จริง

### 10) Responsive Behavior

- **Desktop**
  - sidebar คงที่
  - right utility rail ใช้งานได้
  - decision detail side-by-side
  - embedded chats visible
- **Tablet**
  - sidebar collapses
  - chat panels become slide-over drawers
  - decision detail becomes stacked
- **Mobile**
  - bottom tab navigation
  - floating AI chat expands full-screen
  - critical actions sticky bottom bar
  - lineage explorer แสดงเป็น collapsible steps

---

## Part II — Design System

### 11) Design Principles

#### 11.1 Calm Technology

- low noise
- high signal
- no popup spam
- priority-based surfacing

#### 11.2 Governance Clarity

- every status must communicate meaning
- approvals and escalations must be unmistakable
- policy/risk state must always be visible near decisions

#### 11.3 AI as Embedded Utility

- AI appears as contextual assistance, not only as standalone chatbot
- every major page should support a relevant chat surface

#### 11.4 Executive Readability

- senior users must understand system state quickly
- technical depth should be progressive, not overwhelming

### 12) Design Tokens

#### Color Roles

- bg.base
- bg.elevated
- bg.panel
- fg.primary
- fg.secondary
- border.muted
- accent.primary
- accent.success
- accent.warning
- accent.danger
- accent.info

#### Semantic Status Colors

- Active / Online
- Stable
- Review
- Awaiting Approval
- Escalated
- Drift Detected
- Integrity Failure
- Safe Mode

#### Spacing Scale

4, 8, 12, 16, 20, 24, 32, 40, 48

#### Radius Scale

- card: 24px
- panel: 28px
- pill: full
- buttons: 12px / 16px / 20px by size

#### Shadow Tokens

- shadow.surface
- shadow.panel
- shadow.overlay
- shadow.accent

#### Typography Roles

- display
- page-title
- section-title
- card-title
- body
- body-small
- caption
- label
- mono/meta

### 13) Typography System

#### Suggested Hierarchy

- Display XL — landing/hero headlines
- Heading L — page titles
- Heading M — section titles
- Heading S — card titles
- Body M — default content
- Body S — support copy
- Label / Meta — chips, tabs, helpers

#### Writing Style Rules

- short labels
- explicit action text
- avoid vague wording like “continue” when action is approval/reject
- use operational language in admin surfaces

### 14) Grid & Layout System

#### Page Container

- max-width desktop content container
- full-bleed header allowed

#### Layout Patterns

- AppShell
- Sidebar + Main + UtilityRail
- Header + KPI Row + Grid
- Master-Detail
- List + Inspector
- Tabbed Content + Assistant Panel

#### Breakpoints

- mobile
- tablet
- desktop
- wide desktop

### 15) Core Component Library

#### 15.1 Layout Components

- AppShell
- TopNav
- SidebarNav
- UtilityRail
- PageHeader
- SectionHeader
- ContentGrid
- SplitPanel
- Drawer
- Modal

#### 15.2 Navigation Components

- NavItem
- TabBar
- Breadcrumbs
- CommandPalette
- WorkspaceSwitcher

#### 15.3 Data Display Components

- MetricCard
- KpiStrip
- DepartmentCard
- DecisionCard
- PolicyCard
- AlertCard
- LineageEventRow
- EvidenceList
- StatusTimeline
- AuditChainView

#### 15.4 AI Components

- GlobalChatLauncher
- ChatPanel
- InlineAssistant
- SectionAssistant
- DecisionExplainer
- SettingsAssistant
- SuggestedPromptChip
- AIResponseBlock
- ActionChipGroup

#### 15.5 Form Components

- TextInput
- SearchInput
- Textarea
- Select
- Combobox
- Toggle
- Switch
- Slider
- RadioGroup
- Checkbox
- FormSection

#### 15.6 Governance Components

- RiskBadge
- PolicyScopeBadge
- ApprovalStateChip
- AutonomyBandIndicator
- InterventionBanner
- DriftSignalCard
- TrustIntegrityBadge

#### 15.7 Audit / Lineage Components

- LineageChainTree
- ProofSummaryCard
- HashMetaBlock
- ReplayControlPanel
- TraceCorrelationBlock
- TechnicalExecutiveModeToggle

#### 15.8 Feedback Components

- Toast (low use)
- InlineBanner
- EmptyState
- SkeletonLoader
- ErrorStatePanel
- SuccessStatePanel

### 16) Component States

ทุก component สำคัญต้องมี states ต่อไปนี้:

- default
- hover
- focus
- active
- selected
- disabled
- loading
- error
- empty
- elevated/priority

Additional AI-specific states:

- thinking
- responding
- suggested-action-ready
- blocked-by-policy
- escalation-required

### 17) Page-to-Component Map

#### 17.1 Homepage

- AppShell
- TopNav
- SidebarNav
- PageHeader
- InlineAssistant
- MetricCard
- DepartmentCard
- DecisionCard
- AlertCard
- GlobalChatLauncher
- ChatPanel

#### 17.2 Workflows

- PageHeader
- TabBar
- SearchInput
- FilterDrawer
- WorkflowTable
- WorkflowCard
- SectionAssistant

#### 17.3 Department Dashboard

- PageHeader
- KpiStrip
- TaskTable
- DecisionCard
- PolicySnapshotCard
- SectionAssistant

#### 17.4 Decisions Board

- MasterDetailLayout
- DecisionList
- DecisionInspector
- DecisionExplainer
- ApprovalActionBar
- EvidenceList
- StatusTimeline

#### 17.5 Governance Center

- PolicyCard
- DriftSignalCard
- InterventionBanner
- AutonomyBandIndicator
- SettingsAssistant

#### 17.6 Lineage & Audit

- AuditChainView
- ProofSummaryCard
- LineageEventRow
- ReplayControlPanel
- TechnicalExecutiveModeToggle
- SectionAssistant

#### 17.7 Settings Hub

- SettingsNav
- FormSection
- Toggle
- Select
- Slider
- SettingsAssistant

### 18) Frontend Folder / Module Suggestion

```text
src/
  app/
    shell/
    routes/
      overview/
      workflows/
      departments/
      decisions/
      governance/
      lineage/
      settings/
  components/
    layout/
    navigation/
    cards/
    chat/
    forms/
    governance/
    lineage/
    feedback/
  features/
    decisions/
    approvals/
    departments/
    governance/
    lineage/
    settings/
  hooks/
  services/
    api/
    events/
  store/
  styles/
    tokens/
    themes/
```

### 19) Frontend Engineering Conventions

#### State Management

- page state แยกจาก entity state
- chat state แยกตาม scope: global / page / entity
- query cache สำหรับ read-heavy panels

#### Data Fetching

- route-based loading
- optimistic updates เฉพาะ actions ที่ปลอดภัย
- approval/reject/override actions ต้องมี explicit confirmation state

#### Accessibility

- keyboard-first command palette
- focus visibility ชัด
- color ไม่เป็นตัวสื่อสารเพียงอย่างเดียว
- chat panels รองรับ screen reader labels

#### Performance

- virtualized lists สำหรับ decisions/events
- lazy load detail panels
- split bundles ตาม route/feature
- stream live updates เฉพาะ region ที่จำเป็น

### 20) Recommended MVP Screen Priority

#### Tier 1

- Homepage
- Decisions Board
- Decision Detail Panel
- Settings Hub (core sections only)
- Global AI Chat

#### Tier 2

- Department Dashboard
- Governance Center
- Lineage & Audit Center

#### Tier 3

- Workflows advanced board
- Full universal assistant modal
- advanced replay and technical mode variations

### 21) Design-to-Dev Handoff Checklist

ก่อนส่งงานให้ทีม frontend/dev ต้องมีอย่างน้อย:

- page inventory
- user flows
- low-fidelity wireframes
- component inventory
- state list ต่อ component
- token list
- responsive rules
- interaction notes
- empty/loading/error states
- AI chat placement rules

### 22) Final Recommendation

สำหรับ implementation รอบแรก ให้ทีมเริ่มจาก 3 artifacts ต่อไปนี้ก่อน:

1. Low-fidelity wireframes ของ 5 หน้าแรก
2. Design system v0.1 พร้อม tokens + 20 components แกน
3. Frontend route/component map สำหรับ MVP

เอกสารนี้ทำหน้าที่เป็น baseline สำหรับแปลงต่อไปเป็น:

- visual wireframes ใน Figma
- clickable prototype
- component backlog
- frontend implementation plan
