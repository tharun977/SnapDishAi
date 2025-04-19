export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dish_identifications: {
        Row: {
          id: string
          user_id: string | null
          image_url: string | null
          identified_dish: string | null
          recipe_id: string | null
          confidence_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          image_url?: string | null
          identified_dish?: string | null
          recipe_id?: string | null
          confidence_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          image_url?: string | null
          identified_dish?: string | null
          recipe_id?: string | null
          confidence_score?: number | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
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
          id?: string
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
          id?: string
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
          id: string
          user_id: string
          recipe_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipe_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recipe_id?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
