export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dish_identifications: {
        Row: {
          id: string // UUID
          user_id: string | null // UUID
          image_url: string | null
          identified_dish: string | null
          recipe_id: string | null // UUID
          confidence_score: number | null
          created_at: string
        }
        Insert: {
          id?: string // UUID
          user_id?: string | null // UUID
          image_url?: string | null
          identified_dish?: string | null
          recipe_id?: string | null // UUID
          confidence_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string // UUID
          user_id?: string | null // UUID
          image_url?: string | null
          identified_dish?: string | null
          recipe_id?: string | null // UUID
          confidence_score?: number | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string // UUID
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string // UUID
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string // UUID
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string // UUID
          name: string
          description: string | null
          image_url: string | null
          ingredients: Json
          instructions: Json
          cooking_time: string | null
          difficulty: string | null
          servings: number | null
          cuisine: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string // UUID
          name: string
          description?: string | null
          image_url?: string | null
          ingredients: Json
          instructions: Json
          cooking_time?: string | null
          difficulty?: string | null
          servings?: number | null
          cuisine?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string // UUID
          name?: string
          description?: string | null
          image_url?: string | null
          ingredients?: Json
          instructions?: Json
          cooking_time?: string | null
          difficulty?: string | null
          servings?: number | null
          cuisine?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_recipes: {
        Row: {
          id: string // UUID
          user_id: string // UUID
          recipe_id: string // UUID
          created_at: string
        }
        Insert: {
          id?: string // UUID
          user_id: string // UUID
          recipe_id: string // UUID
          created_at?: string
        }
        Update: {
          id?: string // UUID
          user_id?: string // UUID
          recipe_id?: string // UUID
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
