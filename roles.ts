// roles.ts
export type Role = 'CEO' | 'Manager' | 'Cashier' | 'Supplier' | 'Admin';

export const roleDashboardMap: Record<Role, string> = {
  CEO: '/dashboard/ceo',
  Manager: '/dashboard/manager',
  Cashier: '/dashboard/cashier',
  Supplier: '/dashboard/supplier',
  Admin: '/dashboard/admin',
};
