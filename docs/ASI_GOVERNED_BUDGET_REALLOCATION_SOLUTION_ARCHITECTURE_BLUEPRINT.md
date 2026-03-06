# Solution Architecture Blueprint

## Use Case แรกของ ASI: **Governed Budget Reallocation**

---

## 1. Executive Intent

use case แรกของ ASI ควรเป็น use case ที่

- มีผลกระทบทางธุรกิจจริง
- มี decision chain ชัดเจน
- มีเงื่อนไขด้าน governance ชัด
- พิสูจน์ lineage, policy enforcement, human oversight ได้ครบ
- ไม่ซับซ้อนเกินไปสำหรับ vertical slice แรก

ดังนั้น use case ที่เหมาะที่สุดคือ:

> **Governed Budget Reallocation**
> การประเมินและอนุมัติการโยกงบประมาณระหว่างหน่วยงาน/หมวดค่าใช้จ่าย ภายใต้ข้อจำกัดด้านนโยบาย ความเสี่ยง และการอนุมัติจากมนุษย์เมื่อเกิน threshold

use case นี้เหมาะมาก เพราะมีทั้ง

- finance logic
- risk review
- strategy context
- approval workflow
- audit requirement
- cryptographic lineage
- executive intervention

---

## 2. Business Problem Statement

องค์กรต้องการลดเวลาการตัดสินใจเรื่องการโยกงบจากหลายวัน/หลายสัปดาห์ เหลือระดับนาทีถึงชั่วโมง โดยยังรักษา

- compliance
- approval integrity
- traceability
- accountability

ปัญหาปัจจุบันในองค์กรทั่วไปคือ

- ข้อมูลกระจายหลายระบบ
- การอนุมัติไม่โปร่งใส
- เหตุผลในการตัดสินใจตามย้อนหลังยาก
- policy threshold ถูกตีความไม่สม่ำเสมอ
- ไม่มี lineage ของคำแนะนำจาก AI หรือผู้เกี่ยวข้อง

ASI จะเข้ามาแก้ด้วย governed multi-agent decision flow

---

## 3. Business Outcome

### 3.1 เป้าหมายหลัก

- ลด decision cycle time สำหรับ budget reallocation
- ทำให้ทุก decision มี structured decision artifact
- enforce human approval เมื่อเกิน threshold
- เก็บ lineage ครบทุกขั้น
- แสดงสถานะบน executive dashboard แบบ near-real-time

### 3.2 ตัวชี้วัดความสำเร็จ

| Metric                                          | Target                  |
| ----------------------------------------------- | ----------------------- |
| Decision turnaround time                        | < 15 นาที สำหรับเคสปกติ |
| Policy evaluation completeness                  | 100%                    |
| Decision trace completeness                     | 100%                    |
| Lineage proof retrieval success                 | 99.9%                   |
| Human approval enforcement for threshold breach | 100%                    |
| Replay success of audit chain                   | 100%                    |

---

## 4. Scope

### 4.1 In Scope

- รับคำขอโยกงบ
- ตรวจสอบข้อมูลการเงินและบริบทเชิงกลยุทธ์
- ให้ Finance Agent เสนอ recommendation
- ให้ Risk Agent review
- ให้ Cogitator X สังเคราะห์ผลลัพธ์
- ให้ Policy Engine ตรวจ threshold/rules
- ให้ Executive Dashboard แสดงและอนุมัติเมื่อจำเป็น
- ให้ GenesisCore บันทึก lineage ของทุก event/material action

### 4.2 Out of Scope

- การ execute transaction จริงใน ERP
- cross-border tax optimization
- procurement contract renegotiation
- advanced portfolio forecasting
- autonomous execution โดยไม่ผ่าน approval เมื่อเกิน threshold

---

## 5. Actors

### 5.1 Human Actors

| Actor                   | Role                       |
| ----------------------- | -------------------------- |
| Budget Requestor        | ยื่นคำขอโยกงบ              |
| CFO / Finance Executive | อนุมัติเมื่อเกิน threshold |
| Strategy Executive      | ดู impact เชิงกลยุทธ์      |
| Audit/Compliance        | ตรวจสอบย้อนหลัง            |
| Platform Operator       | ดูแลระบบ                   |

### 5.2 AI/System Actors

