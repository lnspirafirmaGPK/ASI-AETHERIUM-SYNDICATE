export const UNKNOWN_DEPARTMENT_LABEL = 'Unknown Department';

/**
 * @param {{ name: string }[]} departments
 * @param {{ decision_id: string, owner_department: string }[]} decisionContracts
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
