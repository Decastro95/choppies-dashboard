// src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: "CEO" | "admin" | "manager" | "cashier" | "supplier";
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: "CEO" | "admin" | "manager" | "cashier" | "supplier";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "CEO" | "admin" | "manager" | "cashier" | "supplier";
          created_at?: string;
        };
      };

      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: number;
          stock_quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          price: number;
          stock_quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          price?: number;
          stock_quantity?: number;
          created_at?: string;
        };
      };

      sales: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          quantity: number;
          total_price: number;
          sale_date: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          quantity: number;
          total_price: number;
          sale_date?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          quantity?: number;
          total_price?: number;
          sale_date?: string;
        };
      };

      expiry: {
        Row: {
          id: string;
          product_id: string;
          expiry_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          expiry_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          expiry_date?: string;
          created_at?: string;
        };
      };

      low_stock: {
        Row: {
          id: string;
          product_id: string;
          threshold: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          threshold: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          threshold?: number;
          created_at?: string;
        };
      };

      damaged_goods: {
        Row: {
          id: string;
          product_id: string;
          quantity: number;
          reported_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          quantity: number;
          reported_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          quantity?: number;
          reported_at?: string;
        };
      };
    };

    Relationships: {
      sales_product: {
        foreignKeyName: "sales_product_id_fkey";
        columns: ["product_id"];
        referencedRelation: "products";
        referencedColumns: ["id"];
      };
      sales_user: {
        foreignKeyName: "sales_user_id_fkey";
        columns: ["user_id"];
        referencedRelation: "users";
        referencedColumns: ["id"];
      };
      expiry_product: {
        foreignKeyName: "expiry_product_id_fkey";
        columns: ["product_id"];
        referencedRelation: "products";
        referencedColumns: ["id"];
      };
      low_stock_product: {
        foreignKeyName: "low_stock_product_id_fkey";
        columns: ["product_id"];
        referencedRelation: "products";
        referencedColumns: ["id"];
      };
      damaged_goods_product: {
        foreignKeyName: "damaged_goods_product_id_fkey";
        columns: ["product_id"];
        referencedRelation: "products";
        referencedColumns: ["id"];
      };
    };
  };
}
