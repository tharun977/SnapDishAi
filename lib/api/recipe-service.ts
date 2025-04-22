// TheMealDB API has a free tier that allows searching by meal name
const THEMEALDB_API_URL = "https://www.themealdb.com/api/json/v1/1"

export interface Recipe {
  id: string
  name: string
  description?: string
  image_url?: string
  ingredients: string[]
  instructions: string[]
  cooking_time?: string
  servings?: number
  difficulty?: string
  cuisine?: string
}

// Function to search for recipes by name using TheMealDB API
export async function searchRecipeByName(dishName: string): Promise<Recipe | null> {
  try {
    console.log(`Searching for recipe: ${dishName}`)

    // Search for meals by name
    const response = await fetch(`${THEMEALDB_API_URL}/search.php?s=${encodeURIComponent(dishName)}`)

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()

    if (!data.meals || data.meals.length === 0) {
      console.log(`No recipes found for: ${dishName}, trying a more generic search`)

      // Try a more generic search by taking just the first word
      const firstWord = dishName.split(" ")[0]
      if (firstWord !== dishName) {
        return searchRecipeByName(firstWord)
      }

      return null
    }

    // Get the first meal from the results
    const meal = data.meals[0]

    // Extract ingredients and measures
    const ingredients: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`)
      }
    }

    // Split instructions into steps
    const instructionsText = meal.strInstructions || ""
    const instructions = instructionsText
      .split(/\r\n|\r|\n/)
      .filter((step: string) => step.trim() !== "")
      .map((step: string) => step.trim())

    // Create a recipe object
    const recipe: Recipe = {
      id: meal.idMeal,
      name: meal.strMeal,
      description: `A delicious ${meal.strCategory} dish from ${meal.strArea} cuisine.`,
      image_url: meal.strMealThumb,
      ingredients,
      instructions,
      cooking_time: estimateCookingTime(instructions, ingredients),
      servings: estimateServings(ingredients),
      difficulty: estimateDifficulty(instructions, ingredients),
      cuisine: meal.strArea,
    }

    return recipe
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return null
  }
}

// Helper function to estimate cooking time based on instructions and ingredients
function estimateCookingTime(instructions: string[], ingredients: string[]): string {
  // Count the number of steps and ingredients to estimate complexity
  const stepCount = instructions.length
  const ingredientCount = ingredients.length

  // Simple algorithm to estimate cooking time
  let baseTime = 15 // Base time in minutes

  // Add time based on number of steps
  baseTime += stepCount * 3

  // Add time based on number of ingredients
  baseTime += ingredientCount

  // Check for specific time-consuming cooking methods in instructions
  const timeConsumingMethods = ["simmer", "bake", "roast", "slow cook", "marinate", "chill", "refrigerate", "freeze"]
  for (const step of instructions) {
    for (const method of timeConsumingMethods) {
      if (step.toLowerCase().includes(method)) {
        // Add extra time for time-consuming methods
        if (method === "simmer" || method === "bake" || method === "roast") {
          baseTime += 30
        } else if (method === "slow cook") {
          baseTime += 120
        } else if (method === "marinate" || method === "chill" || method === "refrigerate" || method === "freeze") {
          baseTime += 60
        }
      }
    }
  }

  // Format the time
  if (baseTime < 30) {
    return `${baseTime} minutes`
  } else if (baseTime < 60) {
    return `${baseTime} minutes`
  } else {
    const hours = Math.floor(baseTime / 60)
    const minutes = baseTime % 60
    if (minutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`
    }
  }
}

// Helper function to estimate servings based on ingredients
function estimateServings(ingredients: string[]): number {
  // Look for explicit serving information in ingredients
  for (const ingredient of ingredients) {
    const lowerIngredient = ingredient.toLowerCase()
    if (lowerIngredient.includes("serv")) {
      const match = lowerIngredient.match(/\d+/)
      if (match) {
        return Number.parseInt(match[0], 10)
      }
    }
  }

  // Default estimate based on ingredient count
  const ingredientCount = ingredients.length
  if (ingredientCount <= 5) {
    return 2
  } else if (ingredientCount <= 10) {
    return 4
  } else {
    return 6
  }
}

