// src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'CEO' | 'admin' | 'manager' | 'cashier' | 'supplier'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'CEO' | 'admin' | 'manager' | 'cashier' | 'supplier'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'CEO' | 'admin' | 'manager' | 'cashier' | 'supplier'
          created_at?: string
        }
        Relationships: [] // users is root, no FK
      }

      products: {
        Row: {
          id: number
          name: string
          category: string
          price: number
          stock: number
          expiry_date: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          category: string
          price: number
          stock?: number
          expiry_date?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          category?: string
          price?: number
          stock?: number
          expiry_date?: string | null
          created_at?: string
        }
        Relationships: [] // root table
      }

      sales: {
        Row: {
          id: number
          product_id: number
          quantity: number
          total: number
          sale_date: string
          cashier_id: string
          created_at: string
        }
        Insert: {
          id?: number
          product_id: number
          quantity: number
          total: number
          sale_date?: string
          cashier_id: string
          created_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          quantity?: number
          total?: number
          sale_date?: string
          cashier_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sales_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sales_cashier_id_fkey'
            columns: ['cashier_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }

      damaged_goods: {
        Row: {
          id: number
          product_id: number
          quantity: number
          reported_at: string
          reported_by: string
        }
        Insert: {
          id?: number
          product_id: number
          quantity: number
          reported_at?: string
          reported_by: string
        }
        Update: {
          id?: number
          product_id?: number
          quantity?: number
          reported_at?: string
          reported_by?: string
        }
        Relationships: [
          {
            foreignKeyName: 'damaged_goods_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'damaged_goods_reported_by_fkey'
            columns: ['reported_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }

      expiry: {
        Row: {
          id: number
          product_id: number
          expiry_date: string
          flagged_at: string
        }
        Insert: {
          id?: number
          product_id: number
          expiry_date: string
          flagged_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          expiry_date?: string
          flagged_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'expiry_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }

      low_stock: {
        Row: {
          id: number
          product_id: number
          stock_level: number
          flagged_at: string
        }
        Insert: {
          id?: number
          product_id: number
          stock_level: number
          flagged_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          stock_level?: number
          flagged_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'low_stock_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
    }

    Views: {
      sales_summary?: {
        Row: {
          total_sales: number
          total_revenue: number
          date: string
        }
      }
      daily_sales?: {
        Row: {
          date: string
          product_id: number
          total_quantity: number
          total_amount: number
        }
      }
    }

    Functions: {
      [_ in never]: never
    }
  }
}
