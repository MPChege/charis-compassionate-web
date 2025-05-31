export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          created_at: string | null
          donation_type: string
          donor_email: string
          donor_name: string
          donor_phone: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          notes: string | null
          payment_method: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donation_type: string
          donor_email: string
          donor_name: string
          donor_phone?: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donation_type?: string
          donor_email?: string
          donor_name?: string
          donor_phone?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          notes?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      general_inquiries: {
        Row: {
          created_at: string | null
          email: string
          id: string
          interest: string | null
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          interest?: string | null
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          interest?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "general_inquiries_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partnership_inquiries: {
        Row: {
          contact_person: string
          created_at: string | null
          description: string | null
          email: string
          id: string
          notes: string | null
          organization_name: string
          organization_type: string | null
          partnership_type: string | null
          phone: string | null
          proposed_collaboration: string | null
          resources_offered: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
        }
        Insert: {
          contact_person: string
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          notes?: string | null
          organization_name: string
          organization_type?: string | null
          partnership_type?: string | null
          phone?: string | null
          proposed_collaboration?: string | null
          resources_offered?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Update: {
          contact_person?: string
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          notes?: string | null
          organization_name?: string
          organization_type?: string | null
          partnership_type?: string | null
          phone?: string | null
          proposed_collaboration?: string | null
          resources_offered?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partnership_inquiries_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          availability: string | null
          created_at: string | null
          email: string
          experience: string | null
          id: string
          motivation: string | null
          name: string
          notes: string | null
          phone: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          volunteer_areas: string[]
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          email: string
          experience?: string | null
          id?: string
          motivation?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          volunteer_areas: string[]
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          email?: string
          experience?: string | null
          id?: string
          motivation?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          volunteer_areas?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      application_status: "pending" | "approved" | "rejected" | "contacted"
      donation_frequency: "one_time" | "monthly" | "quarterly" | "annually"
      user_role: "admin" | "super_admin" | "volunteer_coordinator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "approved", "rejected", "contacted"],
      donation_frequency: ["one_time", "monthly", "quarterly", "annually"],
      user_role: ["admin", "super_admin", "volunteer_coordinator"],
    },
  },
} as const