// Helper function to estimate difficulty based on instructions and ingredients
function estimateDifficulty(instructions: string[], ingredients: string[]): string {
  // Count the number of steps and ingredients to estimate complexity
  const stepCount = instructions.length
  const ingredientCount = ingredients.length

  // Calculate a difficulty score
  let difficultyScore = 0

  // Add score based on number of steps
  if (stepCount <= 5) {
    difficultyScore += 1
  } else if (stepCount <= 10) {
    difficultyScore += 2
  } else {
    difficultyScore += 3
  }

  // Add score based on number of ingredients
  if (ingredientCount <= 5) {
    difficultyScore += 1
  } else if (ingredientCount <= 10) {
    difficultyScore += 2
  } else {
    difficultyScore += 3
  }

  // Check for complex cooking techniques in instructions
  const complexTechniques = [
    "knead",
    "fold",
    "whip",
    "temper",
    "caramelize",
    "reduce",
    "deglaze",
    "blanch",
    "braise",
    "sous vide",
  ]
  for (const step of instructions) {
    for (const technique of complexTechniques) {
      if (step.toLowerCase().includes(technique)) {
        difficultyScore += 1
        break
      }
    }
  }

  // Determine difficulty level
  if (difficultyScore <= 3) {
    return "Easy"
  } else if (difficultyScore <= 6) {
    return "Medium"
  } else {
    return "Hard"
  }
}

