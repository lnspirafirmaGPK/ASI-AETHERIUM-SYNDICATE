
# ASI API Contract Mapping Table

เอกสารนี้เป็นข้อตกลง (contract) ระหว่างทีม Frontend และ Backend สำหรับการเชื่อมต่อ API ของ ASI Homepage

**เป้าหมาย:** เพื่อให้ทั้งสองทีมทำงานขนานกันได้ โดยมี data shape และ endpoint ที่ตรงกันตั้งแต่ต้น

---

## 1. Homepage & General Endpoints

### 1.1 Homepage Summary

- **Frontend Component**: `HomepageHero` (แสดงผลค่ารวม)
- **Frontend Hook**: `useHomepageSummary()`
- **Backend Endpoint**: `GET /api/overview/v1/homepage-summary`
- **Backend Responsibility**: รวบรวมสถิติภาพรวมสำหรับ executive summary
- **Request Payload**: `N/A`
- **Response Payload (JSON)**:

```json
{
  "metrics": {
    "pendingApprovals": 12,
    "driftAlerts": 3,
    "recentAnomalies": 1
  },
  "orgHeadline": {
    "title": "สถานะองค์กร AI: ปกติ",
    "status": "stable"
  }
}
```

### 1.2 Settings Overview

- **Frontend Component**: `SettingsOverviewPanel`
- **Frontend Hook**: `useSettingsOverview()`
- **Backend Endpoint**: `GET /api/settings/v1/overview`
- **Backend Responsibility**: ดึงข้อมูลสรุปของกลุ่มการตั้งค่าหลัก
- **Request Payload**: `N/A`
- **Response Payload (JSON)**:

```json
{
  "groups": [
    {
      "id": "workspace",
      "title": "Workspace Settings",
      "itemCount": 4,
      "deepLink": "/settings/workspace"
    },
    {
      "id": "governance",
      "title": "AI Governance Settings",
      "itemCount": 5,
      "deepLink": "/settings/governance"
    },
    {
      "id": "security",
      "title": "Security & Access",
      "itemCount": 3,
      "deepLink": "/settings/security"
    }
  ]
}
```

---

## 2. Departments

### 2.1 Departments Summary

- **Frontend Component**: `DepartmentGrid`
- **Frontend Hook**: `useDepartmentsSummary()`
- **Backend Endpoint**: `GET /api/departments/v1/summary`
- **Backend Responsibility**: ดึงข้อมูลสรุปของ AI Departments ทั้งหมดสำหรับแสดงใน grid
- **Request Payload**: `N/A`
- **Response Payload (JSON)**:

```json
{
  "departments": [
    {
      "id": "dept_finance_ai",
      "name": "Finance AI",
      "status": "stable", // "stable" | "review" | "active" | "degraded"
      "metrics": {
        "activeTasks": 24,
        "pendingApprovals": 2,
        "alerts": 0
      }
    },
    {
      "id": "dept_legal_ai",
      "name": "Legal AI",
      "status": "review",
      "metrics": {
        "activeTasks": 9,
        "pendingApprovals": 1,
        "alerts": 1
      }
    }
    // ... more departments
  ]
}
```

---

## 3. Decisions

### 3.1 Decision Feed

- **Frontend Component**: `DecisionCenter`
- **Frontend Hook**: `useDecisionFeed({ status: ['pending', 'recent'] })`
- **Backend Endpoint**: `GET /api/decisions/v1/feed`
- **Backend Responsibility**: ดึงรายการ decision ที่กำลังรอหรือเพิ่งอนุมัติ/ปฏิเสธไปล่าสุด
- **Request Payload (Query Params)**:
  - `status`: `string` (e.g., "pending,recent")
  - `limit`: `number` (e.g., 10)
- **Response Payload (JSON)**:

```json
{
  "decisions": [
    {
      "id": "DEC-1042",
      "title": "Budget Reallocation",
      "owner": {
        "id": "dept_finance_ai",
        "name": "Finance AI"
      },
      "state": "Awaiting CFO Approval",
      "risk": "medium", // "low" | "medium" | "high"
      "confidence": 0.85,
      "createdAt": "2023-10-27T10:00:00Z"
    },
    {
      "id": "DEC-1038",
      "title": "Ops Schedule Adjustment",
      "owner": {
        "id": "dept_operations_ai",
        "name": "Operations AI"
      },
      "state": "Approved",
      "risk": "low",
      "confidence": 0.98,
      "createdAt": "2023-10-26T18:00:00Z"
    }
    // ... more decisions
  ]
}
```

