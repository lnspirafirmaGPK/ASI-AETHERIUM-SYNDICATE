import { decisionContracts, departments } from '../data/mockData';
import { validateMockDataset } from '../data/validateMockData';

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
});
