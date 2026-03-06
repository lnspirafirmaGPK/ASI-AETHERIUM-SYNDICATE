# ASI Service Catalog + API/Event Contract Reference Spec (v1)

## 0. วัตถุประสงค์

เอกสารนี้กำหนด 4 สิ่งหลักของ **Aetherium Syndicate Inspectra (ASI)**

1. **Service taxonomy** — ระบบมี service อะไรบ้าง และจัดหมวดอย่างไร
2. **Service catalog schema** — แต่ละ service ต้องมี metadata อะไรบ้าง
3. **API contract model** — service-to-service / human-to-system interfaces
4. **Event contract model** — event-driven communication บน AetherBus + GenesisCore lineage

เอกสารนี้ตั้งใจให้เป็น **implementation-grade reference** ไม่ใช่แค่ conceptual diagram

---

## 1. Architectural Contract Principles

ASI ใช้ 6 หลักการกำกับสัญญาระหว่างระบบ

### 1.1 Contract-first

ทุก service ต้องมีสัญญาที่ชัดเจนก่อน build

- API schema
- event schema
- auth model
- idempotency rules
- error model
- versioning

### 1.2 Control Plane แยกจาก Data Plane

ต้องแยกให้ชัด

#### Control Plane

ระบบที่ “ควบคุม, กำหนดนโยบาย, จัดสรร, อนุมัติ”

#### Data Plane

ระบบที่ “ประมวลผล, รับส่ง event, reasoning, ทำงานจริง”

### 1.3 Identity-bound operations

ทุก operation ต้องผูกกับ

- actor identity
- service identity
- agent identity
- policy scope
- lineage hash

### 1.4 Event-sourced accountability

ทุก decision สำคัญต้องออก event ที่ตรวจสอบย้อนหลังได้

### 1.5 Async-first, sync-where-needed

- ใช้ **event-driven** เป็นหลัก
- ใช้ **synchronous API** เฉพาะเมื่อจำเป็น เช่น query, command acknowledgement, governance approval

### 1.6 Versioned evolution

ทุก API และ Event ต้องมี version ชัดเจน และ backward compatibility policy

---

## 2. Service Domain Taxonomy

ASI แบ่ง service เป็น 8 domains หลัก

| Domain                 | เป้าหมาย                                                   | Plane           |
| ---------------------- | ---------------------------------------------------------- | --------------- |
| Identity & Lineage     | identity, signature, lineage, proof                        | control + trust |
| Reasoning              | reasoning orchestration, synthesis, policy-aware cognition | data            |
| Agent Orchestration    | lifecycle, scheduling, registry, coordination              | control         |
| Department Agents      | domain-specific AI execution                               | data            |
| Communication Fabric   | event transport, routing, queueing, delivery               | data            |
| Data Platform          | memory, embeddings, search, document/data pipelines        | data            |
| Governance & Alignment | policy, drift, ethics, audit, risk enforcement             | control         |
| Observability          | metrics, tracing, audit visibility, cost intelligence      | both            |

---

## 3. Service Types

ทุก service ใน ASI ต้องถูกจัดประเภทก่อน ไม่เช่นนั้นจะเกิด service explosion

| Type              | ความหมาย                                        |
| ----------------- | ----------------------------------------------- |
| core-service      | service กลางของแพลตฟอร์ม                        |
| domain-service    | service เฉพาะ domain                            |
| agent-runtime     | runtime ของ AI agent                            |
| control-service   | orchestration / policy / approval / registry    |
| compute-service   | heavy compute / reasoning / hashing / inference |
| stateful-service  | service ที่ถือ durable state                    |
| stateless-service | scale-out processing service                    |
| async-worker      | background worker / consumer                    |
| gateway-service   | ingress/egress/API edge                         |
| sidecar-runtime   | sidecar ที่ deploy แนบ workload                 |
| library/module    | ไม่ใช่ deployable service                       |

---

## 4. Canonical Service Catalog Schema

ทุก service ต้องลงทะเบียนใน **ASI Service Catalog Registry** ด้วย schema นี้

