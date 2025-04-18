"use server"
import { revalidatePath } from "next/cache"

// Mock recipe database - in a real app, this would be a database
const recipeDatabase = [
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    image: "/placeholder.svg?height=400&width=600",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    ingredients: [
      "350g spaghetti",
      "150g pancetta or guanciale, diced",
      "3 large eggs",
      "75g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "Freshly ground black pepper",
      "Salt to taste",
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook the spaghetti according to package instructions until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together the eggs, Pecorino Romano, and Parmesan cheese. Season with black pepper.",
      "Reserve 1 cup of pasta water, then drain the pasta.",
      "Working quickly, add the hot pasta to the skillet with the pancetta, tossing to combine.",
      "Remove the skillet from heat and pour in the egg and cheese mixture, stirring constantly to create a creamy sauce. Add pasta water as needed to achieve desired consistency.",
      "Serve immediately with additional grated cheese and black pepper on top.",
    ],
    cookingTime: "20 minutes",
    difficulty: "Medium",
    servings: 4,
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    image: "/placeholder.svg?height=400&width=600",
    description: "A rich, moist chocolate cake that's perfect for any occasion.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 tsp baking soda",
      "1 tsp baking powder",
      "1 tsp salt",
      "2 eggs",
      "1 cup buttermilk",
      "1/2 cup vegetable oil",
      "2 tsp vanilla extract",
      "1 cup hot coffee",
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
      "In a large bowl, combine flour, sugar, cocoa, baking soda, baking powder, and salt.",
      "Add eggs, buttermilk, oil, and vanilla; beat on medium speed for 2 minutes.",
      "Stir in hot coffee (batter will be thin). Pour into prepared pans.",
      "Bake for 30-35 minutes or until a toothpick inserted in center comes out clean.",
      "Cool in pans for 10 minutes; remove to wire racks to cool completely.",
      "Frost with your favorite chocolate frosting.",
    ],
    cookingTime: "45 minutes",
    difficulty: "Easy",
    servings: 12,
  },
  {
    id: "chicken-curry",
    name: "Chicken Curry",
    image: "/placeholder.svg?height=400&width=600",
    description: "A flavorful Indian-inspired curry with tender chicken pieces in a rich sauce.",
    ingredients: [
      "1 kg chicken, cut into pieces",
      "2 onions, finely chopped",
      "3 tomatoes, pureed",
      "4 cloves garlic, minced",
      "1 inch ginger, grated",
      "2 tbsp curry powder",
      "1 tsp turmeric powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp red chili powder",
      "1/2 cup yogurt",
      "2 tbsp vegetable oil",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    instructions: [
      "Heat oil in a large pot over medium heat. Add onions and sauté until golden brown.",
      "Add garlic and ginger, cook for 1 minute until fragrant.",
      "Add all the spices and cook for another minute, stirring constantly.",
      "Add chicken pieces and cook until they start to brown, about 5 minutes.",
      "Add tomato puree and salt. Cover and simmer for 10 minutes.",
      "Stir in yogurt and cook for another 15-20 minutes until chicken is tender and sauce has thickened.",
      "Garnish with fresh cilantro and serve hot with rice or naan bread.",
    ],
    cookingTime: "45 minutes",
    difficulty: "Medium",
    servings: 4,
  },
]

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

    // In a real application, you would use the AI SDK to analyze the image
    // For this demo, we'll simulate AI identification by randomly selecting a recipe

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Randomly select a recipe from our database
    const randomIndex = Math.floor(Math.random() * recipeDatabase.length)
    const identifiedRecipe = recipeDatabase[randomIndex]

    // In a real app, you would use vision models to identify the dish
    // Example (commented out as we don't have actual API keys):
    /*
    const result = await generateImage({
      model: openai("gpt-4-vision"),
      prompt: "Identify this food dish and provide its name",
      images: [dataUrl]
    });
    
    // Then match the identified dish name with your recipe database
    const matchedRecipe = recipeDatabase.find(recipe => 
      recipe.name.toLowerCase().includes(result.toLowerCase())
    );
    */

    revalidatePath("/recipe/[id]")

    return {
      success: true,
      recipeId: identifiedRecipe.id,
      recipeName: identifiedRecipe.name,
    }
  } catch (error) {
    console.error("Error identifying dish:", error)
    return { success: false, error: "Failed to process image" }
  }
}

export async function getRecipeById(id: string) {
  // In a real app, this would fetch from a database
  const recipe = recipeDatabase.find((recipe) => recipe.id === id)

  if (!recipe) {
    return null
  }

  return recipe
}
