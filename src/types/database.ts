export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      damaged_goods: {
        Row: {
          id: number;
          product_id: number | null;
          quantity: number;
          reason: string | null;
          recorded_at: string | null;
          recorded_by: string | null;
          shop_id: number | null;
        };
        Insert: {
          id?: number;
          product_id?: number | null;
          quantity: number;
          reason?: string | null;
          recorded_at?: string | null;
          recorded_by?: string | null;
          shop_id?: number | null;
        };
        Update: {
          id?: number;
          product_id?: number | null;
          quantity?: number;
          reason?: string | null;
          recorded_at?: string | null;
          recorded_by?: string | null;
          shop_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "damaged_goods_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "damaged_goods_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "low_stock";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "damaged_goods_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "sales_summary";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "damaged_goods_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          },
        ];
      };
      inventory_movements: {
        Row: {
          created_at: string | null;
          id: number;
          movement_type: string | null;
          performed_by: string | null;
          product_id: number | null;
          quantity: number | null;
          reason: string | null;
          shop_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          movement_type?: string | null;
          performed_by?: string | null;
          product_id?: number | null;
          quantity?: number | null;
          reason?: string | null;
          shop_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          movement_type?: string | null;
          performed_by?: string | null;
          product_id?: number | null;
          quantity?: number | null;
          reason?: string | null;
          shop_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_movements_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "low_stock";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "inventory_movements_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "sales_summary";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "inventory_movements_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          },
        ];
      };
      pos_users: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          role: string | null;
          shop_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          role?: string | null;
          shop_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          role?: string | null;
          shop_id?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          barcode: string | null;
          category: string;
          created_at: string | null;
          expiry_date: string | null;
          id: number;
          name: string;
          price: number;
          shop_id: number | null;
          stock: number | null;
        };
        Insert: {
          barcode?: string | null;
          category: string;
          created_at?: string | null;
          expiry_date?: string | null;
          id?: number;
          name: string;
          price: number;
          shop_id?: number | null;
          stock?: number | null;
        };
        Update: {
          barcode?: string | null;
          category?: string;
          created_at?: string | null;
          expiry_date?: string | null;
          id?: number;
          name?: string;
          price?: number;
          shop_id?: number | null;
          stock?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "low_stock";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "products_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "sales_summary";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "products_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          role: string | null;
          shop_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          role?: string | null;
          shop_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          role?: string | null;
          shop_id?: string | null;
        };
        Relationships: [];
      };
      sales: {
        Row: {
          created_at: string | null;
          id: string;
          items: Json | null;
          product_id: string | null;
          quantity: number;
          shop_id: string | null;
          total: number;
          transaction_date: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          items?: Json | null;
          product_id?: string | null;
          quantity: number;
          shop_id?: string | null;
          total: number;
          transaction_date?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          items?: Json | null;
          product_id?: string | null;
          quantity?: number;
          shop_id?: string | null;
          total?: number;
          transaction_date?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sales_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "pos_users";
            referencedColumns: ["id"];
          },
        ];
      };
      shelves: {
        Row: {
          description: string | null;
          id: number;
          shelf_code: string | null;
          shop_id: number | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          shelf_code?: string | null;
          shop_id?: number | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          shelf_code?: string | null;
          shop_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "shelves_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "low_stock";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "shelves_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "sales_summary";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "shelves_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          },
        ];
      };
      shop_expenses: {
        Row: {
          amount: number;
          category: string;
          expense_date: string | null;
          id: number;
          notes: string | null;
          shop_id: number | null;
        };
        Insert: {
          amount: number;
          category: string;
          expense_date?: string | null;
          id?: number;
          notes?: string | null;
          shop_id?: number | null;
        };
        Update: {
          amount?: number;
          category?: string;
          expense_date?: string | null;
          id?: number;
          notes?: string | null;
          shop_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "shop_expenses_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "low_stock";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "shop_expenses_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "sales_summary";
            referencedColumns: ["shop_id"];
          },
          {
            foreignKeyName: "shop_expenses_shop_id_fkey";
            columns: ["shop_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          },
        ];
      };
      shops: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
          location: string | null;
          phone: string | null;
          shop_name: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          location?: string | null;
          phone?: string | null;
          shop_name: string;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          location?: string | null;
          phone?: string | null;
          shop_name?: string;
        };
        Relationships: [];
      };
      staging_shops: {
        Row: {
          address: string | null;
          email: string | null;
          name: string | null;
          phone: string | null;
          region: string | null;
        };
        Insert: {
          address?: string | null;
          email?: string | null;
          name?: string | null;
          phone?: string | null;
          region?: string | null;
        };
        Update: {
          address?: string | null;
          email?: string | null;
          name?: string | null;
          phone?: string | null;
          region?: string | null;
        };
        Relationships: [];
      };
      supplier_prompts: {
        Row: {
          created_at: string | null;
          id: number;
          item_id: number | null;
          message: string;
          status: string | null;
          supplier_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          item_id?: number | null;
          message: string;
          status?: string | null;
          supplier_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          item_id?: number | null;
          message?: string;
          status?: string | null;
          supplier_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "supplier_prompts_supplier_id_fkey";
            columns: ["supplier_id"];
            isOneToOne: false;
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      suppliers: {
        Row: {
          email: string | null;
          id: number;
          name: string;
          phone: string | null;
        };
        Insert: {
          email?: string | null;
          id?: never;
          name: string;
          phone?: string | null;
        };
        Update: {
          email?: string | null;
          id?: never;
          name?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      expiring_goods: {
        Row: {
          category: string | null;
          expiry_date: string | null;
          expiry_status: string | null;
          name: string | null;
          shop_name: string | null;
          stock: number | null;
        };
        Relationships: [];
      };
      low_stock: {
        Row: {
          category: string | null;
          needs_restock: boolean | null;
          product_name: string | null;
          shop_id: number | null;
          shop_name: string | null;
          stock: number | null;
        };
        Relationships: [];
      };
      sales_summary: {
        Row: {
          shop_id: number | null;
          shop_name: string | null;
          total_damaged_items: number | null;
          total_items_sold: number | null;
          total_restocked_items: number | null;
          total_sales_value: number | null;
          vat_collected: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      decrement_product_stock: {
        Args: { change_qty: number; pid: number };
        Returns: undefined;
      };
      import_shops: {
        Args: { data: Json };
        Returns: undefined;
      };
      upload_shops: {
        Args: { payload: Json };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