```yaml
service_id: string
service_name: string
domain: enum
service_type: enum
description: string

plane: [control, data, trust, observability]
criticality_tier: [tier-0, tier-1, tier-2, tier-3]
state_model: [stateless, stateful, append-only, cached, hybrid]
deployment_model: [deployment, statefulset, daemonset, cronjob, job, external]
runtime_language: [python, rust, go, typescript, other]
team_owner: string

interfaces:
  sync_apis:
    - protocol: [http-rest, grpc, graphql]
      name: string
      version: string
  async_topics:
    produces: [string]
    consumes: [string]

identity:
  workload_identity: string
  required_scopes: [string]
  trust_level: [low, medium, high, critical]

data_dependencies:
  databases: [string]
  caches: [string]
  object_stores: [string]
  vector_indexes: [string]

resilience:
  sla_class: [gold, silver, bronze]
  availability_target: string
  rto: string
  rpo: string
  idempotency_required: boolean
  retry_policy: string
  timeout_policy: string
  circuit_breaker: boolean

security:
  data_classification: [public, internal, confidential, restricted]
  encryption_in_transit: boolean
  encryption_at_rest: boolean
  secrets_source: [vault, k8s-secret, external]
  signature_required: boolean
  lineage_required: boolean

observability:
  metrics: [string]
  traces: [string]
  audit_events: [string]
  dashboards: [string]

versioning:
  api_version: string
  event_version: string
  deprecation_policy: string
```

---

## 5. Service Criticality Tiers

| Tier   | ความหมาย                        | ตัวอย่าง                                                |
| ------ | ------------------------------- | ------------------------------------------------------- |
| tier-0 | ระบบแกน ถ้าล่มจะกระทบทั้งองค์กร | aetherbus-gateway, genesis-ledger-writer, policy-engine |
| tier-1 | ระบบสำคัญระดับ domain           | cogitator-core, agent-supervisor, finance-agent         |
| tier-2 | ระบบสนับสนุน                    | semantic-search, trace-analyzer                         |
| tier-3 | ระบบเสริม / offline analytics   | cost-monitor, archive compactor                         |

---

## 6. Canonical Service Catalog

ด้านล่างคือ service catalog ชุดแรกในระดับใช้งานจริง แยกเป็น 8 domains

---

### 6.1 Identity & Lineage Domain

#### 6.1.1 genesis-identity-service

| Field    | Value                                                     |
| -------- | --------------------------------------------------------- |
| Domain   | Identity & Lineage                                        |
| Type     | core-service                                              |
| Plane    | trust/control                                             |
| State    | stateful                                                  |
| Purpose  | จัดการ agent identity, workload identity, key reference   |
| Sync API | gRPC + REST                                               |
| Produces | `identity.agent.registered.v1`, `identity.key.rotated.v1` |
| Consumes | `agent.lifecycle.created.v1`                              |

#### 6.1.2 lineage-hash-service

| Field    | Value                                     |
| -------- | ----------------------------------------- |
| Type     | compute-service                           |
| State    | stateless                                 |
| Purpose  | คำนวณ canonical event hash / payload hash |
| Sync API | gRPC                                      |
| Produces | `lineage.hash.generated.v1`               |

#### 6.1.3 lineage-validator-service

| Field    | Value                                                         |
| -------- | ------------------------------------------------------------- |
| Type     | control-service                                               |
| State    | stateless                                                     |
| Purpose  | ตรวจ parent linkage, ancestry continuity, duplicate detection |
| Sync API | gRPC                                                          |
| Consumes | `lineage.event.submitted.v1`                                  |
| Produces | `lineage.event.validated.v1`, `lineage.validation.failed.v1`  |

#### 6.1.4 signature-engine-service

| Field    | Value                                      |
| -------- | ------------------------------------------ |
| Type     | compute-service                            |
| Purpose  | sign / verify event envelopes ด้วย Ed25519 |
| Sync API | gRPC                                       |
| Produces | `lineage.signature.verified.v1`            |

#### 6.1.5 genesis-ledger-writer

| Field    | Value                                  |
| -------- | -------------------------------------- |
| Type     | stateful-service                       |
| Plane    | trust                                  |
| Purpose  | append-only ledger writer              |
| Sync API | gRPC                                   |
| Consumes | `lineage.event.committed.requested.v1` |
| Produces | `lineage.event.committed.v1`           |

#### 6.1.6 merkle-index-service

| Field    | Value                           |
| -------- | ------------------------------- |
| Type     | async-worker                    |
| Purpose  | สร้าง Merkle index / proof path |
| Consumes | `lineage.event.committed.v1`    |
| Produces | `lineage.proof.generated.v1`    |

#### 6.1.7 lineage-audit-service

| Field    | Value                                            |
| -------- | ------------------------------------------------ |
| Type     | domain-service                                   |
| Purpose  | query proof, replay ancestry, audit trail export |
| Sync API | REST + gRPC                                      |

#### 6.1.8 ledger-replay-service

