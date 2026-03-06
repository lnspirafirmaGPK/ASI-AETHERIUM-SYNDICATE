# ASI Architecture Decision Records (ADR)
## Decision Log Set v1.0

เอกสารนี้เป็นชุด **Architecture Decision Records (ADR) 30 ฉบับ (ADR-001 ถึง ADR-030)** สำหรับล็อก design choices ระดับองค์กรของ ASI เพื่อใช้งานร่วมกันระหว่าง CTO, Chief Architect, Platform Engineering, Security, AI Systems, DevOps และ Governance/Compliance

---

## วิธีอ่าน ADR ชุดนี้

โครงสร้างมาตรฐานของแต่ละ ADR:
1. **ID**
2. **Title**
3. **Status**
4. **Context**
5. **Decision**
6. **Consequences**

สถานะที่ใช้:
- **Accepted** = ตกลงใช้เป็น baseline architecture
- **Proposed** = เสนอไว้แต่ยังรอ proof เพิ่ม
- **Deferred** = รับรู้ไว้แต่ยังไม่ตัดสินใน phase แรก

---

## ADR-001 — Adopt AI Organization OS as the Target Architecture
**Status:** Accepted

**Context**  
องค์กรต้องการยกระดับ AI จาก productivity tooling ไปสู่ระบบที่มีบทบาทใน operations, coordination, decision support และ governed autonomy ได้จริง

**Decision**  
ASI นิยาม target state เป็น **AI Organization Operating System** ไม่ใช่ AI app, assistant platform หรือ agent orchestration framework ทั่วไป

**Consequences**
- ออกแบบ architecture ในระดับองค์กร ไม่ใช่ feature level
- แยก control plane, trust plane, governance plane อย่างชัดเจน
- complexity เพิ่มขึ้น แต่ strategic positioning ชัดขึ้น
- เอกสาร/service model/policy model ต้อง formal มากขึ้น

## ADR-002 — Separate Control Plane from Data Plane
**Status:** Accepted

**Context**  
AI-native enterprise มีทั้ง workload ที่ “ควบคุม” และ “ประมวลผล”; ถ้าไม่แยกจะ coupling สูงและ governance บิดเบี้ยว

**Decision**  
แยก **Control Plane** ออกจาก **Data Plane** อย่างชัดเจน

**Consequences**
- Control plane: policy, scheduling, authority, approvals, lifecycle
- Data plane: execution, reasoning, events, search, memory
- team ownership ชัดขึ้น
- topology แยก failure domains และต้องสังเกต cross-plane interactions

## ADR-003 — Introduce a Dedicated Trust Plane
**Status:** Accepted

**Context**  
identity, signature, lineage, proofs, replay ไม่ควรกระจายอยู่ใน business services

**Decision**  
สร้าง **Trust Plane** โดยมี GenesisCore เป็น trust anchor

**Consequences**
- lineage validation และ event commit มีมาตรฐานเดียว
- security posture แข็งขึ้น
- cost/latency เพิ่มในบางเส้นทาง
- ต้องมี HA/replay/audit เฉพาะ trust plane

## ADR-004 — Use Event-Driven Coordination as the Primary Inter-Service Pattern
**Status:** Accepted

**Context**  
inter-agent และ cross-domain workflows มี fan-out/fan-in สูง ไม่เหมาะกับ synchronous RPC-only

**Decision**  
ใช้ **event-driven coordination** เป็นรูปแบบหลักของ inter-service และ inter-agent interaction

**Consequences**
- AetherBus เป็น critical platform component
- ต้องมี schema registry, delivery rules, DLQ, retry budgets
- async reasoning/orchestration ดีขึ้น
- debugging ยากขึ้นหาก observability ไม่ครบ

## ADR-005 — Use Synchronous APIs Only for Control, Query, and Approval Paths
**Status:** Accepted

**Context**  
บางกระบวนการต้องการ deterministic response (admin actions, governance checks, approvals, queries)

**Decision**  
ใช้ synchronous APIs เฉพาะ control actions, queries, human approval และ low-latency coordination ที่จำเป็น

**Consequences**
- API surface ชัดขึ้น
- ลด chatty sync dependencies ใน execution path
- contract แยกชัด command/query/event
- approval path ออกแบบง่ายขึ้น

## ADR-006 — Use NATS JetStream as the Baseline Messaging Fabric
**Status:** Accepted

**Context**  
ต้องการ pub/sub, replay, subject routing, lightweight ops และเหมาะกับ distributed services/agents

**Decision**  
AetherBus baseline ใช้ **NATS JetStream**

**Consequences**
- รองรับ replay/streaming/queue semantics เหมาะกับ platform
- ต้องลงทุน subject governance และ consumer patterns
- event log semantics เชิงลึกมากอาจต้องเสริม
- ต้องมี JetStream clustering expertise

