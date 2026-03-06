import { decisionContracts, departments } from '../data/mockData';
import { validateMockDataset, UNKNOWN_DEPARTMENT_LABEL } from '../data/validateMockData';

describe('validateMockDataset', () => {
  it('should flag decisions with unknown department owners', () => {
    const localDecisionContracts = [
      {
        decision_id: 'DEC-TEST-001',
        owner_department: 'Known Department',
      },
      {
        decision_id: 'DEC-TEST-002',
        owner_department: 'Unknown Department',
      },
    ];

    const localDepartments = [{ name: 'Known Department' }];

    const { issues } = validateMockDataset(localDepartments, localDecisionContracts);

    expect(issues).toHaveLength(1);
    expect(issues[0]).toEqual(expect.objectContaining({
      type: 'unknown-department-owner',
      decisionId: 'DEC-TEST-002',
    }));
  });

  it('should not flag any issues for the default mock dataset', () => {
    const { issues } = validateMockDataset(departments, decisionContracts);

    expect(issues).toHaveLength(0);
  });

  it('should not crash and should report issues when the departments array is empty', () => {
    const localDecisionContracts = [
      {
        decision_id: 'DEC-TEST-003',
        owner_department: 'Any Department',
      },
    ];

    const localDepartments = []; // This is the critical test case

    const { issues, normalizedDecisionContracts } = validateMockDataset(localDepartments, localDecisionContracts);

    // Assert that an issue is created because the department is unknown
    expect(issues).toHaveLength(1);
    expect(issues[0]).toEqual(
      expect.objectContaining({
        type: 'unknown-department-owner',
        decisionId: 'DEC-TEST-003',
        ownerDepartment: 'Any Department',
      }),
    );

    // Assert that the owner department is normalized to the 'Unknown Department' label
    // and not reassigned, which would previously cause a crash.
    expect(normalizedDecisionContracts[0].owner_department).toBe(UNKNOWN_DEPARTMENT_LABEL);
  });
});