| Actor               | Role                              |
| ------------------- | --------------------------------- |
| Strategy Agent      | ให้ strategic context             |
| Finance Agent       | วิเคราะห์งบและเสนอ recommendation |
| Risk Agent          | ประเมินความเสี่ยง                 |
| Cogitator X         | สังเคราะห์ decision               |
| Policy Engine       | enforce rules                     |
| GenesisCore         | lineage, signature, proof         |
| AetherBus           | inter-service/inter-agent events  |
| Executive Dashboard | UI สำหรับ oversight               |

---

## 6. Functional Requirements

### 6.1 Core Requirements

1. ระบบต้องรับ budget reallocation request ได้
2. ระบบต้อง resolve ว่า request นี้อยู่ภายใต้ policy scope ใด
3. ระบบต้อง assign task ให้ Finance Agent วิเคราะห์
4. ระบบต้องให้ Risk Agent review
5. ระบบต้องให้ Cogitator X สร้าง decision artifact
6. ระบบต้อง evaluate policy thresholds
7. หากเกิน threshold ต้อง require human approval
8. ทุก material event ต้องถูก sign, hash, validate, commit
9. ระบบต้อง query lineage proof ได้
10. ระบบต้อง replay audit chain ได้

### 6.2 Governance Requirements

1. decision ทุกชิ้นต้องมี reasoning summary
2. ทุก decision ต้องมี evidence references
3. ทุก approval/override ต้องมี actor identity
4. ทุก event ต้องมี trace_id / correlation_id / lineage_hash
5. ถ้า policy engine unavailable ห้าม execute sensitive decision อัตโนมัติ

---

## 7. Non-Functional Requirements

### 7.1 Availability

- critical path services ต้องเป็น HA
- degraded mode ต้องรองรับได้

### 7.2 Performance

- p95 task assignment < 500ms
- p95 policy evaluation < 300ms
- p95 lineage validation < 250ms
- end-to-end standard path < 15 นาที

### 7.3 Security

- mTLS ภายใน cluster
- signed event envelopes
- restricted data via payload reference
- RBAC + workload identity

### 7.4 Auditability

- append-only lineage
- decision artifact immutable versioning
- replayable audit trail

---

## 8. Solution Context

### 8.1 Context View

```text
Budget Requestor / Finance User
           │
           ▼
   Executive Dashboard / Request UI
           │
           ▼
      ASI Control Plane
           │
   ┌───────┼────────┬──────────┐
   ▼       ▼        ▼          ▼
Task   Finance   Risk     Policy Engine
Sched. Agent     Agent
   │       │        │          │
   └───────┴───▼────┴──────────┘
               Cogitator X
                    │
                    ▼
               Decision Artifact
                    │
                    ▼
               GenesisCore
                    │
                    ▼
                Audit / Proof
```

---

## 9. Logical Solution Architecture

### 9.1 Main Components

| Layer         | Component           | Responsibility                |
| ------------- | ------------------- | ----------------------------- |
| Experience    | Executive Dashboard | request, review, approve      |
| Control       | Request API         | intake + validation           |
| Control       | Task Scheduler      | create and assign tasks       |
| Agent Runtime | Finance Agent       | cost/budget analysis          |
| Agent Runtime | Risk Agent          | risk scoring/review           |
| Reasoning     | Cogitator X         | synthesis + decision artifact |
| Governance    | Policy Engine       | threshold enforcement         |
| Trust         | GenesisCore         | hash, signature, commit       |
| Messaging     | AetherBus           | event transport               |
| Observability | Trace/Audit Stack   | metrics, traces, audit        |

### 9.2 Mandatory Services for MVP Slice

- request-intake-service
- agent-registry
- task-scheduler
- finance-agent
- risk-agent
- cogitator-core
- decision-synthesizer
- policy-engine
- lineage-hash-service
- lineage-validator-service
- genesis-ledger-writer
- lineage-audit-service
- audit-dashboard-service

---

## 10. Deployment View

### 10.1 Namespaces

- `asi-system`
- `asi-agents`
- `asi-reasoning`
- `asi-governance`
- `asi-lineage`
- `asi-observability`

### 10.2 Workload Placement

