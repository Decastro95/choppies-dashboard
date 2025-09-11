export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
          stock: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          price: number;
          stock: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          price?: number;
          stock?: number;
          created_at?: string;
        };
      };
      sales: {
        Row: {
          id: number;
          product_id: number;
          quantity: number;
          total_amount: number;
          sale_date: string;
        };
        Insert: {
          id?: number;
          product_id: number;
          quantity: number;
          total_amount: number;
          sale_date?: string;
        };
        Update: {
          id?: number;
          product_id?: number;
          quantity?: number;
          total_amount?: number;
          sale_date?: string;
        };
      };
      damaged_goods: {
        Row: {
          id: number;
          product_name: string;
          quantity: number;
          reason: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          product_name: string;
          quantity: number;
          reason: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          product_name?: string;
          quantity?: number;
          reason?: string;
          created_at?: string;
        };
      };
      expiry: {
        Row: {
          id: number;
          product_name: string;
          expiry_date: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          product_name: string;
          expiry_date: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          product_name?: string;
          expiry_date?: string;
          created_at?: string;
        };
      };
      low_stock: {
        Row: {
          id: number;
          product_name: string;
          current_stock: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          product_name: string;
          current_stock: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          product_name?: string;
          current_stock?: number;
          created_at?: string;
        };
      };
    };
  };
}