## ADR-007 — Use Contract-First Service Design
**Status:** Accepted

**Context**  
ระบบ 100+ services และ multi-agent domains จะล้มเหลวหาก implementation-first

**Decision**  
ทุก service ใช้ **contract-first design**

**Consequences**
- ต้องมี OpenAPI/Protobuf/AsyncAPI/schema ก่อน build
- ลด ambiguity ระหว่างทีม
- early design overhead เพิ่ม
- integration/change management ดีขึ้น

## ADR-008 — Define a Canonical Service Catalog for All Deployable Units
**Status:** Accepted

**Context**  
service explosion เป็นความเสี่ยงหลักของ microservices + agents

**Decision**  
ทุก deployable unit ต้องลงทะเบียนใน **ASI Service Catalog**

**Consequences**
- แยก service จริงออกจาก module/library ได้
- owner/interface/SLO/data classification/lineage obligations ชัด
- governance/review ง่ายขึ้น
- ต้องมีวินัย catalog maintenance

## ADR-009 — Treat Agents as Decision Boundaries, Not Equivalent to Microservices
**Status:** Accepted

**Context**  
agent และ microservice เป็นคนละ abstraction

**Decision**  
นิยาม: **agent = decision/behavior boundary**, **service = software/runtime boundary**

**Consequences**
- agent หนึ่งใช้หลาย services ได้
- service หนึ่งรองรับหลาย agent runtimes ได้
- decomposition มีวินัยขึ้น
- ต้องอธิบาย runtime mapping ให้ชัด

## ADR-010 — Require Identity for Every Agent and Material Service
**Status:** Accepted

**Context**  
autonomy ที่ไม่มี identity จะพังด้าน authority, audit, trust

**Decision**  
ทุก agent/material service ต้องมี workload identity และ/หรือ agent identity

**Consequences**
- authorization ใช้งานได้จริง
- signed events มี actor binding
- onboarding ซับซ้อนขึ้น
- ต้องมี identity lifecycle/rotation

## ADR-011 — Make Material Events Lineage-Bound and Signed
**Status:** Accepted

**Context**  
ต้องการ verifiable accountability สำหรับ events ที่มีผลต่อ decision/approval/policy/override/execution

**Decision**  
material events ทุกตัวต้องมี lineage hash, parent hash, payload hash, signature, trace identifiers

**Consequences**
- auditability สูงขึ้นมาก
- throughput/storage overhead เพิ่ม
- high-value decisions เชื่อถือได้ขึ้น
- ต้องบริหาร signing/verification cost

## ADR-012 — Adopt Append-Only Event History with Evolvable Business State
**Status:** Accepted

**Context**  
ธุรกิจต้องแก้ไขข้อมูลได้ แต่ rewrite history ทำลาย trust และ replayability

**Decision**  
ใช้แนวทาง **history immutable, state evolvable**

**Consequences**
- correction ต้องออกเป็น new event
- replay/audit ทำได้
- state model ต้องรองรับ snapshot/projected state
- mindset ทีมต้องเปลี่ยนจาก update-in-place

## ADR-013 — Use Decision Artifact as the Canonical Unit of Governed Decisioning
**Status:** Accepted

**Context**  
ต้องมี object กลางสำหรับติดตาม decision, authority flow, audit

**Decision**  
ทุก material decision ต้องสร้าง **Decision Artifact**

**Consequences**
- approval/review/override/execution เชื่อมกันได้
- dashboard/audit/governance ใช้ object เดียวกัน
- data model ชัดขึ้น
- ต้องลงทุน schema/lifecycle ของ artifact

## ADR-014 — Use Human Sovereign Oversight for High-Risk and Policy-Override Actions
**Status:** Accepted

**Context**  
บาง decision ไม่ควรจบที่ AI แม้ confidence สูง

**Decision**  
high-risk decisions, policy overrides, threshold-breaching actions ต้องมี human sovereign oversight

**Consequences**
- compliance และ executive trust สูงขึ้น
- autonomy ถูกจำกัดในบางโดเมน
- approval latency เพิ่มในบางกรณี
- intervention UX/dashboard ต้องชัดเจน

## ADR-015 — Fail Closed When Governance or Policy Evaluation Is Unavailable for Sensitive Actions
**Status:** Accepted

**Context**  
หาก governance controls unavailable แล้วปล่อย sensitive actions execute ต่อ จะเกิด systemic risk

**Decision**  
เมื่อ governance-critical services unavailable ให้ fail closed สำหรับ sensitive/high-impact actions