### 3.2 Decision Detail (for Explainer Panel)

- **Frontend Component**: `DecisionExplainerPanel` (เมื่อ user เลือก decision)
- **Frontend Hook**: `useDecisionDetail(decisionId)`
- **Backend Endpoint**: `GET /api/decisions/v1/{decisionId}`
- **Backend Responsibility**: ดึงข้อมูลรายละเอียดของ decision หนึ่งรายการ
- **Request Payload**: `N/A` (decisionId in path)
- **Response Payload (JSON)**:

```json
{
  "decision": {
    "id": "DEC-1042",
    "title": "Budget Reallocation",
    "owner": {
      "id": "dept_finance_ai",
      "name": "Finance AI"
    },
    "state": "Awaiting CFO Approval",
    "risk": "medium",
    "confidence": 0.85,
    "summary": "AI proposes reallocating budget from Q4 marketing to Q1 engineering based on project velocity.",
    "relatedPolicies": [
      { "id": "POL-FIN-001", "name": "Budget Delta Threshold" },
      { "id": "POL-RISK-007", "name": "Cross-Quarter Reallocation Review" }
    ],
    "lineageAvailable": true,
    "createdAt": "2023-10-27T10:00:00Z"
  }
}
```

---

## 4. Lineage

### 4.1 Lineage Highlights

- **Frontend Component**: `LineageAuditSummary`
- **Frontend Hook**: `useLineageHighlights()`
- **Backend Endpoint**: `GET /api/lineage/v1/highlights`
- **Backend Responsibility**: ดึงข้อมูลสรุปกิจกรรม audit และ lineage ที่สำคัญล่าสุด
- **Request Payload**: `N/A`
- **Response Payload (JSON)**:

```json
{
  "highlights": [
    {
      "id": "evt_chain_1138",
      "type": "audit_replay",
      "summary": "Audit replay for DEC-1038 completed successfully.",
      "timestamp": "2023-10-27T11:00:00Z"
    },
    {
      "id": "evt_chain_1139",
      "type": "proof_generated",
      "summary": "Cryptographic proof for DEC-1042 was published.",
      "timestamp": "2023-10-27T10:05:00Z"
    }
  ]
}
```

---

## 5. AI Assistant / Chat

### 5.1 Universal Chat Endpoint

- **Frontend Component**: `GlobalChatPanel`, `DepartmentAssistantPanel`, `DecisionExplainerPanel`, `HomepageHero`
- **Frontend Hook**: `useAssistantThread(scope)` -> `mutation.mutate()`
- **Backend Endpoint**: `POST /api/assistant/v1/chat`
- **Backend Responsibility**: รับ prompt จาก user, ประมวลผลตาม scope, และคืนคำตอบจาก AI
- **Request Payload (JSON)**:

```json
{
  "scope": {
    "type": "global" // "global" | "department" | "decision"
    // "contextId" is added for non-global scopes
    // "contextId": "dept_finance_ai" for department scope
    // "contextId": "DEC-1042" for decision scope
  },
  "threadId": "thread-global-001", // Optional: to continue a conversation
  "message": {
    "role": "user",
    "content": "สรุป decisions ที่ต้องอนุมัติวันนี้ให้หน่อย"
  }
}
```

- **Response Payload (JSON)**:

```json
{
  "threadId": "thread-global-001",
  "message": {
    "role": "assistant",
    "content": "พบ 3 รายการที่รอการอนุมัติ: Budget Reallocation, Vendor Risk Flag, และ Policy Override Request ครับ"
  },
  "suggestedActions": [
    { "type": "navigate", "label": "เปิด Decision Board", "target": "/decisions" },
    { "type": "query", "label": "กรองเฉพาะรายการ Risk สูง", "query": "แสดงรายการ risk สูง" }
  ]
}
```
