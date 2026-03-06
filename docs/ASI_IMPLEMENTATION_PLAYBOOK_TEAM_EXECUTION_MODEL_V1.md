# ASI Implementation Playbook

## แยกตามทีม Platform / Backend / AI / Security / DevOps

### สำหรับเริ่ม build use case แรก: **Governed Budget Reallocation**

เอกสารนี้แปลง ASI จากระดับ architecture/ADR ไปสู่ **execution model รายทีม** โดยตอบ 5 คำถามหลักให้แต่ละทีม

* ทีมนี้รับผิดชอบอะไร
* ต้องส่งมอบอะไร
* ลำดับงานควรเป็นอย่างไร
* Definition of Done คืออะไร
* จุดเชื่อมกับทีมอื่นคืออะไร

---

# 1. Program Structure

## 1.1 Program Goal

สร้าง **first production-grade vertical slice** ของ ASI ที่พิสูจน์ 5 เรื่องพร้อมกัน

1. AI agents ทำงานใน decision flow จริงได้
2. governance จำกัด autonomy ได้จริง
3. human approval ถูก enforce ได้
4. lineage/audit proof เรียกดูย้อนหลังได้
5. ระบบ deploy/run/observe บน cloud-native platform ได้จริง

## 1.2 Team Model

| Team     | Primary Mandate                                                          |
| -------- | ------------------------------------------------------------------------ |
| Platform | runtime foundation, shared services, messaging, service standards        |
| Backend  | business APIs, orchestration logic, decision services, dashboard backend |
| AI       | agents, reasoning flows, decision synthesis, evaluation                  |
| Security | identity, authorization, secrets, signatures, trust controls             |
| DevOps   | cluster, CI/CD, GitOps, observability plumbing, release operations       |

---

# 2. Cross-Team Delivery Phases

## Phase 0 — Foundation Alignment

ล็อก architecture baseline, repo strategy, service catalog, schemas, environments

## Phase 1 — Functional Vertical Slice

ให้ request → analysis → review → approval workflow ทำงานครบแบบ end-to-end

## Phase 2 — Trust & Governance Hardening

เติม lineage, signature, policy enforcement, replay, quarantine

## Phase 3 — Production Readiness

เติม HA, observability depth, failure handling, security hardening, rollout discipline

---

# 3. Platform Team Playbook

## 3.1 Mandate

สร้าง **shared runtime foundation** สำหรับ ASI

รับผิดชอบสิ่งที่ทุกทีมใช้ร่วมกัน เช่น

* service conventions
* internal platform APIs
* event fabric standards
* service catalog
* shared SDKs
* common runtime patterns

## 3.2 Scope of Ownership

### Core Shared Components

* AetherBus baseline integration
* service catalog registry
* schema registry pattern
* shared API/error conventions
* event envelope library
* lineage client SDK
* idempotency/retry utility library
* common telemetry middleware

### Platform Standards

* service template
* API contract standard
* event naming standard
* topic namespace standard
* error model
* correlation ID propagation
* health/readiness contract
* runtime config model

## 3.3 Key Deliverables

### Deliverable P-1 — Service Bootstrap Template

template สำหรับบริการใหม่ทุกตัว ต้องมี

* health endpoints
* structured logging
* OpenTelemetry hooks
* config loader
* auth middleware
* trace/correlation propagation
* standard error contract

### Deliverable P-2 — Akashic Envelope SDK

SDK สำหรับ publish/consume event แบบมาตรฐาน

รองรับ

* event_id generation
* schema_ref
* trace_id / correlation_id
* lineage fields
* signature placeholder/integration hooks
* classification and priority metadata

### Deliverable P-3 — Service Catalog Registry

ระบบกลางสำหรับบันทึก metadata ของ service ทุกตัว

ขั้นต่ำต้องเก็บ

* owner
* domain
* type
* APIs
* topics produced/consumed
* criticality
* data classification
* lineage requirement

### Deliverable P-4 — Internal Contract Pack

แพ็กมาตรฐานของ

* protobuf skeleton
* OpenAPI skeleton
* AsyncAPI/event schema skeleton

## 3.4 Work Breakdown

### Sprint Block P-A

* สร้าง repo/template มาตรฐาน
* ล็อก naming conventions
* ล็อก event envelope schema
* ล็อก error schema

### Sprint Block P-B

