/** @typedef {'low'|'medium'|'high'} RiskLevel */

/**
 * @typedef {Object} DecisionContract
 * @property {string} decision_id
 * @property {string} summary
 * @property {string} owner_department
 * @property {boolean} [owner_known]
 * @property {string} status
 * @property {RiskLevel} risk_level
 */

/**
 * @typedef {Object} GovernanceContract
 * @property {string} policy_id
 * @property {string} policy_name
 * @property {'active'|'draft'|'retired'} lifecycle
 * @property {string[]} controls
 */

/**
 * @typedef {Object} LineageContract
 * @property {string} decision_id
 * @property {string[]} event_chain
 * @property {string} proof_uri
 * @property {string} replay_job
 */

/**
 * @typedef {Object} ChatContract
 * @property {string} thread_id
 * @property {'global'|'department'|'decision'|'settings'} scope
 * @property {{ role: 'user'|'assistant', content: string }[]} messages
 */

export const apiContracts = {
  decisions: {
    method: 'GET',
    path: '/api/decisions',
  },
  governance: {
    method: 'GET',
    path: '/api/governance/policies',
  },
  lineage: {
    method: 'GET',
    path: '/api/lineage/events',
  },
  chat: {
    method: 'POST',
    path: '/api/chat/query',
  },
};

/** @param {DecisionContract} payload */
export function toDecisionViewModel(payload) {
  return {
    id: payload.decision_id,
    title: payload.summary,
    owner: payload.owner_department,
    ownerKnown: payload.owner_known ?? true,
    state: payload.status,
    risk: payload.risk_level,
  };
}

/** @param {GovernanceContract} payload */
export function toGovernanceViewModel(payload) {
  return {
    id: payload.policy_id,
    title: payload.policy_name,
    lifecycle: payload.lifecycle,
    controls: payload.controls,
  };
}

/** @param {LineageContract} payload */
export function toLineageViewModel(payload) {
  return {
    decisionId: payload.decision_id,
    events: payload.event_chain,
    proofUri: payload.proof_uri,
    replayJob: payload.replay_job,
  };
}

/** @param {ChatContract} payload */
export function toChatViewModel(payload) {
  return {
    threadId: payload.thread_id,
    scope: payload.scope,
    messages: payload.messages,
  };
}
