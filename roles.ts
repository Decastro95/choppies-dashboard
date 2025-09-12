export enum Roles {
  CEO = "ceo",
  MANAGER = "manager",
  CASHIER = "cashier",
  SUPPLIER = "supplier",
  ADMIN = "admin",
}

export type Role = keyof typeof Roles;

