# ASI ADR Index Matrix (v1.0)

เอกสารนี้ใช้สำหรับ PMO / Architecture Board เพื่อดูผลกระทบของ ADR-001 ถึง ADR-030 ต่อ capability หลักขององค์กรอย่างเป็นระบบ

## วิธีให้คะแนนผลกระทบ
- **H (High):** กระทบเชิงสถาปัตยกรรมหรือ governance โดยตรงและกว้าง
- **M (Medium):** กระทบเชิง implementation หรือ process ในหลายทีม
- **L (Low):** กระทบทางอ้อมหรือเฉพาะบาง use case

คอลัมน์ผลกระทบ:
- **Platform**
- **Security/Trust**
- **Data**
- **AI Runtime**
- **Governance**
- **Operations**

---

| ADR | Title (Short) | Platform | Security/Trust | Data | AI Runtime | Governance | Operations |
|---|---|---|---|---|---|---|---|
| ADR-001 | AI Organization OS Target | H | H | M | H | H | H |
| ADR-002 | Separate Control/Data Plane | H | M | M | H | H | H |
| ADR-003 | Dedicated Trust Plane | H | H | M | M | H | H |
| ADR-004 | Event-Driven Primary Pattern | H | M | H | H | M | H |
| ADR-005 | Sync APIs for Control/Query/Approval | M | M | M | M | H | M |
| ADR-006 | NATS JetStream Baseline | H | M | H | H | M | H |
| ADR-007 | Contract-First Service Design | H | M | M | M | H | H |
| ADR-008 | Canonical Service Catalog | H | M | M | M | H | H |
| ADR-009 | Agents as Decision Boundaries | M | M | L | H | H | M |
| ADR-010 | Identity for Agents/Services | M | H | M | H | H | M |
| ADR-011 | Signed + Lineage-Bound Material Events | M | H | H | M | H | H |
| ADR-012 | Immutable History, Evolvable State | M | H | H | M | H | M |
| ADR-013 | Decision Artifact Canonical Unit | M | H | H | H | H | M |
| ADR-014 | Human Sovereign Oversight | L | H | M | M | H | M |
| ADR-015 | Fail Closed for Sensitive Actions | M | H | M | M | H | H |
| ADR-016 | Policy-as-Code | M | H | M | M | H | H |
| ADR-017 | Drift Monitoring First-Class | M | M | M | H | H | H |
| ADR-018 | Intervention Ladder | M | H | L | H | H | H |
| ADR-019 | Kubernetes Baseline Runtime | H | M | M | H | M | H |
| ADR-020 | Partition by Runtime Profile | H | M | M | H | M | H |
| ADR-021 | Python + Rust Standardization | H | M | M | H | M | M |
| ADR-022 | PostgreSQL Core Store | M | H | H | M | H | H |
| ADR-023 | Redis Ephemeral/Cache Only | M | M | H | M | H | M |
| ADR-024 | Dedicated Vector Infrastructure | M | M | H | H | M | M |
| ADR-025 | End-to-End Correlation IDs | M | H | H | H | H | H |
| ADR-026 | Idempotent Consumers | M | M | H | H | H | H |
| ADR-027 | Mandatory DLQ + Quarantine | H | H | M | M | H | H |
| ADR-028 | Start with Vertical Slice | H | M | M | M | H | H |
| ADR-029 | Continuous Architecture Governance | M | H | M | M | H | H |
| ADR-030 | Explicit Ownership Boundaries | M | H | L | M | H | H |

---

## Heatmap Summary (จำนวน ADR ที่กระทบระดับ High)
- **Platform:** 11 ADR
- **Security/Trust:** 14 ADR
- **Data:** 9 ADR
- **AI Runtime:** 14 ADR
- **Governance:** 24 ADR
- **Operations:** 20 ADR

> ข้อสังเกตสำหรับ Architecture Board: แกน Governance, Operations และ Security/Trust มีความเข้มข้นสูงสุด จึงควรจัด review cadence รายเดือน และ risk board รายไตรมาสแบบบูรณาการ

---

## Suggested Board Usage
1. ใช้ Matrix นี้ใน Architecture Review เพื่อประเมินผลกระทบแบบ cross-domain ก่อนอนุมัติ initiative ใหม่
2. ใช้เป็น input ให้ PMO จัดลำดับงานที่ต้องร่วมหลายทีม (multi-owner epics)
3. ใช้ร่วมกับ ADR-to-Implementation Mapping เพื่อแปลง decision เป็น execution plan ที่วัดผลได้