| Field    | Value                                                      |
| -------- | ---------------------------------------------------------- |
| Type     | async-worker                                               |
| Purpose  | replay event stream เพื่อ rebuild state / verify integrity |
| Consumes | `audit.replay.requested.v1`                                |
| Produces | `audit.replay.completed.v1`                                |

---

### 6.2 Reasoning Domain

#### 6.2.1 cogitator-core

| Field    | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| Type     | core-service                                                     |
| Plane    | data                                                             |
| Purpose  | orchestrate reasoning workflow                                   |
| Sync API | gRPC                                                             |
| Produces | `reasoning.session.started.v1`, `reasoning.session.completed.v1` |

#### 6.2.2 causal-engine

| Field    | Value                                            |
| -------- | ------------------------------------------------ |
| Type     | compute-service                                  |
| Purpose  | causal chain construction / dependency inference |
| Sync API | gRPC                                             |

#### 6.2.3 reasoning-depth-controller

| Field    | Value                                    |
| -------- | ---------------------------------------- |
| Type     | control-service                          |
| Purpose  | บังคับ depth budget และ compute envelope |
| Sync API | gRPC                                     |
| Consumes | `reasoning.session.started.v1`           |

#### 6.2.4 ethics-evaluator

| Field    | Value                           |
| -------- | ------------------------------- |
| Type     | domain-service                  |
| Purpose  | ประเมิน ethical policy fit      |
| Produces | `governance.ethics.assessed.v1` |

#### 6.2.5 alignment-monitor

| Field   | Value                                |
| ------- | ------------------------------------ |
| Type    | control-service                      |
| Purpose | monitor reasoning-policy consistency |

#### 6.2.6 decision-synthesizer

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| Type     | compute-service                             |
| Purpose  | รวม input หลาย agent เป็น decision artifact |
| Produces | `decision.synthesized.v1`                   |

#### 6.2.7 context-graph-service

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Type    | stateful-service                                  |
| Purpose | จัดการ reasoning context graph / dependency graph |

#### 6.2.8 policy-binding-adapter

| Field   | Value                                                    |
| ------- | -------------------------------------------------------- |
| Type    | control-service                                          |
| Purpose | แปลง governance rules เป็น runtime reasoning constraints |

---

### 6.3 Agent Orchestration Domain

#### 6.3.1 agent-registry

| Field   | Value                                                           |
| ------- | --------------------------------------------------------------- |
| Type    | core-service                                                    |
| Plane   | control                                                         |
| Purpose | register agent metadata, capabilities, version, authority scope |

#### 6.3.2 agent-spawner

| Field   | Value                      |
| ------- | -------------------------- |
| Type    | control-service            |
| Purpose | start/scale agent runtimes |

#### 6.3.3 agent-supervisor

| Field   | Value                                  |
| ------- | -------------------------------------- |
| Type    | core-service                           |
| Purpose | health, restart, escalation, safe mode |

#### 6.3.4 task-scheduler

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Type    | control-service                                 |
| Purpose | route tasks to agents ตาม capability and policy |

#### 6.3.5 agent-lifecycle-manager

| Field   | Value                                      |
| ------- | ------------------------------------------ |
| Type    | control-service                            |
| Purpose | create, suspend, retire, quarantine agents |

#### 6.3.6 goal-manager

| Field   | Value                             |
| ------- | --------------------------------- |
| Type    | domain-service                    |
| Purpose | goal decomposition and assignment |

#### 6.3.7 coordination-engine

| Field   | Value                              |
| ------- | ---------------------------------- |
| Type    | core-service                       |
| Purpose | multi-agent workflow orchestration |

#### 6.3.8 agent-memory-service

| Field   | Value                                     |
| ------- | ----------------------------------------- |
| Type    | stateful-service                          |
| Purpose | scoped memory, session state, task memory |

---

### 6.4 Department Agent Domain

#### 6.4.1 finance-agent

#### 6.4.2 legal-agent

#### 6.4.3 hr-agent

#### 6.4.4 strategy-agent

#### 6.4.5 operations-agent

#### 6.4.6 analytics-agent

#### 6.4.7 risk-agent

#### 6.4.8 procurement-agent

#### 6.4.9 supply-chain-agent

#### 6.4.10 customer-intelligence-agent

> agent ทั้งหมดใช้ catalog pattern เดียวกัน