* สร้าง AetherBus client abstraction
* สร้าง publish/consume middleware
* สร้าง idempotency helper
* สร้าง schema validation hooks

### Sprint Block P-C

* สร้าง service catalog service หรือ catalog repo model
* สร้าง onboarding checklist สำหรับ service ใหม่

## 3.5 Definition of Done

Platform ถือว่าส่งมอบได้เมื่อ

* service ใหม่สามารถ bootstrap จาก template ได้ใน < 1 ชั่วโมง
* ทุก service ใช้ trace_id / correlation_id แบบเดียวกัน
* event envelope schema ผ่านร่วมกันทุกทีม
* มี catalog entry สำหรับทุก deployable unit ของ vertical slice
* มี SDK ที่ backend/AI ใช้งานจริงแล้วอย่างน้อย 2 services

## 3.6 Dependencies

* ต้องทำงานคู่กับ Security เรื่อง identity/auth middleware
* ต้องทำงานคู่กับ DevOps เรื่อง runtime config/observability hooks
* ต้องทำงานคู่กับ Backend/AI เรื่อง contract ergonomics

---

# 4. Backend Team Playbook

## 4.1 Mandate

สร้าง **business application services** และ orchestration APIs สำหรับ use case แรก

## 4.2 Scope of Ownership

### Business Services

* request-intake-service
* task-orchestration facade
* decision service
* approval service
* dashboard backend APIs
* audit query facade
* policy integration adapters

### Business Data Models

* budget reallocation request
* task
* review
* decision artifact
* approval record
* audit query object

## 4.3 Key Deliverables

### Deliverable B-1 — Request Intake Service

รับ budget reallocation request, validate, create case, emit first event

### Deliverable B-2 — Decision Service

รับ proposal/review/synthesized decision และเก็บ lifecycle ของ decision artifact

### Deliverable B-3 — Approval Service

รองรับ

* approval request creation
* CFO approval/rejection
* authority check
* approval event emission

### Deliverable B-4 — Audit Query API

เปิดให้ dashboard/audit user query

* decision timeline
* lineage event references
* approval trail
* replay request status

## 4.4 Work Breakdown

### Sprint Block B-A

* สร้าง data models + DB migrations
* สร้าง request APIs
* สร้าง task creation path
* สร้าง status query endpoints

### Sprint Block B-B

* สร้าง decision artifact lifecycle
* เชื่อม finance/risk/cogitator outputs
* เชื่อม policy evaluation results
* สร้าง approval path

### Sprint Block B-C

* สร้าง audit query API
* สร้าง admin/replay request endpoints
* เติม idempotency + error handling
* เติม fallback/degraded behaviors

## 4.5 Required Interfaces

Backend ต้องคอนแทรกต์กับ

* Platform: service template, event SDK
* AI: proposal/review payloads
* Security: auth scopes, request signing policy
* DevOps: deployment manifests, readiness/liveness
* Governance/Policy services: evaluation contract

## 4.6 Definition of Done

* request → task → decision → approval → commit path ทำงานครบ
* APIs มี OpenAPI spec
* ทุก write action มี emitted events
* decision artifact lifecycle query ได้
* approval enforcement ผ่าน authority rules
* integration tests ครอบคลุม main success path + 3 failure paths

---

# 5. AI Team Playbook

## 5.1 Mandate

สร้าง **agent runtimes และ reasoning flows** สำหรับ first governed decision slice

## 5.2 Scope of Ownership

### AI Components

* finance-agent
* risk-agent
* cogitator-core adapter / reasoning flow
* evidence selection logic
* reasoning summary formatter
* agent evaluation harness
* prompt/policy bindings สำหรับ domain agents

### AI Behavioral Contracts

* proposal schema
* review schema
* confidence/risk scoring outputs
* evidence_refs contract
* refusal/escalation behavior
* uncertainty signaling

## 5.3 Key Deliverables

### Deliverable A-1 — Finance Agent MVP

ความสามารถขั้นต่ำ

* รับ task budget assessment
* ดึง context ที่เกี่ยวข้อง
* สร้าง proposal พร้อม

  * recommendation
  * confidence
  * reasoning_summary
  * evidence_refs
  * estimated impact

### Deliverable A-2 — Risk Agent MVP

ความสามารถขั้นต่ำ

* รับ proposal จาก finance-agent
* ประเมิน risk level
* คืน review outcome
* raise escalation เมื่อเกิน risk band

