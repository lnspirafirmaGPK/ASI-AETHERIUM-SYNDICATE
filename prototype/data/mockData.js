import {
  toChatViewModel,
  toDecisionViewModel,
  toGovernanceViewModel,
  toLineageViewModel,
} from '../contracts/apiContracts';

export const navItems = ['overview', 'departments', 'decisions', 'governance', 'lineage', 'chat', 'settings'];

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

export const decisions = decisionContracts.map(toDecisionViewModel);
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