**Consequences**
- ปลอดภัยกว่า
- availability ของบาง critical workflows ลดลง
- ต้องมี degraded-mode definitions ชัด
- business stakeholders ต้องรับ trade-off

## ADR-016 — Use Policy-as-Code for Executable Governance
**Status:** Accepted

**Context**  
governance ในเอกสารหรือ prompt อย่างเดียว enforce ไม่ได้จริง

**Decision**  
ใช้ **policy-as-code** เป็น baseline executable governance

**Consequences**
- policy evaluation ทำซ้ำได้
- thresholds/constraints versioned ได้
- ต้องมี policy lifecycle/testing/rollout/rollback
- policy debt อาจเพิ่มเร็ว

## ADR-017 — Introduce Drift Monitoring as a First-Class Governance Capability
**Status:** Accepted

**Context**  
มีความเสี่ยง policy drift, behavioral drift, concept drift, alignment drift

**Decision**  
ให้ **Resonance Drift** เป็น capability หลักใน governance plane

**Consequences**
- detect anomaly/drift ต่อเนื่องได้
- ต้องบริหาร false positives/negatives
- compute/analytics overhead เพิ่ม
- intervention design ต้องโตตาม detector quality

## ADR-018 — Use Intervention Ladder Instead of Binary Alert-or-Shutdown Logic
**Status:** Accepted

**Context**  
alert-or-shutdown อย่างเดียวไม่ practical สำหรับ enterprise operations

**Decision**  
ใช้ intervention ladder: observe → alert → require review → degrade autonomy → safe mode → quarantine → shutdown

**Consequences**
- operational flexibility สูง
- response model สมจริง
- governance logic ซับซ้อนขึ้น
- dashboard ต้องแสดง intervention state ชัด

## ADR-019 — Use Kubernetes as the Baseline Runtime Platform
**Status:** Accepted

**Context**  
ต้องการ cloud-native orchestration, isolation, autoscaling, service discovery, policy enforcement

**Decision**  
baseline deployment platform คือ **Kubernetes**

**Consequences**
- รองรับ multi-service/multi-agent ได้ดี
- ต้องมี operational maturity สูง
- stateful workloads ต้องออกแบบรอบคอบ
- GitOps/policy enforcement ทำได้ดี

## ADR-020 — Partition Workloads by Runtime Profile, Not Only by Business Domain
**Status:** Accepted

**Context**  
workloads มี resource profile ต่างกันมาก (agents, reasoning, messaging, lineage, observability)

**Decision**  
วาง deployment topology โดยยึด **runtime profile** เป็นหลัก ไม่ใช่ business domain อย่างเดียว

**Consequences**
- scheduling/scaling มีประสิทธิภาพขึ้น
- node pools/namespaces ชัดขึ้น
- optimize infra cost ได้ดี
- diagrams ต้องสื่อสารสองมิติ (domain + runtime)

## ADR-021 — Standardize on Python for Control/Application Services and Rust for High-Performance Components
**Status:** Accepted

**Context**  
ต้อง balance ระหว่าง development speed และ performance-critical workloads

**Decision**  
ใช้ Python สำหรับ control/application services และ Rust สำหรับ hashing/vector compute/low-level performance paths

**Consequences**
- พัฒนา business/control logic เร็วขึ้น
- performance path แข็งแรง
- polyglot complexity เพิ่ม
- ต้องมี interface standards (gRPC/FFI/PyO3)

## ADR-022 — Use PostgreSQL as the Core Transactional and Ledger-Adjacent Store
**Status:** Accepted

**Context**  
ต้องมีระบบข้อมูลที่เชื่อถือได้สำหรับ transactional data, identity, approvals และ append-only ledger-adjacent storage

**Decision**  
ใช้ **PostgreSQL** เป็น core transactional + ledger-adjacent baseline

**Consequences**
- ACID เหมาะกับ governance-heavy systems
- ecosystem แข็งแรง
- scale-out write-heavy ต้องวางแผนดี
- object archive/vector store ต้องแยกตาม workload

## ADR-023 — Use Redis for Short-Lived Coordination and High-Speed Cache Only
**Status:** Accepted

**Context**  
Redis มีประโยชน์ด้าน latency แต่ไม่ควรเป็น source of truth ของ governed decisions

**Decision**  
ใช้ Redis เฉพาะ cache, ephemeral coordination, transient state, high-speed lookup

**Consequences**
- latency ดีขึ้น
- ลด misuse ใน critical persistence
- data boundaries ชัด
- ต้องกำกับ TTL/invalidation อย่างรัดกุม

## ADR-024 — Use Dedicated Vector Infrastructure for Semantic Context, Not as a Replacement for System of Record
**Status:** Accepted

**Context**  
semantic retrieval สำคัญ แต่ vector DB ไม่ควรแทน transactional/audit stores

