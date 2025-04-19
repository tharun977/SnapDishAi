"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { identifyFoodImage } from "@/lib/ai/vision"
import type { Tables } from "@/lib/supabase/database.types"
import { redirect } from "next/navigation"

export async function identifyDish(formData: FormData) {
  try {
    // Get the image file from the form data
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return { success: false, error: "No image provided" }
    }

    // Convert the image to base64 for AI processing
    const buffer = await imageFile.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString("base64")
    const dataUrl = `data:${imageFile.type};base64,${base64Image}`

    let dishName = "Unknown dish"
    let confidence = 0

    try {
      // Use OpenAI to identify the dish
      const result = await identifyFoodImage(dataUrl)
      dishName = result.dishName
      confidence = result.confidence
    } catch (error) {
      console.error("Error with AI vision:", error)
      // Continue with a fallback approach
    }

    // Get the Supabase client
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // Find a recipe that matches the identified dish
    const { data: recipes } = await supabase.from("recipes").select("*").ilike("name", `%${dishName}%`).limit(1)

    let recipeId: string | null = null
    let recipeName = dishName

    if (recipes && recipes.length > 0) {
      recipeId = recipes[0].id
      recipeName = recipes[0].name
    } else {
      // If no recipe found, we'll use a fallback recipe or create a new one
      // For now, we'll just return the dish name
      recipeName = dishName
    }

    // Store the identification in the database
    const { data: identification } = await supabase
      .from("dish_identifications")
      .insert({
        user_id: userId || null,
        image_url: null, // We're not storing the image for privacy
        identified_dish: dishName,
        recipe_id: recipeId,
        confidence_score: confidence,
      })
      .select()
      .single()

    revalidatePath("/recipe/[id]")

    return {
      success: true,
      recipeId: recipeId || "unknown",
      recipeName: recipeName,
      identificationId: identification?.id,
    }
  } catch (error) {
    console.error("Error identifying dish:", error)
    return { success: false, error: "Failed to process image" }
  }
}

export async function getRecipeById(id: string): Promise<Tables<"recipes"> | null> {
  try {
    const supabase = createServerSupabaseClient()

    if (id === "unknown") {
      // Return a default recipe if no match was found
      return null
    }

    const { data } = await supabase.from("recipes").select("*").eq("id", id).single()

    return data
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return null
  }
}

export async function saveRecipe(recipeId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Redirect to sign in if not authenticated
      redirect("/signin")
    }

    const userId = session.user.id

    // Check if already saved
    const { data: existingSave } = await supabase
      .from("user_recipes")
      .select("*")
      .eq("user_id", userId)
      .eq("recipe_id", recipeId)
      .maybeSingle()

    if (existingSave) {
      // Already saved, so we'll remove it (toggle behavior)
      await supabase.from("user_recipes").delete().eq("user_id", userId).eq("recipe_id", recipeId)

      return { success: true, saved: false }
    } else {
      // Save the recipe
      await supabase.from("user_recipes").insert({
        user_id: userId,
        recipe_id: recipeId,
      })

      return { success: true, saved: true }
    }
  } catch (error) {
    console.error("Error saving recipe:", error)
    return { success: false, error: "Failed to save recipe" }
  }
}

export async function isRecipeSaved(recipeId: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return false
    }

    const userId = session.user.id

    // Check if already saved
    const { data } = await supabase
      .from("user_recipes")
      .select("*")
      .eq("user_id", userId)
      .eq("recipe_id", recipeId)
      .maybeSingle()

    return !!data
  } catch (error) {
    console.error("Error checking if recipe is saved:", error)
    return false
  }
}

export async function getUserSavedRecipes() {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Redirect to sign in if not authenticated
      redirect("/signin")
    }

    const userId = session.user.id

    // Get saved recipes
    const { data } = await supabase
      .from("user_recipes")
      .select(`
        recipe_id,
        recipes:recipe_id (*)
      `)
      .eq("user_id", userId)

    return data?.map((item) => item.recipes) || []
  } catch (error) {
    console.error("Error fetching saved recipes:", error)
    return []
  }
}

export async function getUserProfile() {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return null
    }

    const userId = session.user.id

    // Get user profile
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single()

    return data
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    const userId = session.user.id
    const fullName = formData.get("fullName") as string
    const username = formData.get("username") as string

    // Update profile
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username: username,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/profile")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return { success: false, error: error.message }
  }
}
