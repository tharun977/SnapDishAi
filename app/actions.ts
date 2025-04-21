"use server"

import { type Recipe, searchRecipeByName, getFallbackRecipe } from "@/lib/api/recipe-service"

// Store for recipes (simulating a database in memory for now)
const recipeStore: Record<string, Recipe> = {}

// Simulating a database fetch function for a recipe by ID
export async function getRecipeById(id: string) {
  // Check if we have this recipe in our store
  if (recipeStore[id]) {
    return recipeStore[id]
  }

  // For demo purposes, return a default recipe if not found
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

// Simulating checking if the recipe is saved by the user (authentication not implemented here)
export async function isRecipeSaved(id: string) {
  // Logic to check if the recipe is saved (this would usually involve a database or user session check)
  return false // Assuming recipe is not saved (adjust as needed)
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

    // Convert the image file to a data URL for storage
    const imageDataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(imageFile)
    })

    // Simple food recognition based on image filename
    // In a real app, you'd use a proper image recognition API
    const fileName = imageFile.name.toLowerCase()

    // List of common food items to check against the filename
    const foodItems = [
      "pizza",
      "pasta",
      "burger",
      "salad",
      "sushi",
      "steak",
      "chicken",
      "fish",
      "soup",
      "sandwich",
      "taco",
      "burrito",
      "curry",
      "rice",
      "noodle",
      "cake",
      "cookie",
      "pie",
      "ice cream",
      "chocolate",
    ]

    // Try to find a match in the filename
    let recognizedDish = foodItems.find((food) => fileName.includes(food))

    // If no match in filename, use a default or random food item
    if (!recognizedDish) {
      // Extract potential food name from filename by removing extension and special chars
      const potentialName = fileName
        .replace(/\.[^/.]+$/, "") // Remove file extension
        .replace(/[_-]/g, " ") // Replace underscores and hyphens with spaces
        .trim()

      // If the potential name seems reasonable (not too short, not just "image")
      if (potentialName.length > 3 && !["image", "img", "photo", "pic"].includes(potentialName)) {
        recognizedDish = potentialName
      } else {
        // Use a random food item as fallback
        recognizedDish = foodItems[Math.floor(Math.random() * foodItems.length)]
      }
    }

    console.log(`Recognized dish: ${recognizedDish}`)

    // Search for a recipe based on the identified dish
    let recipe = await searchRecipeByName(recognizedDish)

    // If no recipe found, use a fallback
    if (!recipe) {
      recipe = getFallbackRecipe(recognizedDish)
    }

    // Generate a unique ID for this recipe
    const recipeId = `recipe-${Date.now()}`

    // Store the recipe in our in-memory store with the image URL
    recipeStore[recipeId] = {
      ...recipe,
      id: recipeId,
      image_url: imageDataUrl, // Use the uploaded image as the recipe image
    }

    // Return the result
    return {
      success: true,
      recipeName: recognizedDish,
      recipeId: recipeId,
      imageUrl: imageDataUrl,
      confidence: 0.85, // Simulated confidence score
    }
  } catch (error) {
    console.error("Error identifying dish:", error)
    return {
      success: false,
      error: "Failed to process the image. Please try again.",
    }
  }
}

// Function to save or unsave a recipe
export async function saveRecipe(recipeId: string) {
  // In a real app, this would interact with the database
  // For now, we'll simulate the behavior

  try {
    // Simulate a server delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if the recipe is already saved
    const isSaved = await isRecipeSaved(recipeId)

    // Toggle the saved state (in a real app, this would update the database)
    // Here we're just returning the opposite of the current state

    return {
      success: true,
      saved: !isSaved,
      error: null,
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
  // Simulate fetching user profile from database
  return {
    id: "user123",
    username: "foodlover",
    full_name: "Food Lover",
    avatar_url: "/placeholder.svg?height=100&width=100",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

// Function to get user saved recipes
export async function getUserSavedRecipes() {
  // Simulate fetching saved recipes from database
  return [
    {
      id: "recipe1",
      name: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
      image_url: "/placeholder.svg?height=200&width=300",
      ingredients: ["spaghetti", "beef", "tomato sauce"],
      instructions: ["Boil water", "Cook spaghetti", "Prepare sauce"],
      cooking_time: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      cuisine: "Italian",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

// Function to update user profile
export async function updateUserProfile(formData: FormData) {
  // Simulate updating user profile in database
  const fullName = formData.get("fullName")
  const username = formData.get("username")

  // Simulate a server delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    error: null,
  }
}