| Workload                        | Namespace         | Placement                |
| ------------------------------- | ----------------- | ------------------------ |
| request-intake / dashboard APIs | asi-system        | general compute          |
| finance/risk agents             | asi-agents        | scale-out worker nodes   |
| cogitator-core                  | asi-reasoning     | CPU-optimized nodes      |
| policy-engine                   | asi-governance    | protected HA nodes       |
| genesis services                | asi-lineage       | isolated secure nodes    |
| observability stack             | asi-observability | elastic monitoring nodes |

---

## 11. Data Model

### 11.1 Core Business Objects

- Budget Reallocation Request
- Task
- Agent Review
- Decision Artifact
- Policy Evaluation Result
- Approval Record
- Lineage Event
- Audit Proof

### 11.2 Budget Reallocation Request

```json
{
  "request_id": "brq_001",
  "requestor_id": "usr_001",
  "source_cost_center": "MKT-01",
  "target_cost_center": "OPS-02",
  "amount": 1200000,
  "currency": "THB",
  "reason": "Operational demand shift",
  "attachments": ["doc_123"],
  "submitted_at": "2026-03-06T09:00:00Z"
}
```

### 11.3 Decision Artifact

```json
{
  "decision_id": "dec_001",
  "case_id": "brq_001",
  "proposed_by": "agt_finance_01",
  "reviewed_by": ["agt_risk_01"],
  "decision_type": "budget_reallocation",
  "recommendation": "approve_with_conditions",
  "confidence": 0.87,
  "risk_level": "medium",
  "reasoning_summary": "Budget transfer is viable but exceeds autonomous threshold.",
  "evidence_refs": ["doc_123", "budget_snapshot_44"],
  "policy_scope": ["finance", "risk"],
  "approval_required": true,
  "lineage_hash": "0xabc123"
}
```

---

## 12. API Blueprint

### 12.1 Request Intake API

#### Submit Budget Reallocation

`POST /api/budget/v1/reallocation-requests`

Request:

```json
{
  "source_cost_center": "MKT-01",
  "target_cost_center": "OPS-02",
  "amount": 1200000,
  "currency": "THB",
  "reason": "Operational demand shift",
  "attachments": ["doc_123"]
}
```

Response:

```json
{
  "request_id": "brq_001",
  "status": "submitted",
  "case_id": "brq_001"
}
```

### 12.2 Task API

#### Create Task

`POST /api/tasks/v1/tasks`

#### Get Task

`GET /api/tasks/v1/tasks/{task_id}`

### 12.3 Decision API

#### Submit Proposal

`POST /api/decisions/v1/proposals`

#### Review Proposal

`POST /api/decisions/v1/proposals/{decision_id}:review`

#### Approve Proposal

`POST /api/decisions/v1/proposals/{decision_id}:approve`

### 12.4 Governance API

#### Evaluate Policy

`POST /api/governance/v1/policies:evaluate`

### 12.5 Lineage API

#### Submit Event

`POST /api/lineage/v1/events`

#### Get Proof

`GET /api/lineage/v1/events/{event_id}/proof`

---

## 13. Event Blueprint

### 13.1 Core Events in This Use Case

```text
asi.budget.request.submitted.v1
asi.agent.task.created.v1
asi.agent.task.assigned.v1
asi.agent.decision.proposed.v1
asi.agent.decision.reviewed.v1
asi.decision.synthesized.v1
asi.governance.policy.evaluated.v1
asi.decision.approval.requested.v1
asi.decision.approved.v1
asi.lineage.event.committed.v1
asi.audit.proof.generated.v1
```

### 13.2 Event Flow Summary

1. request submitted
2. task created
3. task assigned to finance-agent
4. finance-agent proposes decision
5. risk-agent reviews
6. Cogitator X synthesizes
7. policy-engine evaluates
8. if threshold breach → approval requested
9. human approves
10. GenesisCore commits lineage chain

---

## 14. Sequence Blueprint

### 14.1 Main Success Path

```text
User
 │
 │ Submit budget reallocation request
 ▼
Request Intake Service
 │ validate + create case
 ▼
Task Scheduler
 │ create task
 ▼
Finance Agent
 │ analyze budget impact
 │ produce proposal
 ▼
Risk Agent
 │ review proposal
 ▼
Cogitator X
 │ synthesize decision artifact
 ▼
Policy Engine
 │ evaluate thresholds and approval rules
 ├─ if below threshold → auto-approve within envelope
 └─ if above threshold → request human approval
                     ▼
             Executive Dashboard
                     │ approve / reject
                     ▼
                GenesisCore
                     │ hash + validate + commit
                     ▼
              Audit / Observability
```

