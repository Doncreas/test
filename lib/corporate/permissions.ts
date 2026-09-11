export type CorporateRole = 'owner' | 'manager' | 'employee';

export interface CorporatePermissionSet {
  canInviteUsers: boolean;
  canApproveSpending: boolean;
  canManageBilling: boolean;
  canSetPolicies: boolean;
  canViewFinance: boolean;
  canBookRides: boolean;
}

export const CORPORATE_ROLE_PERMISSIONS: Record<CorporateRole, CorporatePermissionSet> = {
  owner: {
    canInviteUsers: true,
    canApproveSpending: true,
    canManageBilling: true,
    canSetPolicies: true,
    canViewFinance: true,
    canBookRides: true,
  },
  manager: {
    canInviteUsers: false,
    canApproveSpending: true,
    canManageBilling: true,
    canSetPolicies: false,
    canViewFinance: true,
    canBookRides: true,
  },
  employee: {
    canInviteUsers: false,
    canApproveSpending: false,
    canManageBilling: false,
    canSetPolicies: false,
    canViewFinance: false,
    canBookRides: true,
  },
};

export function getCorporatePermissions(role: CorporateRole): CorporatePermissionSet {
  return CORPORATE_ROLE_PERMISSIONS[role];
}