### Deliverable A-3 — Cogitator Decision Synthesis

รวมผลจากหลาย agent เป็น decision artifact ที่สอดคล้องกับ schema กลาง

### Deliverable A-4 — Evaluation Harness

วัดอย่างน้อย

* proposal completeness
* policy compatibility
* hallucination/missing evidence rate
* review consistency
* escalation precision

## 5.4 Work Breakdown

### Sprint Block A-A

* ล็อก input/output contract ของ agents
* สร้าง static rule-assisted prototype
* เตรียม test cases 20–50 เคส

### Sprint Block A-B

* สร้าง finance-agent
* สร้าง risk-agent
* สร้าง response normalization layer
* บังคับ evidence_refs และ reasoning_summary schema

### Sprint Block A-C

* เชื่อม Cogitator synthesis
* เชื่อม policy-aware constraints
* เติม uncertainty handling
* รัน eval suite และปรับ thresholds

## 5.5 AI Design Constraints

* ห้ามคืน output ที่ไม่ผ่าน schema normalization
* ต้องรองรับ “insufficient evidence”
* ต้องรองรับ “escalate to human”
* ห้าม autonomous approve ข้าม policy decision
* output สำคัญต้อง deterministic ในระดับ schema แม้ reasoning internals จะต่างได้

## 5.6 Definition of Done

* finance-agent และ risk-agent ผ่าน contract tests
* decision synthesis สร้าง artifact ได้ครบ field บังคับ
* eval harness รายงาน metric ได้
* AI outputs ผูก trace_id / case_id / decision_id ได้
* มี fallback behavior เมื่อ context ไม่พอหรือ confidence ต่ำ

---

# 6. Security Team Playbook

## 6.1 Mandate

สร้าง **security baseline + trust controls** สำหรับ use case และ platform foundation

## 6.2 Scope of Ownership

### Identity & Access

* workload identity model
* user authN/authZ
* service-to-service auth
* agent identity registration baseline
* scopes and RBAC

### Secrets & Key Management

* secret delivery pattern
* signing key policy
* key rotation design
* Vault integration model

### Trust Controls

* event signature verification policy
* lineage-required event classification
* data classification model
* restricted payload handling
* quarantine criteria

## 6.3 Key Deliverables

### Deliverable S-1 — Identity & Scope Matrix

อย่างน้อยต้องกำหนด

| Subject       | Scope                     |
| ------------- | ------------------------- |
| requestor     | budget:submit             |
| finance-agent | decision:propose          |
| risk-agent    | decision:review           |
| cogitator     | decision:synthesize       |
| policy-engine | policy:evaluate           |
| CFO           | decision:approve          |
| auditor       | audit:read, lineage:proof |

### Deliverable S-2 — Workload Identity Pattern

กำหนดว่า service/agent ทุกตัว authenticate กันอย่างไร

### Deliverable S-3 — Signing Policy

กำหนดว่า event ประเภทไหนต้อง sign และ verify ก่อน commit

### Deliverable S-4 — Data Classification Standard

อย่างน้อยมี

* internal
* confidential
* restricted

พร้อมกฎว่า restricted payload ต้องใช้ reference แทน raw payload

## 6.4 Work Breakdown

### Sprint Block S-A

* ล็อก auth architecture
* ล็อก scopes
* ล็อก secret handling
* ล็อก signing boundaries

### Sprint Block S-B

* เชื่อม OIDC/SSO สำหรับ human users
* เชื่อม workload identity สำหรับ services
* ออก policy สำหรับ service-to-service authorization

### Sprint Block S-C

* ทำ signature verification path
* ทำ quarantine rules สำหรับ invalid lineage/signature
* review network policy baseline กับ DevOps

## 6.5 Definition of Done

* human users login/authorize ตาม role ได้
* services ใช้ workload identity ได้
* material events ที่กำหนดถูก sign/verify ได้
* secret ไม่ถูก hardcode ใน repo/manifests
* restricted payload path ใช้ reference model แล้ว
* มี incident path สำหรับ invalid signature / unauthorized call

---

# 7. DevOps Team Playbook

## 7.1 Mandate

สร้าง **delivery and runtime operations model** ให้ระบบ deploy, release, observe, recover ได้จริง

## 7.2 Scope of Ownership

### Environment & Delivery

* cluster environments
* CI pipelines
* image build/sign/publish
* GitOps deployment
* release promotion
* rollback flow