| Field              | Value                                                   |
| ------------------ | ------------------------------------------------------- |
| Type               | agent-runtime                                           |
| Plane              | data                                                    |
| State              | hybrid                                                  |
| Purpose            | domain-specific decisioning and task execution          |
| Sync API           | gRPC optional / internal                                |
| Produces           | `agent.decision.proposed.v1`, `agent.task.completed.v1` |
| Consumes           | `agent.task.assigned.v1`, `agent.review.requested.v1`   |
| Lineage Required   | true                                                    |
| Signature Required | true                                                    |

---

### 6.5 Communication Fabric Domain

#### 6.5.1 aetherbus-gateway

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Type    | core-service                                    |
| Purpose | publish/subscribe gateway + topic authorization |

#### 6.5.2 event-router

| Field   | Value                                    |
| ------- | ---------------------------------------- |
| Type    | core-service                             |
| Purpose | route events ตาม topic, domain, priority |

#### 6.5.3 message-validator

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Type    | control-service                                    |
| Purpose | validate envelope schema, size, signature presence |

#### 6.5.4 priority-queue-service

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Type    | stateful-service                                |
| Purpose | queue prioritization by risk / urgency / domain |

#### 6.5.5 dead-letter-handler

| Field   | Value                                            |
| ------- | ------------------------------------------------ |
| Type    | async-worker                                     |
| Purpose | isolate poison events / retry exhausted messages |

#### 6.5.6 event-archive-service

| Field   | Value                   |
| ------- | ----------------------- |
| Type    | stateful-service        |
| Purpose | long-term event archive |

#### 6.5.7 stream-index-service

| Field   | Value                             |
| ------- | --------------------------------- |
| Type    | async-worker                      |
| Purpose | stream indexing for replay/search |

---

### 6.6 Data Platform Domain

#### 6.6.1 document-ingestion-service

#### 6.6.2 embedding-generator

#### 6.6.3 vector-index-service

#### 6.6.4 semantic-search-service

#### 6.6.5 knowledge-graph-service

#### 6.6.6 data-normalizer

#### 6.6.7 dataset-versioning-service

#### 6.6.8 storage-allocation-service

#### 6.6.9 cache-controller

#### 6.6.10 data-governance-service

---

### 6.7 Governance & Alignment Domain

#### 6.7.1 policy-engine

| Field   | Value                        |
| ------- | ---------------------------- |
| Type    | core-service                 |
| Plane   | control                      |
| Purpose | executable policy evaluation |

#### 6.7.2 resonance-drift-detector

| Field   | Value                                |
| ------- | ------------------------------------ |
| Type    | core-service                         |
| Purpose | detect policy/behavior/concept drift |

#### 6.7.3 behavior-analyzer

| Field   | Value                                    |
| ------- | ---------------------------------------- |
| Type    | domain-service                           |
| Purpose | analyze action/output behavior over time |

#### 6.7.4 compliance-auditor

| Field   | Value                               |
| ------- | ----------------------------------- |
| Type    | control-service                     |
| Purpose | compliance checks, audit assertions |

#### 6.7.5 ethics-monitor

| Field   | Value                       |
| ------- | --------------------------- |
| Type    | domain-service              |
| Purpose | ethical risk classification |

#### 6.7.6 trust-evaluator

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Type    | control-service                       |
| Purpose | derive trust scores / autonomy limits |

#### 6.7.7 risk-alert-system

| Field   | Value                                                  |
| ------- | ------------------------------------------------------ |
| Type    | gateway-service                                        |
| Purpose | emit alerts, escalation signals, intervention requests |

#### 6.7.8 decision-auditor

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Type    | control-service                       |
| Purpose | verify decision artifact completeness |

#### 6.7.9 model-validator

| Field   | Value                                   |
| ------- | --------------------------------------- |
| Type    | domain-service                          |
| Purpose | validate model/runtime policy alignment |

---

### 6.8 Observability Domain

#### 6.8.1 metrics-collector

#### 6.8.2 trace-analyzer

#### 6.8.3 system-health-service

#### 6.8.4 alert-dispatcher

#### 6.8.5 performance-profiler

#### 6.8.6 event-inspector

#### 6.8.7 resource-monitor

#### 6.8.8 cluster-analytics

#### 6.8.9 cost-monitor

#### 6.8.10 audit-dashboard-service

> หลักการเหมือนกัน: observability service ทุกตัวต้อง subscribe trace/event lineage IDs ได้

---

## 7. Canonical API Design Rules

### 7.1 Protocol Selection