### 14.2 Alternate Flows

#### A. Policy breach

- policy engine returns deny
- decision marked rejected
- event committed
- dashboard updated

#### B. Risk escalation

- risk-agent flags high risk
- decision status becomes `needs_human_review`
- auto-execution disabled

#### C. Lineage validation failure

- event quarantined
- approval/execution blocked
- operator alert emitted

---

## 15. Governance Blueprint

### 15.1 Policy Rules

ตัวอย่าง policy ที่ต้องมี

| Policy ID    | Rule                                         |
| ------------ | -------------------------------------------- |
| POL-FIN-001  | amount > threshold requires CFO approval     |
| POL-FIN-002  | source and target cost center must be active |
| POL-RISK-001 | high risk score disables autonomous approval |
| POL-AUD-001  | decision artifact must contain evidence refs |
| POL-LIN-001  | lineage hash mandatory for material decision |

### 15.2 Approval Bands

| Amount / Risk                  | Action                                  |
| ------------------------------ | --------------------------------------- |
| ต่ำกว่า threshold และ risk ต่ำ | AI approve ภายใน envelope               |
| เกิน threshold แต่ risk กลาง   | human approval required                 |
| risk สูง                       | mandatory escalation + no auto-approval |
| policy conflict                | reject / manual review                  |

---

## 16. GenesisCore Blueprint for This Use Case

### 16.1 Material Events Requiring Commitment

- request submitted
- task assigned
- finance proposal created
- risk review created
- decision synthesized
- policy evaluated
- human approval recorded
- final decision committed

### 16.2 Event Structure

```json
{
  "event_id": "evt_001",
  "event_type": "asi.agent.decision.proposed.v1",
  "timestamp": "2026-03-06T09:05:00Z",
  "actor_id": "agt_finance_01",
  "parent_hash": "0xprev",
  "payload_hash": "0xpayload",
  "lineage_hash": "0xlineage",
  "signature": "ed25519:...",
  "trace_id": "trc_001",
  "correlation_id": "cor_001"
}
```

### 16.3 Verification Path

1. envelope validation
2. hash generation
3. parent continuity check
4. signature verification
5. append-only commit
6. Merkle proof generation

---

## 17. Security Blueprint

### 17.1 Identity

- user identity ผ่าน SSO/OIDC
- service identity ผ่าน workload identity
- agent identity ลงทะเบียนผ่าน genesis-identity-service

### 17.2 Authorization

| Actor         | Scope                         |
| ------------- | ----------------------------- |
| requestor     | `budget:submit`               |
| finance-agent | `decision:propose`            |
| risk-agent    | `decision:review`             |
| policy-engine | `policy:evaluate`             |
| CFO           | `decision:approve`            |
| audit role    | `audit:read`, `lineage:proof` |

### 17.3 Data Protection

- confidential payloads ส่งด้วย payload reference
- attachments เก็บใน object store
- event payload เก็บ hash/reference ไม่เก็บ raw data เสมอไป

---

## 18. Reliability Blueprint

### 18.1 Resilience Rules

- task assignment ใช้ at-least-once delivery
- decision approval ใช้ idempotency key
- lineage commit ใช้ deduplication by event_id + lineage hash
- policy-engine unavailable → fail closed สำหรับ high-impact action

### 18.2 Failure Handling

| Failure               | Response                           |
| --------------------- | ---------------------------------- |
| finance-agent down    | reschedule task                    |
| risk-agent timeout    | mark pending review / escalate     |
| cogitator overload    | queue + bounded delay              |
| policy-engine down    | block approval path                |
| lineage mismatch      | quarantine event                   |
| dashboard unavailable | workflow continues; approval waits |

---

## 19. Observability Blueprint

### 19.1 Required Telemetry

- request count
- task queue depth
- finance-agent processing latency
- risk-agent review latency
- policy evaluation latency
- lineage validation failure count
- approval cycle time
- proof retrieval latency

### 19.2 Required Correlation Fields

