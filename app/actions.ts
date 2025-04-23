"use server"

import { recognizeFood } from "@/lib/ai/tensorflow-recognition"
import { detectFoodItems } from "@/lib/ai/yolo-detection"
import { searchRecipeByName, getFallbackRecipe } from "@/lib/api/recipe-service"
import type { Recipe } from "@/lib/api/recipe-service"
import { getSessionSafely } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"

// Store for recipes (simulating a database in memory)
const recipeStore: Record<string, Recipe> = {}

// Simulating a database fetch function for a recipe by ID
export async function getRecipeById(id: string) {
  try {
    // First check if we have this recipe in our store
    if (recipeStore[id]) {
      return recipeStore[id]
    }

    // If not in memory, return a default recipe
    return {
      id,
      name: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
      ingredients: ["spaghetti", "beef", "tomato sauce"],
      instructions: ["Boil water", "Cook spaghetti", "Prepare sauce"],
      cooking_time: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      image_url: "/placeholder.svg?height=400&width=600", // Sample image path
    }
  } catch (error) {
    console.error("Error in getRecipeById:", error)
    // Return a default recipe if error
    return {
      id,
      name: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
      ingredients: ["spaghetti", "beef", "tomato sauce"],
      instructions: ["Boil water", "Cook spaghetti", "Prepare sauce"],
      cooking_time: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      image_url: "/placeholder.svg?height=400&width=600", // Sample image path
    }
  }
}

// Checking if the recipe is saved by the user (in-memory implementation)
const savedRecipes: Record<string, Set<string>> = {} // userId -> Set of recipeIds

export async function isRecipeSaved(id: string) {
  try {
    const { user } = await getSessionSafely()

    if (!user) {
      return false
    }

    const userId = user.id

    // Check if the recipe is saved in our in-memory store
    return savedRecipes[userId]?.has(id) || false
  } catch (error) {
    console.error("Error checking if recipe is saved:", error)
    return false
  }
}

// Function to identify a dish from an image
export async function identifyDish(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File
    if (!imageFile) {
      return {
        success: false,
        error: "No image provided",
      }
    }

    // Convert the image file to a buffer for server-side processing
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Convert buffer to base64 for processing
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`

    console.log("Starting dish identification process")

    // Initialize foodItems array with a default value
    let foodItems: string[] = ["dish"]
    let confidence = 0.7 // Default confidence

    // Try with TensorFlow.js MobileNet first
    try {
      const recognitionResult = await recognizeFood(base64Image)
      console.log("Recognition result:", recognitionResult)

      // If MobileNet succeeds, use its result
      if (recognitionResult.success && recognitionResult.dish) {
        foodItems = [recognitionResult.dish]
        confidence = recognitionResult.confidence || 0.7
      }
    } catch (mobileNetError) {
      console.error("MobileNet recognition failed:", mobileNetError)
    }

    // If MobileNet didn't provide results, try with YOLO
    if (foodItems[0] === "dish") {
      try {
        console.log("Trying YOLO detection")
        const detectedItems = await detectFoodItems(base64Image)
        if (detectedItems && detectedItems.length > 0) {
          foodItems = detectedItems
        }
      } catch (yoloError) {
        console.error("YOLO detection failed:", yoloError)
      }
    }

    console.log("Final identified food items:", foodItems)

    // Try to get a recipe from an external API
    let recipe: Recipe | null = null
    try {
      recipe = await searchRecipeByName(foodItems[0])
    } catch (apiError) {
      console.error("Recipe API error:", apiError)
    }

    // If API fails, use fallback recipe
    if (!recipe) {
      console.log("Using fallback recipe generation")
      recipe = getFallbackRecipe(foodItems[0])
    }

    // Generate a UUID for this recipe
    const recipeId = uuidv4()

    // Store the recipe in our in-memory store with the image URL
    recipeStore[recipeId] = {
      ...recipe,
      id: recipeId,
      image_url: base64Image,
    }

    // Return the result
    return {
      success: true,
      recipeName: foodItems[0],
      recipeId: recipeId,
      imageUrl: base64Image,
      confidence: confidence,
    }
  } catch (error) {
    console.error("Error identifying dish:", error)
    return {
      success: false,
      error: "Failed to process the image. Please try again.",
    }
  }
}

// Function to save or unsave a recipe (in-memory implementation)
export async function saveRecipe(recipeId: string) {
  try {
    // Get the current user
    const { user } = await getSessionSafely()

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to save recipes",
        saved: false,
      }
    }

    const userId = user.id

    // Initialize the set if it doesn't exist
    if (!savedRecipes[userId]) {
      savedRecipes[userId] = new Set()
    }

    // Check if the recipe is already saved
    const isSaved = savedRecipes[userId].has(recipeId)

    if (isSaved) {
      // Unsave the recipe
      savedRecipes[userId].delete(recipeId)
      return {
        success: true,
        saved: false,
        error: null,
      }
    } else {
      // Save the recipe
      savedRecipes[userId].add(recipeId)
      return {
        success: true,
        saved: true,
        error: null,
      }
    }
  } catch (error) {
    console.error("Error saving recipe:", error)
    return {
      success: false,
      saved: false,
      error: "Failed to save recipe. Please try again.",
    }
  }
}

// Function to get user profile
export async function getUserProfile() {
  try {
    const { user } = await getSessionSafely()

    if (!user) {
      return null
    }

    // Return a mock profile
    return {
      id: user.id,
      username: user.email?.split("@")[0] || "user",
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
      avatar_url: user.user_metadata?.avatar_url || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}

// Function to get user saved recipes (in-memory implementation)
export async function getUserSavedRecipes() {
  try {
    const { user } = await getSessionSafely()

    if (!user) {
      return []
    }

    const userId = user.id

    // Get the saved recipe IDs for this user
    const userSavedRecipes = savedRecipes[userId] || new Set()

    // Return the recipes from our in-memory store
    return Array.from(userSavedRecipes)
      .map((id) => recipeStore[id])
      .filter((recipe) => recipe) // Filter out any undefined recipes
  } catch (error) {
    console.error("Error in getUserSavedRecipes:", error)
    return []
  }
}

// Function to update user profile (mock implementation)
export async function updateUserProfile(formData: FormData) {
  try {
    const { user } = await getSessionSafely()

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to update your profile",
      }
    }

    // Just return success since we're not actually updating anything
    return {
      success: true,
      error: null,
    }
  } catch (error) {
    console.error("Error in updateUserProfile:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}