| Use case                          | Protocol         |
| --------------------------------- | ---------------- |
| synchronous internal control      | gRPC             |
| external governance/dashboard API | REST             |
| graph-like executive queries      | GraphQL optional |
| high-frequency agent exchange     | async event      |
| streaming updates                 | SSE / WebSocket  |

### 7.2 API Resource Classes

ASI ใช้ resource classes 8 แบบ

- agents
- tasks
- decisions
- policies
- events
- lineage
- audits
- sessions

### 7.3 API Naming Convention

```text
/api/{domain}/{version}/{resource}
```

ตัวอย่าง

```text
/api/identity/v1/agents
/api/governance/v1/policies
/api/reasoning/v1/sessions
/api/lineage/v1/events
/api/audit/v1/replays
```

---

## 8. Canonical API Objects

### 8.1 Agent Object

```json
{
  "agent_id": "agt_finance_01",
  "agent_type": "finance-agent",
  "display_name": "Finance AI Primary",
  "version": "1.3.2",
  "status": "active",
  "authority_scope": ["budget_review", "cost_assessment"],
  "policy_scope": ["finance", "risk"],
  "trust_level": "high",
  "owner_team": "finance-ai",
  "created_at": "2026-03-06T00:00:00Z"
}
```

### 8.2 Decision Object

```json
{
  "decision_id": "dec_01JABCXYZ",
  "case_id": "case_budget_q2_2026",
  "proposed_by": "agt_finance_01",
  "decision_type": "budget_reallocation",
  "status": "proposed",
  "confidence": 0.87,
  "risk_level": "medium",
  "policy_scope": ["finance", "risk"],
  "reasoning_summary": "Reallocation recommended due to cost variance and forecast pressure.",
  "evidence_refs": ["doc_123", "forecast_77"],
  "lineage_hash": "0xabc123",
  "created_at": "2026-03-06T00:00:00Z"
}
```

### 8.3 Policy Object

```json
{
  "policy_id": "pol_fin_budget_001",
  "name": "Budget Approval Threshold",
  "domain": "finance",
  "version": "1.0.0",
  "mode": "enforce",
  "rules": [
    {
      "condition": "amount_delta > 1000000",
      "action": "require_human_approval"
    }
  ],
  "effective_from": "2026-03-01T00:00:00Z"
}
```

### 8.4 Lineage Event Object

```json
{
  "event_id": "evt_01JABCXYZ",
  "event_type": "decision.synthesized.v1",
  "timestamp": "2026-03-06T00:00:00Z",
  "actor_id": "svc_decision_synthesizer",
  "agent_id": "agt_strategy_01",
  "trace_id": "trc_001",
  "lineage_hash": "0xabc",
  "parent_hash": "0xdef",
  "payload_hash": "0x999",
  "signature": "ed25519:....",
  "policy_scope": ["strategy", "risk"],
  "classification": "confidential"
}
```

---

## 9. Canonical REST APIs

### 9.1 Identity APIs

#### Register Agent

`POST /api/identity/v1/agents`

Request:

```json
{
  "agent_type": "finance-agent",
  "display_name": "Finance AI Primary",
  "authority_scope": ["budget_review"],
  "policy_scope": ["finance"],
  "public_key": "ed25519-public-key"
}
```

Response:

```json
{
  "agent_id": "agt_finance_01",
  "status": "registered",
  "workload_identity": "spiffe://asi/agents/finance/agt_finance_01"
}
```

#### Rotate Agent Key

`POST /api/identity/v1/agents/{agent_id}/keys:rotate`

---

### 9.2 Reasoning APIs

#### Create Reasoning Session

`POST /api/reasoning/v1/sessions`

```json
{
  "case_id": "case_budget_q2_2026",
  "initiator_agent_id": "agt_strategy_01",
  "goal": "Evaluate budget reallocation options",
  "context_refs": ["forecast_77", "budget_2025_q4"],
  "depth_budget": 4,
  "policy_scope": ["strategy", "finance", "risk"]
}
```

#### Get Reasoning Session

`GET /api/reasoning/v1/sessions/{session_id}`

#### Finalize Reasoning Session

`POST /api/reasoning/v1/sessions/{session_id}:finalize`

---

### 9.3 Decision APIs

#### Submit Decision Proposal

`POST /api/decisions/v1/proposals`

```json
{
  "case_id": "case_budget_q2_2026",
  "agent_id": "agt_finance_01",
  "decision_type": "budget_reallocation",
  "reasoning_summary": "Recommended transfer from discretionary marketing reserve.",
  "confidence": 0.87,
  "risk_level": "medium",
  "evidence_refs": ["doc_123"],
  "lineage_hash": "0xabc123"
}
```

