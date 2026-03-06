# ASI ADR-to-Implementation Mapping (PMO / Architecture Board Edition)

เอกสารนี้แปลง ADR เป็นแผนปฏิบัติการระดับองค์กร โดยจัดเป็น
- Epics
- Work Packages
- Acceptance Criteria
- Owner Teams

เพื่อใช้วาง roadmap, quarterly planning และ governance review อย่างเป็นทางการ

## Program Structure
- **H1 (Foundation):** Platform spine, trust baseline, contract governance
- **H2 (Governed Scale):** Decision artifact lifecycle, policy enforcement, observability completeness
- **H3 (Operational Maturity):** Drift/intervention excellence, optimization, federated operating model

---

## Mapping Summary by Workstream

### WS-01: Target Architecture & Planes (ADR-001, 002, 003)
**Epic E1: Establish AI Organization OS Reference Model**
- **WP1.1** Define control/data/trust plane responsibility matrix
- **WP1.2** Publish interaction contracts across planes
- **WP1.3** Create trust anchor operating model (GenesisCore)

**Acceptance Criteria**
- Approved enterprise architecture document with plane boundaries
- Cross-plane request/event patterns documented and reviewed
- Trust plane runbook (HA, replay, audit) published

**Owner Teams**
- Chief Architect (lead), Platform Engineering, Security, Governance

---

### WS-02: Coordination & Messaging Fabric (ADR-004, 005, 006, 026, 027)
**Epic E2: Deliver Governed Event Backbone (AetherBus)**
- **WP2.1** Provision NATS JetStream clusters with HA topology
- **WP2.2** Define event subjects, retention tiers, and replay policy
- **WP2.3** Implement idempotent consumer SDK patterns + dedup keys
- **WP2.4** Enable mandatory DLQ + quarantine flows with operator console
- **WP2.5** Define sync API guardrails (control/query/approval only)

**Acceptance Criteria**
- 99.9% message durability SLO for material streams
- All material consumers pass idempotency conformance tests
- DLQ/quarantine flow exercised in game day and signed off
- No net-new synchronous orchestration in execution path without exception approval

**Owner Teams**
- Platform Engineering (lead), Application Engineering, Security, SRE

---

### WS-03: Contracts, Catalog, and Boundaries (ADR-007, 008, 009)
**Epic E3: Institutionalize Contract-First & Service Governance**
- **WP3.1** Enforce schema-first CI gates (OpenAPI/AsyncAPI/Protobuf)
- **WP3.2** Launch canonical service catalog with ownership + SLO metadata
- **WP3.3** Create agent-to-service boundary guideline and onboarding playbook

**Acceptance Criteria**
- 100% production services listed in catalog with active owner
- Contract checks required in CI for all deployable services
- Agent/service mapping reviewed for top 10 critical domains

**Owner Teams**
- Chief Architect (lead), Platform Engineering, Domain Engineering Managers

---

### WS-04: Identity, Lineage, and Accountability (ADR-010, 011, 012, 013, 025)
**Epic E4: Build Verifiable Decision Chain**
- **WP4.1** Roll out workload + agent identity issuance and rotation
- **WP4.2** Implement signed lineage-bound event envelope standard
- **WP4.3** Implement append-only history + projected state pattern library
- **WP4.4** Standardize Decision Artifact schema + lifecycle states
- **WP4.5** Enforce end-to-end trace/correlation/causation identifiers

**Acceptance Criteria**
- 100% material events carry required hashes/signatures/IDs
- Decision Artifact exists for all high-impact decisions
- Replay + lineage verification pass for golden test scenarios
- Audit can trace API request to decision to execution to ledger commit

**Owner Teams**
- Security (identity/signature lead), AI Systems, Data Platform, Governance

---

### WS-05: Governance and Human Oversight (ADR-014, 015, 016, 017, 018, 029)
**Epic E5: Operationalize Executable Governance**
- **WP5.1** Implement policy-as-code engine integration in control plane
- **WP5.2** Define high-risk action taxonomy + sovereign approval policy
- **WP5.3** Implement fail-closed controls for sensitive action classes
- **WP5.4** Build Resonance Drift detectors + policy/behavior drift dashboards
- **WP5.5** Implement intervention ladder state machine + operator UX
- **WP5.6** Stand up continuous governance forums and review cadence

**Acceptance Criteria**
- Policy bundles are versioned, tested, and rollback-capable
- High-risk actions cannot execute without human oversight where mandated
- Fail-closed paths tested in chaos drills
- Drift-to-intervention MTTD/MTTR tracked and trending down
- Architecture board cadence and minutes published per cycle