- trace_id
- correlation_id
- case_id
- decision_id
- event_id
- lineage_hash
- agent_id
- policy_id

### 19.3 Executive Dashboard Panels

- requests pending approval
- decisions by status
- threshold breaches
- risk escalations
- lineage validation failures
- mean turnaround time

---

## 20. State Model

### 20.1 Request Lifecycle

```text
submitted
  ↓
validated
  ↓
under_analysis
  ↓
under_review
  ↓
policy_evaluated
  ↓
awaiting_approval / approved / rejected
  ↓
committed
```

### 20.2 Decision Lifecycle

```text
proposed
  ↓
reviewed
  ↓
synthesized
  ↓
policy_checked
  ↓
approved / rejected / escalated
  ↓
committed
```

---

## 21. Implementation Slicing

### 21.1 Phase 1 — Functional Slice

- request intake
- finance-agent
- risk-agent
- policy-engine
- simple dashboard

### 21.2 Phase 2 — Trust Slice

- lineage hash
- signature verify
- ledger commit
- proof retrieval

### 21.3 Phase 3 — Operational Slice

- observability
- retries
- dead-letter handling
- safe mode
- audit replay

---

## 22. Minimal Tech Stack for First Use Case

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Frontend       | React + Tailwind                      |
| API            | FastAPI                               |
| Internal RPC   | gRPC                                  |
| Messaging      | NATS JetStream                        |
| Lineage        | Python/Rust hybrid                    |
| Primary DB     | PostgreSQL                            |
| Cache          | Redis                                 |
| Object Storage | S3 / MinIO                            |
| Deployment     | Kubernetes                            |
| Secrets        | Vault                                 |
| Observability  | OpenTelemetry + metrics/logging stack |

---

## 23. Architecture Decisions for This Use Case

### AD-01

ใช้ **budget reallocation** เป็น first vertical slice เพราะมี governance ครบแต่ domain จำกัด

### AD-02

ใช้ **human-in-the-loop** เมื่อเกิน policy threshold

### AD-03

ใช้ **event-driven coordination** ระหว่าง services/agents

### AD-04

material decisions ทุกชิ้นต้องออกเป็น **Decision Artifact**

### AD-05

material events ทุกตัวต้องผ่าน **GenesisCore lineage path**

### AD-06

เมื่อ policy-engine unavailable ให้ **fail closed** สำหรับ approval path

---

## 24. Acceptance Criteria

ระบบถือว่าสำเร็จเมื่อทำได้ครบดังนี้

1. user ส่งคำขอโยกงบผ่าน dashboard ได้
2. finance-agent วิเคราะห์และส่ง proposal ได้
3. risk-agent review ได้
4. Cogitator X สร้าง decision artifact ได้
5. policy-engine บังคับ human approval เมื่อ threshold breach ได้
6. CFO อนุมัติผ่าน dashboard ได้
7. GenesisCore คืน proof ของ decision chain ได้
8. audit replay ของเคสหนึ่งเคสทำได้ครบ
9. trace/log/metrics เชื่อมกันด้วย correlation identifiers
10. เมื่อ lineage validation fail ระบบ block การ commit ได้

---

## 25. Blueprint Summary

use case แรกของ ASI ควรพิสูจน์ 5 เรื่องพร้อมกัน

- **AI agents can participate in real decisions**
- **governance can constrain autonomy**
- **human authority remains sovereign**
- **lineage can prove accountability**
- **event-driven architecture can scale the workflow**

ดังนั้น **Governed Budget Reallocation** เป็น first use case ที่เหมาะที่สุด เพราะเป็นโดเมนที่มี business value สูงและพิสูจน์แกนของ ASI ได้ครบทุกเสา

---

## 26. Deliverables ถัดไปที่ควรทำต่อ

ลำดับที่คุ้มที่สุดจาก blueprint นี้คือ

### A. OpenAPI + AsyncAPI Spec สำหรับ use case นี้

เพื่อให้ทีม backend/platform เริ่มลงมือได้

### B. C4 Model สำหรับ use case นี้

ประกอบด้วย Context / Container / Component

### C. Implementation Backlog

แปลง blueprint นี้เป็น epic / capability / service work packages สำหรับทีม Platform, AI, Security, Frontend, DevOps