#### Review Decision

`POST /api/decisions/v1/proposals/{decision_id}:review`

```json
{
  "reviewer_id": "agt_risk_01",
  "review_outcome": "conditional_approve",
  "conditions": [
    "require CFO approval above threshold"
  ]
}
```

#### Approve Decision

`POST /api/decisions/v1/proposals/{decision_id}:approve`

---

### 9.4 Governance APIs

#### Evaluate Policy

`POST /api/governance/v1/policies:evaluate`

```json
{
  "subject_type": "decision",
  "subject_id": "dec_01JABCXYZ",
  "policy_scope": ["finance", "risk"],
  "context": {
    "amount_delta": 1200000,
    "risk_level": "medium"
  }
}
```

#### Drift Status

`GET /api/governance/v1/drift/status?domain=finance-agent`

#### Trigger Safe Mode

`POST /api/governance/v1/interventions/safe-mode`

---

### 9.5 Lineage APIs

#### Submit Event

`POST /api/lineage/v1/events`

```json
{
  "event_type": "agent.decision.proposed.v1",
  "agent_id": "agt_finance_01",
  "parent_hash": "0xprev",
  "payload_hash": "0xpayload",
  "signature": "ed25519:....",
  "trace_id": "trc_001"
}
```

#### Verify Event

`POST /api/lineage/v1/events:verify`

#### Get Event Proof

`GET /api/lineage/v1/events/{event_id}/proof`

#### Replay Audit Chain

`POST /api/audit/v1/replays`

---

## 10. Canonical gRPC Services

ใช้สำหรับ internal service calls ที่ต้องการ latency ต่ำและ schema เข้ม

### 10.1 IdentityService

```proto
service IdentityService {
  rpc RegisterAgent(RegisterAgentRequest) returns (RegisterAgentResponse);
  rpc RotateKey(RotateKeyRequest) returns (RotateKeyResponse);
  rpc ResolveAgent(ResolveAgentRequest) returns (ResolveAgentResponse);
}
```

### 10.2 LineageService

```proto
service LineageService {
  rpc GenerateHash(GenerateHashRequest) returns (GenerateHashResponse);
  rpc ValidateEvent(ValidateEventRequest) returns (ValidateEventResponse);
  rpc CommitEvent(CommitEventRequest) returns (CommitEventResponse);
  rpc GetProof(GetProofRequest) returns (GetProofResponse);
}
```

### 10.3 ReasoningService

```proto
service ReasoningService {
  rpc StartSession(StartSessionRequest) returns (StartSessionResponse);
  rpc SubmitInference(SubmitInferenceRequest) returns (SubmitInferenceResponse);
  rpc FinalizeSession(FinalizeSessionRequest) returns (FinalizeSessionResponse);
}
```

### 10.4 PolicyService

```proto
service PolicyService {
  rpc Evaluate(EvaluatePolicyRequest) returns (EvaluatePolicyResponse);
  rpc ResolveAuthority(ResolveAuthorityRequest) returns (ResolveAuthorityResponse);
  rpc TriggerIntervention(TriggerInterventionRequest) returns (TriggerInterventionResponse);
}
```

---

## 11. Event Contract Standard

ทุก event บน AetherBus ต้องใช้ envelope มาตรฐานเดียวกัน

### 11.1 Akashic Envelope v1

```json
{
  "envelope_version": "1.0",
  "event_id": "evt_01JABCXYZ",
  "event_type": "agent.task.assigned.v1",
  "occurred_at": "2026-03-06T00:00:00Z",
  "published_at": "2026-03-06T00:00:00Z",
  "source_service": "task-scheduler",
  "source_agent_id": "agt_strategy_01",
  "trace_id": "trc_001",
  "correlation_id": "cor_001",
  "causation_id": "evt_prev_001",
  "lineage": {
    "lineage_hash": "0xabc",
    "parent_hash": "0xdef",
    "payload_hash": "0x999",
    "signature": "ed25519:..."
  },
  "policy_scope": ["strategy", "finance"],
  "classification": "confidential",
  "priority": "high",
  "delivery_mode": "at-least-once",
  "schema_ref": "asi://schemas/agent.task.assigned.v1",
  "payload": {}
}
```

---

## 12. Canonical Event Families

### 12.1 Agent Lifecycle Events

- `agent.lifecycle.created.v1`
- `agent.lifecycle.activated.v1`
- `agent.lifecycle.suspended.v1`
- `agent.lifecycle.retired.v1`
- `agent.lifecycle.quarantined.v1`

