import { decisions, departments } from '../data/mockData';
import { UNKNOWN_DEPARTMENT_LABEL, validateMockDataset } from '../data/validateMockData';

describe('mock data validation', () => {
  it('marks decision owners as known or unknown based on departments', () => {
    const departmentNames = new Set(departments.map((department) => department.name));

    decisions.forEach((decision) => {
      if (departmentNames.has(decision.owner)) {
        expect(decision.ownerKnown).toBe(true);
      } else {
        expect(decision.owner).toBe(UNKNOWN_DEPARTMENT_LABEL);
        expect(decision.ownerKnown).toBe(false);
      }
    });
  });

  it('returns issues for unknown department owners', () => {
    const validationResult = validateMockDataset([{ name: 'Finance AI' }], [
      { decision_id: 'DEC-1', owner_department: 'Finance AI' },
      { decision_id: 'DEC-2', owner_department: 'Risk AI' },
    ]);

    expect(validationResult.issues).toEqual([
      {
        type: 'unknown-department-owner',
        decisionId: 'DEC-2',
        ownerDepartment: 'Risk AI',
      },
    ]);

    expect(validationResult.normalizedDecisionContracts[1].owner_department).toBe(UNKNOWN_DEPARTMENT_LABEL);
    expect(validationResult.normalizedDecisionContracts[1].owner_known).toBe(false);
  });
});
