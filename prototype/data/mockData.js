import {
  toChatViewModel,
  toDecisionViewModel,
  toGovernanceViewModel,
  toLineageViewModel,
} from '../contracts/apiContracts';
import { validateMockDataset } from './validateMockData';

export const navItems = ['overview', 'architecture', 'departments', 'decisions', 'governance', 'lineage', 'chat', 'settings'];

export const architectureLayers = [
  {
    layer: 'Human Governance Layer',
    purpose: 'Strategic oversight, ethical control, and executive accountability.',
    stack: ['Executive AI Council', 'Audit Committees', 'Intervention Rights'],
  },
  {
    layer: 'Executive Dashboard',
    purpose: 'Unified observability and control center for AI departments.',
    stack: ['React', 'Tailwind', 'Vite'],
  },
  {
    layer: 'AI Reasoning Layer (Cogitator X)',
    purpose: 'Constrained and auditable reasoning with governance envelopes.',
    stack: ['Reasoning Depth', 'Causal Alignment', 'Ethical Envelope'],
  },
  {
    layer: 'Identity & Lineage Layer (GenesisCore)',
    purpose: 'Cryptographically verifiable event lineage and immutable accountability.',
    stack: ['Event Hash', 'Parent Hash', 'Lineage Chain'],
  },
  {
    layer: 'AI Communication Fabric (AetherBus)',
    purpose: 'High-throughput inter-agent communication with low latency.',
    stack: ['NATS JetStream', 'uvloop', 'Zero-copy Envelope'],
  },
  {
    layer: 'Data Infrastructure (Triad Database)',
    purpose: 'Multi-model persistence for transactional, cache, and vector workloads.',
    stack: ['PostgreSQL', 'Redis', 'Qdrant/Chroma'],
  },
  {
    layer: 'High Performance Compute (Tachyon Core)',
    purpose: 'Accelerated compute for vector math, hashing, and policy-heavy workloads.',
    stack: ['Rust', 'PyO3', 'SIMD-friendly runtime'],
  },
];

export const governancePrinciples = [
  {
    title: 'Verifiable Intelligence',
    desc: 'ทุกการตัดสินใจต้องมี reasoning path และหลักฐานที่ตรวจสอบย้อนหลังได้',
  },
  {
    title: 'Immutable Lineage',
    desc: 'ทุก event ถูกผูกด้วย hash chain เพื่อป้องกันการแก้ไขประวัติย้อนหลัง',
  },
  {
    title: 'Autonomous Departments',
    desc: 'แยก AI ตามขอบเขตหน้าที่ พร้อม policy boundary ที่ชัดเจน',
  },
  {
    title: 'Continuous Alignment',
    desc: 'ตรวจ drift แบบ realtime พร้อม alert และ shutdown policy',
  },
];

export const resonanceDriftPipeline = [
  {
    stage: 'Behavior Analyzer',
    method: 'Rule + embedding telemetry baseline',
    output: 'Behavior vector and anomaly candidate set',
  },
  {
    stage: 'Statistical Drift Detector',
    method: 'Bayesian inference + KS test + ADWIN',
    output: 'Distribution shift confidence score',
  },
  {
    stage: 'Ethical Model Evaluator',
    method: 'Policy compliance rubric + causal contradiction scans',
    output: 'Ethical risk band and intervention hint',
  },
  {
    stage: 'Alert / Shutdown Orchestrator',
    method: 'Human escalation + autonomy band override',
    output: 'Alert, degraded mode, or emergency stop action',
  },
];

export const quickActions = [
  {
    title: 'เริ่มคำขอใหม่',
    desc: 'สร้าง workflow ใหม่ เช่น Budget Reallocation, Risk Review, Policy Override',
  },
  {
    title: 'ดูการตัดสินใจที่รออนุมัติ',
    desc: 'รายการที่ต้องการ Executive Oversight หรือการ approve จากผู้มีอำนาจ',
  },
  {
    title: 'ตรวจสอบ Drift / Alert',
    desc: 'ดูสัญญาณ risk, policy drift, และ intervention ที่กำลังทำงาน',
  },
  {
    title: 'เปิด Audit & Lineage',
    desc: 'เรียกดู decision trail, proof, event chain และ replay',
  },
];