Payload example:

```json
{
  "agent_id": "agt_finance_01",
  "agent_type": "finance-agent",
  "reason": "manual_activation"
}
```

### 12.2 Task Events

- `agent.task.created.v1`
- `agent.task.assigned.v1`
- `agent.task.accepted.v1`
- `agent.task.rejected.v1`
- `agent.task.started.v1`
- `agent.task.completed.v1`
- `agent.task.failed.v1`
- `agent.task.escalated.v1`

Payload example:

```json
{
  "task_id": "tsk_001",
  "case_id": "case_budget_q2_2026",
  "assigned_to": "agt_finance_01",
  "task_type": "budget_assessment",
  "deadline_ms": 1500
}
```

### 12.3 Reasoning Events

- `reasoning.session.started.v1`
- `reasoning.inference.submitted.v1`
- `reasoning.constraint.applied.v1`
- `reasoning.session.completed.v1`
- `reasoning.session.failed.v1`

### 12.4 Decision Events

- `agent.decision.proposed.v1`
- `agent.decision.reviewed.v1`
- `decision.synthesized.v1`
- `decision.approved.v1`
- `decision.rejected.v1`
- `decision.overridden.v1`
- `decision.executed.v1`

### 12.5 Governance Events

- `governance.policy.evaluated.v1`
- `governance.ethics.assessed.v1`
- `governance.drift.detected.v1`
- `governance.intervention.requested.v1`
- `governance.safe_mode.enabled.v1`
- `governance.shutdown.triggered.v1`

### 12.6 Identity & Lineage Events

- `identity.agent.registered.v1`
- `identity.key.rotated.v1`
- `lineage.hash.generated.v1`
- `lineage.event.validated.v1`
- `lineage.validation.failed.v1`
- `lineage.event.committed.v1`
- `lineage.proof.generated.v1`

### 12.7 Audit Events

- `audit.replay.requested.v1`
- `audit.replay.completed.v1`
- `audit.assertion.failed.v1`
- `audit.export.generated.v1`

### 12.8 Observability Events

- `obs.trace.emitted.v1`
- `obs.metric.threshold_exceeded.v1`
- `obs.cost.anomaly.detected.v1`
- `obs.system.degraded.v1`

---

## 13. Topic Namespace Convention

AetherBus topics ใช้รูปแบบ

```text
asi.{domain}.{entity}.{action}.v1
```

ตัวอย่าง

```text
asi.agent.task.assigned.v1
asi.reasoning.session.completed.v1
asi.governance.drift.detected.v1
asi.lineage.event.committed.v1
asi.decision.approved.v1
```

สำหรับแบ่ง environment

```text
{env}.asi.{domain}.{entity}.{action}.v1
```

ตัวอย่าง

```text
prod.asi.agent.task.assigned.v1
staging.asi.lineage.event.committed.v1
```

---

## 14. Delivery Semantics

### 14.1 Event Delivery Modes

| Mode                              | ใช้เมื่อ                                             |
| --------------------------------- | ---------------------------------------------------- |
| at-most-once                      | telemetry ที่ไม่ critical                            |
| at-least-once                     | tasking, agent coordination, most platform events    |
| exactly-once semantic by consumer | ledger commit, approval execution, financial actions |

> ASI ไม่บังคับ exactly-once transport ตรง ๆ แต่ใช้ **idempotent consumers + lineage-aware deduplication**

### 14.2 Required Fields for Idempotency

ทุก command/event สำคัญต้องมี

- `event_id`
- `trace_id`
- `correlation_id`
- `source_service`
- `idempotency_key`

---

## 15. Error Contract Standard

ทุก API ใช้ error shape เดียวกัน

```json
{
  "error": {
    "code": "POLICY_VIOLATION",
    "message": "Human approval required for threshold breach.",
    "retryable": false,
    "category": "governance",
    "details": {
      "policy_id": "pol_fin_budget_001",
      "decision_id": "dec_01JABCXYZ"
    },
    "trace_id": "trc_001"
  }
}
```

### 15.1 Error Categories

- `validation`
- `authentication`
- `authorization`
- `governance`
- `lineage`
- `dependency`
- `timeout`
- `capacity`
- `conflict`
- `internal`

---

## 16. Versioning Rules

### 16.1 API Versioning

- major changes → `/v2`
- additive fields → same version
- deprecated endpoints ต้องประกาศล่วงหน้า

### 16.2 Event Versioning

