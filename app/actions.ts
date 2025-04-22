"use server"

import { recognizeFood } from "@/lib/ai/food-recognition"
import { type Recipe, searchRecipeByName, getFallbackRecipe } from "@/lib/api/recipe-service"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"

// In-memory recipe store
const recipeStore: Record<string, Recipe> = {}

// In-memory saved recipe map: userId -> Set of recipeIds
const savedRecipes: Record<string, Set<string>> = {}

// Fetch recipe by ID
export async function getRecipeById(id: string): Promise<Recipe> {
  try {
    if (recipeStore[id]) {
      return recipeStore[id]
    }

    // Fallback recipe
    return {
      id,
      name: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
      ingredients: ["spaghetti", "beef", "tomato sauce"],
      instructions: ["Boil water", "Cook spaghetti", "Prepare sauce"],
      cooking_time: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      image_url: "/placeholder.svg?height=400&width=600",
    }
  } catch (error) {
    console.error("getRecipeById error:", error)
    return {
      id,
      name: "Spaghetti Bolognese",
      description: "A classic fallback recipe.",
      ingredients: ["spaghetti", "beef", "tomato sauce"],
      instructions: ["Boil water", "Cook spaghetti", "Prepare sauce"],
      cooking_time: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      image_url: "/placeholder.svg?height=400&width=600",
    }
  }
}

// Check if a recipe is saved
export async function isRecipeSaved(id: string): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return false
    return savedRecipes[session.user.id]?.has(id) || false
  } catch (error) {
    console.error("isRecipeSaved error:", error)
    return false
  }
}

// Identify dish from uploaded image
export async function identifyDish(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File
    if (!imageFile) {
      return { success: false, error: "No image provided" }
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`

    const recognitionResult = await recognizeFood(base64Image)
    if (!recognitionResult.success) {
      return { success: false, error: recognitionResult.error || "Could not identify the dish." }
    }

    const dishName = recognitionResult.dish!
    const confidence = recognitionResult.confidence!

    let recipe = await searchRecipeByName(dishName)
    if (!recipe) {
      recipe = getFallbackRecipe(dishName)
    }

    const recipeId = uuidv4()
    const imageUrl = base64Image

    recipeStore[recipeId] = {
      ...recipe,
      id: recipeId,
      image_url: imageUrl,
    }

    return {
      success: true,
      recipeName: dishName,
      recipeId,
      imageUrl,
      confidence,
    }
  } catch (error) {
    console.error("identifyDish error:", error)
    return { success: false, error: "Image processing failed. Try again." }
  }
}

// Save or unsave a recipe
export async function saveRecipe(recipeId: string) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, saved: false, error: "Login required to save recipes." }
    }

    const userId = session.user.id
    savedRecipes[userId] ||= new Set()

    if (savedRecipes[userId].has(recipeId)) {
      savedRecipes[userId].delete(recipeId)
      return { success: true, saved: false, error: null }
    } else {
      savedRecipes[userId].add(recipeId)
      return { success: true, saved: true, error: null }
    }
  } catch (error) {
    console.error("saveRecipe error:", error)
    return { success: false, saved: false, error: "Failed to toggle save. Try again." }
  }
}

// Get user profile info
export async function getUserProfile() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return null

    return {
      id: session.user.id,
      username: session.user.email?.split("@")[0] || "user",
      full_name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
      avatar_url: session.user.user_metadata?.avatar_url || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("getUserProfile error:", error)
    return null
  }
}

// Get all saved recipes for the logged-in user
export async function getUserSavedRecipes(): Promise<Recipe[]> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return []

    const userId = session.user.id
    const recipeIds = savedRecipes[userId] || new Set()

    return Array.from(recipeIds)
      .map((id) => recipeStore[id])
      .filter((recipe): recipe is Recipe => Boolean(recipe))
  } catch (error) {
    console.error("getUserSavedRecipes error:", error)
    return []
  }
}

// Update user profile (mock)
export async function updateUserProfile(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Login required to update profile." }
    }

    // Profile update logic would go here...
    return { success: true, error: null }
  } catch (error) {
    console.error("updateUserProfile error:", error)
    return { success: false, error: "Unexpected error occurred." }
  }
}