// Expanded fallback recipes for better coverage
const fallbackRecipes: Record<string, Recipe> = {
  default: {
    id: "default-recipe",
    name: "Simple Dish",
    description: "A simple and delicious dish that anyone can make.",
    ingredients: [
      "2 cups of main ingredient",
      "1 tablespoon of oil",
      "Salt and pepper to taste",
      "Your favorite herbs and spices",
    ],
    instructions: [
      "Prepare all ingredients by washing and cutting them as needed.",
      "Heat oil in a pan over medium heat.",
      "Add your main ingredients and cook until done.",
      "Season with salt, pepper, and your favorite herbs and spices.",
      "Serve hot and enjoy!",
    ],
    cooking_time: "20 minutes",
    servings: 2,
    difficulty: "Easy",
  },
  pasta: {
    id: "pasta-simple",
    name: "Simple Pasta",
    description: "A quick and easy pasta dish perfect for weeknight dinners.",
    ingredients: [
      "8 oz pasta",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1 can (14.5 oz) diced tomatoes",
      "Salt and pepper to taste",
      "Fresh basil leaves",
      "Grated Parmesan cheese",
    ],
    instructions: [
      "Cook pasta according to package directions until al dente.",
      "While pasta cooks, heat olive oil in a large skillet over medium heat.",
      "Add garlic and cook until fragrant, about 30 seconds.",
      "Add diced tomatoes and simmer for 5-7 minutes.",
      "Season with salt and pepper to taste.",
      "Drain pasta and add to the sauce, tossing to coat.",
      "Garnish with fresh basil and Parmesan cheese before serving.",
    ],
    cooking_time: "15 minutes",
    servings: 2,
    difficulty: "Easy",
    cuisine: "Italian",
  },
  pizza: {
    id: "homemade-pizza",
    name: "Homemade Pizza",
    description: "A delicious homemade pizza with your favorite toppings.",
    ingredients: [
      "1 pizza dough (store-bought or homemade)",
      "1/2 cup pizza sauce",
      "2 cups shredded mozzarella cheese",
      "Your favorite toppings (pepperoni, mushrooms, bell peppers, etc.)",
      "1 tablespoon olive oil",
      "1 teaspoon Italian seasoning",
    ],
    instructions: [
      "Preheat your oven to 475°F (245°C).",
      "Roll out the pizza dough on a floured surface to your desired thickness.",
      "Transfer the dough to a pizza pan or baking sheet.",
      "Spread pizza sauce evenly over the dough, leaving a small border for the crust.",
      "Sprinkle cheese over the sauce.",
      "Add your favorite toppings.",
      "Brush the crust with olive oil and sprinkle with Italian seasoning.",
      "Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.",
      "Let cool for a few minutes before slicing and serving.",
    ],
    cooking_time: "25 minutes",
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
  },
  burger: {
    id: "classic-burger",
    name: "Classic Burger",
    description: "A juicy homemade burger with all the fixings.",
    ingredients: [
      "1 lb ground beef (80/20 lean-to-fat ratio)",
      "Salt and pepper to taste",
      "4 hamburger buns",
      "4 slices cheese (American, cheddar, or your preference)",
      "Lettuce leaves",
      "Tomato slices",
      "Onion slices",
      "Pickles",
      "Ketchup, mustard, and mayonnaise",
    ],
    instructions: [
      "Divide the ground beef into 4 equal portions and form into patties about 1/2 inch thick.",
      "Press a slight indent in the center of each patty with your thumb to prevent it from bulging when cooking.",
      "Season both sides generously with salt and pepper.",
      "Heat a skillet or grill to medium-high heat.",
      "Cook the patties for 3-4 minutes on each side for medium doneness.",
      "Add cheese slices on top of the patties during the last minute of cooking.",
      "Toast the hamburger buns lightly if desired.",
      "Assemble the burgers with your favorite condiments and toppings.",
    ],
    cooking_time: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    cuisine: "American",
  },
  salad: {
    id: "simple-salad",
    name: "Fresh Garden Salad",
    description: "A refreshing salad with crisp vegetables and a tangy dressing.",
    ingredients: [
      "4 cups mixed salad greens",
      "1 cucumber, sliced",
      "1 tomato, diced",
      "1/2 red onion, thinly sliced",
      "1/4 cup olive oil",
      "2 tablespoons balsamic vinegar",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Wash and dry all vegetables thoroughly.",
      "In a large bowl, combine the salad greens, cucumber, tomato, and red onion.",
      "In a small bowl, whisk together olive oil, balsamic vinegar, salt, and pepper.",
      "Pour the dressing over the salad just before serving.",
      "Toss gently to coat all ingredients with the dressing.",
    ],
    cooking_time: "10 minutes",
    servings: 4,
    difficulty: "Easy",
    cuisine: "International",
  },
  chicken: {
    id: "simple-chicken",
    name: "Simple Grilled Chicken",
    description: "Juicy grilled chicken with herbs and spices.",
    ingredients: [
      "4 chicken breasts",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1 teaspoon dried oregano",
      "1 teaspoon dried basil",
      "1/2 teaspoon paprika",
      "Salt and pepper to taste",
      "Lemon wedges for serving",
    ],
    instructions: [
      "In a bowl, mix olive oil, garlic, oregano, basil, paprika, salt, and pepper.",
      "Place chicken breasts in a shallow dish and pour the marinade over them.",
      "Cover and refrigerate for at least 30 minutes (or up to 4 hours).",
      "Preheat grill or grill pan to medium-high heat.",
      "Grill chicken for 6-7 minutes per side, or until internal temperature reaches 165°F (74°C).",
      "Let chicken rest for 5 minutes before serving.",
      "Serve with lemon wedges on the side.",
    ],
    cooking_time: "25 minutes",
    servings: 4,
    difficulty: "Easy",
    cuisine: "International",
  },
  sushi: {
    id: "simple-sushi-roll",
    name: "Simple Sushi Roll",
    description: "Easy homemade sushi rolls with fresh ingredients.",
    ingredients: [
      "2 cups sushi rice",
      "3 cups water",
      "1/4 cup rice vinegar",
      "2 tablespoons sugar",
      "1 teaspoon salt",
      "4 sheets nori (seaweed)",
      "1 cucumber, julienned",
      "1 avocado, sliced",
      "1 carrot, julienned",
      "Soy sauce for serving",
      "Wasabi and pickled ginger (optional)",
    ],
    instructions: [
      "Rinse the rice until water runs clear, then cook according to package instructions.",
      "In a small bowl, mix rice vinegar, sugar, and salt until dissolved.",
      "When rice is cooked, transfer to a large bowl and gently fold in the vinegar mixture.",
      "Let rice cool to room temperature.",
      "Place a sheet of nori on a bamboo sushi mat.",
      "Spread a thin layer of rice over the nori, leaving a 1-inch border at the top.",
      "Arrange cucumber, avocado, and carrot in a line across the center of the rice.",
      "Roll the sushi tightly using the bamboo mat, applying gentle pressure.",
      "Seal the edge with a little water.",
      "Use a sharp knife to cut the roll into 6-8 pieces.",
      "Serve with soy sauce, wasabi, and pickled ginger if desired.",
    ],
    cooking_time: "45 minutes",
    servings: 4,
    difficulty: "Medium",
    cuisine: "Japanese",
  },
}

export function getFallbackRecipe(dishName: string): Recipe {
  // Convert dish name to lowercase for matching
  const lowerDishName = dishName.toLowerCase()

  // Check if we have a specific fallback for this dish
  for (const [key, recipe] of Object.entries(fallbackRecipes)) {
    if (lowerDishName.includes(key)) {
      // Customize the fallback recipe with the identified dish name
      return {
        ...recipe,
        name: dishName.charAt(0).toUpperCase() + dishName.slice(1),
        description: `A delicious ${dishName} recipe.`,
      }
    }
  }

  // Return the default recipe if no specific match
  return {
    ...fallbackRecipes.default,
    name: dishName.charAt(0).toUpperCase() + dishName.slice(1),
    description: `A delicious ${dishName} recipe.`,
  }
}