### Runtime Operations

* namespaces
* ingress/service exposure
* config/secrets integration
* autoscaling
* resource controls
* monitoring stack integration

### SRE-Adjacent Operations

* runbooks
* alert routing
* backup/restore baseline
* deployment verification
* operational dashboards

## 7.3 Key Deliverables

### Deliverable D-1 — Environment Model

อย่างน้อยต้องมี

* local/dev
* integration
* staging
* production

### Deliverable D-2 — GitOps Delivery Path

flow มาตรฐาน

* PR merge
* CI test/build
* image publish/sign
* manifest update
* Argo CD/Flux sync
* post-deploy verification

### Deliverable D-3 — Namespace & Policy Baseline

* `asi-system`
* `asi-agents`
* `asi-reasoning`
* `asi-governance`
* `asi-lineage`
* `asi-observability`

### Deliverable D-4 — Runtime Observability Integration

* logs
* metrics
* traces
* alerting
* deploy metadata correlation

## 7.4 Work Breakdown

### Sprint Block D-A

* provision environments
* configure registries
* setup GitOps
* base ingress/certs
* secret integration path

### Sprint Block D-B

* deploy shared components
* wire observability stack
* set autoscaling/resource requests
* define rollout strategies

### Sprint Block D-C

* add runbooks
* add backup/restore drills
* add smoke tests
* add release gates and rollback automation

## 7.5 Definition of Done

* ทุก service deploy ผ่าน GitOps ได้
* rollback ได้อย่างน้อย 1 version
* traces/metrics/logs มองเห็นข้าม services ได้
* environment promotion ทำได้แบบมีวินัย
* critical alerts เข้า channel/incident flow ที่กำหนด
* มี smoke test หลัง deploy

---

# 8. Shared Milestones by Team

## Milestone M1 — Architecture Baseline Locked

**Owner:** Platform + Security + Backend + DevOps
ต้องมี

* repo structure
* service template
* auth model baseline
* event envelope v1
* namespace model
* service catalog schema

## Milestone M2 — Functional Flow Live in Integration

**Owner:** Backend + AI + Platform
ต้องมี

* submit request
* finance proposal
* risk review
* decision synthesis
* approval request
* status query

## Milestone M3 — Trust Flow Live

**Owner:** Security + Platform + Backend
ต้องมี

* signed material events
* lineage validation
* append-only commit
* proof retrieval

## Milestone M4 — Production Readiness Gate

**Owner:** DevOps + Security + All Teams
ต้องมี

* observability baseline
* rollback path
* failure drills
* policy fail-closed behavior
* integration/load tests

---

# 9. RACI Summary

| Workstream             | Platform | Backend | AI | Security | DevOps |
| ---------------------- | -------- | ------- | -- | -------- | ------ |
| Service template       | R        | C       | C  | C        | C      |
| Business APIs          | C        | R       | C  | C        | C      |
| Agent runtimes         | C        | C       | R  | C        | C      |
| Event envelope         | R        | C       | C  | C        | C      |
| Identity/scopes        | C        | C       | C  | R        | C      |
| Signing/quarantine     | C        | C       | C  | R        | C      |
| Kubernetes/GitOps      | C        | C       | C  | C        | R      |
| Observability plumbing | C        | C       | C  | C        | R      |
| Decision schema        | C        | R       | R  | C        | C      |
| Policy integration     | C        | R       | C  | R        | C      |

**R = Responsible, C = Contributing**

---

# 10. Cross-Team Interfaces

## 10.1 Platform ↔ Backend

* service template
* event publishing SDK
* error contract
* service catalog onboarding

## 10.2 Backend ↔ AI

* agent input/output schema
* decision artifact contract
* review/proposal lifecycle
* fallback behavior

## 10.3 Backend ↔ Security

* auth scopes
* approval authority checks
* event signing boundaries
* audit access control

## 10.4 Platform ↔ DevOps

* config model
* health probes
* deployment packaging
* telemetry hooks

## 10.5 Security ↔ DevOps

* secret injection
* workload identity runtime
* network policies
* cert rotation

---

# 11. Epic Breakdown

## Epic E1 — Shared Platform Foundation

**Owner:** Platform
Stories

* service template
* event SDK
* error schema
* service catalog

## Epic E2 — Budget Request Workflow

**Owner:** Backend
Stories

* request intake
* task creation
* decision persistence
* approval API

