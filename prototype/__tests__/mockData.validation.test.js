import { decisions, departments } from '../data/mockData';
import { UNKNOWN_DEPARTMENT_LABEL, validateMockDataset } from '../data/validateMockData';

describe('mock data validation', () => {
  it('preserves known owners and flags unknown owners using fixture source-of-truth', () => {
    const departmentNames = new Set(departments.map((department) => department.name));
    const originalOwnerByDecisionId = new Map([
      ['DEC-1042', 'Finance AI'],
      ['DEC-1041', 'Risk AI'],
      ['DEC-1038', 'Operations AI'],
    ]);

    decisions.forEach((decision) => {
      const originalOwner = originalOwnerByDecisionId.get(decision.id);
      const isKnownOwner = originalOwner ? departmentNames.has(originalOwner) : false;

      if (isKnownOwner) {
        expect(decision.ownerKnown).toBe(true);
        expect(decision.owner).toBe(originalOwner);
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