**Owner Teams**
- Governance/Compliance (lead), Security, AI Systems, Platform, SRE

---

### WS-06: Runtime Platform and Language Stack (ADR-019, 020, 021)
**Epic E6: Build Runtime Substrate for Mixed Workloads**
- **WP6.1** Standardize Kubernetes baseline (multi-cluster, namespace policy, GitOps)
- **WP6.2** Define runtime profiles (control, reasoning, messaging, trust, observability)
- **WP6.3** Implement scheduling classes/node pools per runtime profile
- **WP6.4** Establish Python/Rust engineering standards and interface contracts

**Acceptance Criteria**
- All production workloads run on approved Kubernetes baseline
- Runtime-profile placement policy enforced by admission controls
- Python↔Rust integration guidelines adopted in top critical services
- Capacity and cost dashboards available by runtime profile

**Owner Teams**
- Platform Engineering (lead), DevEx, AI Systems, FinOps

---

### WS-07: Data Layer Boundaries (ADR-022, 023, 024)
**Epic E7: Enforce Data System-of-Record Discipline**
- **WP7.1** Establish PostgreSQL baseline schemas for transactional + ledger-adjacent use
- **WP7.2** Define Redis usage guardrails and TTL/invalidation controls
- **WP7.3** Implement dedicated vector infrastructure with sync pipelines
- **WP7.4** Data classification and residency policy mapping per store type

**Acceptance Criteria**
- System-of-record classifications completed for all critical entities
- Redis contains no material governed decision source-of-truth data
- Embedding sync jobs measurable and recoverable with lineage
- Data policy controls audited quarterly

**Owner Teams**
- Data Platform (lead), Platform Engineering, Security, Governance

---

### WS-08: Delivery Strategy and Ownership Model (ADR-028, 030)
**Epic E8: Execute Vertical Slice with Clear Ownership**
- **WP8.1** Launch Governed Budget Reallocation vertical slice as proving ground
- **WP8.2** Assign RACI by architecture boundary (CTO/Chief Architect/Platform/AI/Security/GRC)
- **WP8.3** Define graduation criteria from vertical slice to scaled rollout

**Acceptance Criteria**
- Vertical slice hits target KPIs (decision quality, cycle time, auditability)
- Ownership matrix approved and communicated organization-wide
- Scale-out plan approved with dependency/risk register

**Owner Teams**
- CTO Office (lead), Chief Architect, PMO, All domain leads

---

## Cross-ADR Milestone Plan (Suggested)

### Milestone M1 — Architecture Foundation (Q1)
- Complete E1, E2 (core), E3 (governance gates)
- Exit criteria: plane model approved, event backbone live, contract/catalog controls active

### Milestone M2 — Trust & Governance Activation (Q2)
- Complete E4 + E5 (core controls)
- Exit criteria: lineage-signed material path + policy-as-code + fail-closed + human oversight live

### Milestone M3 — Production Vertical Slice (Q3)
- Complete E6 + E7 + E8 (vertical slice)
- Exit criteria: governed budget reallocation in production with SLO and audit evidence

### Milestone M4 — Enterprise Scale-Out (Q4)
- Expand to additional domains with continuous architecture governance
- Exit criteria: 3+ domains onboarded, drift/intervention metrics stable, review process institutionalized

---

## PMO Tracking Fields (Template)
ใช้ fields ต่อไปนี้ต่อ Epic/Work Package ในระบบ PMO:
- ADR Reference(s)
- Epic ID / WP ID
- Business Objective
- Scope (In/Out)
- Dependencies
- Risks & Mitigations
- Owner Team / DRI
- Start Date / Target Date
- KPI / SLO Impact
- Governance Gate Required (Y/N)
- Evidence Links (Design review, test report, runbook, audit artifact)
- Current Status (Not Started / In Progress / Blocked / Completed)

---

## Governance Review Cadence (Recommended)
- **Weekly:** Delivery sync per workstream
- **Bi-weekly:** Architecture decision & exception review
- **Monthly:** Security + governance control effectiveness review
- **Quarterly:** ADR refresh + roadmap rebalance + operating model adjustment

เอกสารนี้ตั้งใจให้ใช้เป็น baseline สำหรับการขับเคลื่อนงานจริง และควรปรับรายละเอียดตาม domain-specific constraints ของแต่ละสายธุรกิจ