## Epic E3 — Agent Decisioning

**Owner:** AI
Stories

* finance-agent
* risk-agent
* synthesis flow
* evaluation harness

## Epic E4 — Trust & Security Baseline

**Owner:** Security
Stories

* identity
* scopes
* signing policy
* quarantine policy

## Epic E5 — Delivery & Runtime Operations

**Owner:** DevOps
Stories

* cluster/env setup
* GitOps
* observability
* rollback/runbooks

---

# 12. Acceptance Gates

## Gate G1 — Development Complete

* APIs + agents compile and run
* contracts frozen for v1
* test fixtures exist

## Gate G2 — Integration Complete

* end-to-end happy path passes
* 3 key failure paths pass
* event schemas validate

## Gate G3 — Security Complete

* scopes enforced
* secrets externalized
* signed events verified
* restricted payloads handled safely

## Gate G4 — Operational Complete

* dashboards available
* alerts wired
* rollback tested
* smoke tests green

## Gate G5 — Governance Complete

* policy threshold enforced
* human approval required when applicable
* decision artifact queryable
* lineage proof retrievable

---

# 13. Key Risks by Team

## Platform Risks

* over-engineering shared frameworks too early
* template rigidity จนขวาง delivery
* SDK abstraction หนาเกินไป

## Backend Risks

* business logic กระจายหลาย service เกินจำเป็น
* approval logic ซ้ำกับ policy logic
* state transitions ไม่ชัด

## AI Risks

* outputs ไม่ stable ตาม schema
* evidence refs ไม่ครบ
* confidence/risk ไม่ calibrate

## Security Risks

* auth model ซับซ้อนเกิน phase แรก
* signing path เพิ่ม latency มากเกิน
* scope design หยาบเกินจนควบคุมไม่ได้

## DevOps Risks

* environments มากเกินก่อนระบบนิ่ง
* observability ติดตั้งแต่ไม่มี semantic signals
* GitOps flow ช้าเกินทีมหลีกเลี่ยง

---

# 14. Recommended Team Cadence

## Weekly Architecture Sync

เข้าร่วมโดย leads จากทุกทีม
ตัดสินใจเรื่อง

* contracts
* schema changes
* cross-team blockers
* ADR impacts

## Twice-Weekly Integration Review

เน้น

* API/event contract mismatches
* payload samples
* environment issues
* release readiness

## End-of-Sprint Demo

ต้อง demo ได้อย่างน้อย

* 1 functional flow
* 1 failure flow
* 1 observability/audit view

---

# 15. First 30 Days Plan

## Days 1–10

* lock contracts
* create service template
* setup cluster/env/GitOps
* define scopes and identities
* define decision artifact schema

## Days 11–20

* build request intake + decision APIs
* build finance/risk agents
* wire event flow
* wire observability baseline

## Days 21–30

* add policy enforcement
* add signature/lineage path
* add approval UI/backend
* run end-to-end integration demo

---

# 16. Definition of Program Success

โปรแกรมนี้ถือว่าเริ่มสำเร็จเมื่อทุกทีมร่วมกันทำให้เกิดสิ่งต่อไปนี้ได้

* request ถูก submit ได้จาก UI/API
* AI agents สร้าง proposal/review ได้
* policy threshold บังคับ human approval ได้
* decision artifact query ได้
* lineage proof ดึงได้
* ระบบ deploy ผ่าน GitOps ได้
* logs/traces/metrics เชื่อมกันได้
* invalid lineage หรือ unauthorized action ถูก block ได้

---

# 17. Final Operating Guidance

หลักสำคัญของ implementation รอบแรกคือ

## ทำให้ “เล็กแต่ครบ”

อย่าเริ่มจาก 100 services
เริ่มจาก flow เดียวที่พิสูจน์ architecture แกนได้ครบ

## ทำให้ “contract ชัดก่อน code โต”

contract แตกทีหลังยากกว่าสร้างช้าตอนแรก

## ทำให้ “observability และ governance มาก่อน optimization”

ระบบ AI-native ที่มองไม่เห็นและควบคุมไม่ได้ จะไป production ไม่ได้

## ทำให้ “ทีมเข้าใจ boundary ของตัวเอง”

ASI จะสำเร็จเมื่อ Platform, Backend, AI, Security, DevOps ต่อกันได้แบบมีวินัย ไม่ใช่ทำทุกอย่างปนกัน.