export const departments = [
  { name: 'Finance AI', status: 'Stable', tasks: 24, ai: 'Chat AI' },
  { name: 'Legal AI', status: 'Review', tasks: 9, ai: 'Chat AI' },
  { name: 'Strategy AI', status: 'Active', tasks: 18, ai: 'Chat AI' },
  { name: 'Operations AI', status: 'Stable', tasks: 31, ai: 'Chat AI' },
];

const decisionContracts = [
  {
    decision_id: 'DEC-1042',
    summary: 'Budget Reallocation',
    owner_department: 'Finance AI',
    status: 'Awaiting CFO Approval',
    risk_level: 'medium',
  },
  {
    decision_id: 'DEC-1041',
    summary: 'Vendor Risk Flag',
    owner_department: 'Risk AI',
    status: 'Escalated',
    risk_level: 'high',
  },
  {
    decision_id: 'DEC-1038',
    summary: 'Ops Schedule Adjustment',
    owner_department: 'Operations AI',
    status: 'Approved',
    risk_level: 'low',
  },
];

const governanceContracts = [
  {
    policy_id: 'POL-FIN-001',
    policy_name: 'Budget Delta Threshold',
    lifecycle: 'active',
    controls: ['cfo_approval_over_5_percent', 'risk_review_required'],
  },
  {
    policy_id: 'POL-RSK-014',
    policy_name: 'Vendor Tier Escalation',
    lifecycle: 'active',
    controls: ['tier_1_auto_escalation', 'legal_review_gate'],
  },
];

const lineageContracts = [
  {
    decision_id: 'DEC-1042',
    event_chain: ['request.created', 'policy.checked', 'risk.scored', 'approval.pending'],
    proof_uri: '/proof/dec-1042',
    replay_job: 'replay-2026-03-01-dec-1042',
  },
  {
    decision_id: 'DEC-1041',
    event_chain: ['alert.created', 'risk.scored', 'escalation.triggered'],
    proof_uri: '/proof/dec-1041',
    replay_job: 'replay-2026-02-28-dec-1041',
  },
];

const chatContracts = {
  global: {
    thread_id: 'thread-global-001',
    scope: 'global',
    messages: [
      { role: 'user', content: 'วันนี้มี decision ใดบ้างที่รออนุมัติระดับผู้บริหาร?' },
      {
        role: 'assistant',
        content:
          'พบ 3 รายการ: Budget Reallocation, Vendor Risk Flag และ Policy Override Request สามารถเปิดรายการใน Decision Center ได้ทันที',
      },
    ],
  },
  department: {
    thread_id: 'thread-department-001',
    scope: 'department',
    messages: [
      { role: 'assistant', content: 'Finance AI ตอนนี้มี 2 รายการที่เกิน threshold และ 1 รายการที่ต้อง CFO review' },
      { role: 'user', content: 'เปิดรายการที่ต้อง CFO review ให้หน่อย' },
    ],
  },
};

const decisionValidation = validateMockDataset(departments, decisionContracts);

if (decisionValidation.issues.length > 0 && typeof console !== 'undefined' && typeof console.warn === 'function') {
  console.warn('[mockData] Found dataset issues', decisionValidation.issues);
}

export const decisions = decisionValidation.normalizedDecisionContracts.map(toDecisionViewModel);
export const governancePolicies = governanceContracts.map(toGovernanceViewModel);
export const lineageItems = lineageContracts.map(toLineageViewModel);
export const chatThreads = {
  global: toChatViewModel(chatContracts.global),
  department: toChatViewModel(chatContracts.department),
};

export const settingsGroups = [
  {
    title: 'Workspace Settings',
    items: ['Brand / Theme', 'Language', 'Time Zone', 'Notification Rules'],
  },
  {
    title: 'AI Governance Settings',
    items: ['Approval Thresholds', 'Autonomy Bands', 'Policy Scope', 'Human Escalation Rules'],
  },
  {
    title: 'Security & Access',
    items: ['SSO / Identity', 'Role Permissions', 'Session Controls', 'Audit Access'],
  },
  {
    title: 'AI Chat Controls',
    items: ['Default Assistant Persona', 'Sidebar Chat', 'Inline Section Chat', 'Pinned Command Shortcuts'],
  },
];
