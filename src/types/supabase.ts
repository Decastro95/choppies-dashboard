// src/types/supabase.ts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: string;
          created_at: string;
        };
      };
      purchase_orders: {
        Row: {
          id: number;
          order_number: string;
          status: string;
          created_at: string;
        };
      };
      // add more tables here later, e.g., products, shops, orders
    };
    Views: {
      sales_summary_view: {
        Row: {
          total_revenue: number;
          total_customers: number;
          active_shops: number;
          product_categories: number;
        };
      };
      daily_sales_view: {
        Row: {
          region: string;
          total_sales: number;
          transactions: number;
        };
      };
      damaged_goods_view: {
        Row: {
          product_name: string;
          quantity: number;
        };
      };
      expiring_goods_view: {
        Row: {
          product_name: string;
          days_to_expiry: number;
        };
      };
      low_stock_view: {
        Row: {
          product_name: string;
          quantity: number;
        };
      };
      returns_view: {
        Row: {
          product_name: string;
          quantity: number;
        };
      };
    };
  };
};