**Decision**  
ใช้ vector infrastructure สำหรับ embeddings, semantic memory, retrieval, intent vectors เท่านั้น

**Consequences**
- separation of concerns ชัด
- governance over semantic context ง่ายขึ้น
- ลด misuse ของ vector store
- ต้องบริหาร sync ระหว่าง source-of-truth กับ embeddings

## ADR-025 — Require End-to-End Correlation IDs Across APIs, Events, Decisions, and Lineage
**Status:** Accepted

**Context**  
distributed system ที่มี API/events/decisions/ledger commits จะ debug/audit ยากหากไม่มี correlation model เดียวกัน

**Decision**  
material path ต้องมี trace_id, correlation_id, causation_id และ decision_id หรือ case_id ตามบริบท

**Consequences**
- observability/audit แข็งแรงขึ้น
- tracing tooling มีคุณค่าเพิ่ม
- instrumentation effort เพิ่ม
- schema discipline ต้องเข้ม

## ADR-026 — Adopt Idempotent Consumers Instead of Assuming Exactly-Once Transport
**Status:** Accepted

**Context**  
exactly-once transport มักแพงและซับซ้อนเกินความจำเป็นธุรกิจ

**Decision**  
ใช้ at-least-once delivery + idempotent consumers + lineage-aware deduplication

**Consequences**
- operational model practical ขึ้น
- consumers ต้องออกแบบดี
- replay ง่ายขึ้น
- critical business actions ต้องมี idempotency keys เสมอ

## ADR-027 — Introduce Dead-Letter and Quarantine Paths as Mandatory Platform Capabilities
**Status:** Accepted

**Context**  
poison messages, malformed events, invalid lineage, exhausted retries เป็นสิ่งเลี่ยงไม่ได้

**Decision**  
ต้องมีทั้ง dead-letter path (delivery failures) และ quarantine path (trust/governance/integrity violations)

**Consequences**
- failure isolation ดีขึ้น
- security posture ดีขึ้น
- operational tooling ต้องพร้อม
- operator runbooks จำเป็น

## ADR-028 — Start with a Vertical Slice Before Expanding to Full 100+ Service Footprint
**Status:** Accepted

**Context**  
สร้าง platform ทั้งชุดพร้อมกันเสี่ยงสูงด้านเวลา/integration/organizational alignment

**Decision**  
เริ่มจาก vertical slice แรก เช่น Governed Budget Reallocation

**Consequences**
- พิสูจน์ value ได้เร็ว
- architecture assumptions ถูกทดสอบด้วยของจริง
- shared components บางส่วนเป็นแบบ just-enough
- ต้องระวัง prototype decisions แข็งตัวผิดทิศ

## ADR-029 — Make Architecture Governance a Continuous Function, Not a One-Time Review
**Status:** Accepted

**Context**  
ASI เติบโตต่อเนื่องทั้ง services/events/policies/agents/trust rules

**Decision**  
ตั้ง continuous architecture governance ผ่าน review board + ADR process + schema review + service catalog review + policy review

**Consequences**
- architectural integrity ดีขึ้น
- change control มีวินัย
- throughput ของการเปลี่ยนแปลงอาจช้าลง
- ต้องมี lightweight review lanes สำหรับ low-risk changes

## ADR-030 — Define CTO / Chief Architect Ownership Boundaries Explicitly
**Status:** Accepted

**Context**  
ระบบแบบ ASI จะสับสนง่ายหาก ownership เชิงสถาปัตยกรรมและปฏิบัติการไม่ชัด

**Decision**  
กำหนด ownership:
- CTO: strategic technology direction, platform investment, operating model
- Chief Architect: target architecture, standards, domain boundaries, design governance
- Platform Engineering: runtime platform, deployment, reliability
- AI Systems: reasoning, agents, models
- Security: trust model, keys, zero trust, runtime security
- Governance/Compliance: policy controls, audit requirements

**Consequences**
- decision making เร็วขึ้น
- architecture disputes ลดลง
- org design ชัดขึ้น
- ต้องมี forum กลางสำหรับ cross-functional tensions

---

## สรุปแกนหลักที่ ADR ชุดนี้ล็อกไว้แล้ว

1. **Target State:** ASI เป็น AI Organization OS
2. **Platform Structure:** แยก control/data/trust plane และใช้ Kubernetes + event-driven fabric
3. **Trust & Accountability:** signed lineage-bound material events, immutable history + evolvable state, decision artifact
4. **Governance:** policy-as-code, drift monitoring, intervention ladder, human sovereign oversight
5. **Delivery Model:** contract-first, service catalog, idempotent consumers, dead-letter/quarantine, start with vertical slice
