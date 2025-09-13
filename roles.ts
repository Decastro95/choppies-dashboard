// src/roles.ts

// String-based enum for user roles
export enum Roles {
  CEO = "ceo",
  MANAGER = "manager",
  CASHIER = "cashier",
  SUPPLIER = "supplier",
  ADMIN = "admin",
}

// Type representing the enum values (what you actually store/use)
export type Role = `${Roles}`;

// Example usage:
// const myRole: Role = Roles.ADMIN; // ✅ "admin"
// const myRole2: Role = "ceo";      // ✅ "ceo"
// const myRole3: Role = "CEO";      // ❌ TypeScript error
