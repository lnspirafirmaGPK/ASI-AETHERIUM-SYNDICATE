export const UNKNOWN_DEPARTMENT_LABEL = 'Unknown Department';

/**
 * Validates the mock dataset by checking for inconsistencies between departments and decision contracts.
 * @param {{ name: string }[]} departments - The list of department objects.
 * @param {import('../contracts/apiContracts').DecisionContract[]} decisionContracts - The list of decision contract objects.
 * @returns {{issues: {type: string, decisionId: string, ownerDepartment: string}[], normalizedDecisionContracts: import('../contracts/apiContracts').DecisionContract[]}} - An object containing a list of issues and the normalized decision contracts.
 */
export function validateMockDataset(departments, decisionContracts) {
  const knownDepartments = new Set(departments.map((department) => department.name));

  const issues = [];

  const normalizedDecisionContracts = decisionContracts.map((decision) => {
    const ownerKnown = knownDepartments.has(decision.owner_department);

    if (!ownerKnown) {
      issues.push({
        type: 'unknown-department-owner',
        decisionId: decision.decision_id,
        ownerDepartment: decision.owner_department,
      });
    }

    return {
      ...decision,
      owner_department: ownerKnown ? decision.owner_department : UNKNOWN_DEPARTMENT_LABEL,
      owner_known: ownerKnown,
    };
  });

  return {
    issues,
    normalizedDecisionContracts,
  };
}