- event name ลงท้ายด้วย version เช่น `.v1`
- schema breaking change ต้องสร้าง topic ใหม่

ตัวอย่าง

- `decision.approved.v1`
- `decision.approved.v2`

---

## 17. Security & Authorization Contract

### 17.1 Identity Model

ทุก service ใช้

- workload identity
- mTLS
- signed envelopes
- scoped authorization

### 17.2 Scope Model

ตัวอย่าง scopes

- `identity:write`
- `lineage:commit`
- `reasoning:execute`
- `policy:evaluate`
- `decision:approve`
- `audit:replay`
- `agent:spawn`

### 17.3 Data Classification

ทุก payload/event ต้องระบุ

- `public`
- `internal`
- `confidential`
- `restricted`

restricted payload ห้าม broadcast แบบ raw; ต้องใช้ payload reference

---

## 18. Decision Rights Contract

เพื่อไม่ให้ agent network กลายเป็น chaos ต้องมี authority contract

| Decision Type       | Primary Agent    | Required Review         | Human Approval      | Execution Authority |
| ------------------- | ---------------- | ----------------------- | ------------------- | ------------------- |
| budget_reallocation | finance-agent    | risk-agent              | yes above threshold | finance + human     |
| contract_risk_flag  | legal-agent      | compliance-auditor      | threshold-based     | legal               |
| ops_schedule_change | operations-agent | strategy-agent optional | no within envelope  | operations-agent    |
| policy_override     | none             | policy-engine + auditor | always              | human only          |

---

## 19. Example End-to-End Contract Flow

ตัวอย่าง use case: **Budget Reallocation**

### 19.1 Flow

1. Strategy AI สร้าง task
2. Task Scheduler assign ให้ Finance AI
3. Finance AI วิเคราะห์และเสนอ decision
4. Risk AI review
5. Cogitator X synthesize
6. Policy Engine evaluate threshold
7. ถ้าเกินวงเงิน → human approval
8. GenesisCore commit event chain
9. Dashboard แสดงสถานะ

### 19.2 Events

```text
asi.agent.task.created.v1
asi.agent.task.assigned.v1
asi.agent.decision.proposed.v1
asi.agent.decision.reviewed.v1
asi.decision.synthesized.v1
asi.governance.policy.evaluated.v1
asi.decision.approved.v1
asi.lineage.event.committed.v1
```

### 19.3 Required APIs

- `POST /api/reasoning/v1/sessions`
- `POST /api/decisions/v1/proposals`
- `POST /api/governance/v1/policies:evaluate`
- `POST /api/lineage/v1/events`
- `GET /api/lineage/v1/events/{id}/proof`

---

## 20. Minimal Mandatory Contracts per Service

ทุก service ที่จะขึ้น production ต้องมีขั้นต่ำดังนี้

### Required

- service catalog entry
- OpenAPI หรือ protobuf spec
- async topic publish/consume list
- auth scopes
- lineage participation rule
- error contract
- observability hooks
- SLO class
- owner team

### Optional but recommended

- formal state machine
- fallback behavior
- degradation mode
- replay support
- backpressure handling

---

## 21. Recommended Next Artifacts

เพื่อให้เอกสารนี้พร้อมใช้จริงในทีมวิศวกรรม ควรต่อยอดเป็น 5 artifact ถัดไป

### 21.1 Service Catalog Table ฉบับเต็ม 100+ services

มีทุก field ตาม schema

### 21.2 OpenAPI Spec

สำหรับ external/control APIs

### 21.3 Protobuf Contract Pack

สำหรับ internal gRPC

### 21.4 AsyncAPI / Event Schema Registry

สำหรับ AetherBus topics ทั้งหมด

### 21.5 Decision Authority Matrix

เชื่อม department agents กับ governance/human oversight

---

## สรุป

เอกสารชุดนี้วางฐานให้ ASI เป็น **contract-governed AI Operating System** โดยทำให้ 4 เรื่องนี้เชื่อมกันอย่างเป็นระบบ

- **Service Catalog** — รู้ว่าอะไรคือ service จริง
- **API Contracts** — รู้ว่า synchronous control flow ทำงานอย่างไร
- **Event Contracts** — รู้ว่า asynchronous enterprise coordination ทำงานอย่างไร
- **Lineage Contracts** — รู้ว่า accountability ถูกยืนยันอย่างไร

แกนที่สำคัญที่สุดคือ:

> **ทุก service, ทุก decision, ทุก event ต้องมี identity, policy scope, lineage, และ contract ที่ตรวจสอบได้**
