import type { Recipe } from "@/lib/api/recipe-service"

// Basic recipe templates for different food types
const recipeTemplates: Record<string, Partial<Recipe>> = {
  pizza: {
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
  pasta: {
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
  burger: {
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
  // Add more templates for other food types
}

// Function to generate a recipe based on identified food items
export function generateRecipe(foodItems: string[]): Recipe {
  // If no food items detected, return a default recipe
  if (!foodItems || foodItems.length === 0) {
    return {
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
    }
  }

  // Try to find a matching template for the first food item
  for (const item of foodItems) {
    const lowerItem = item.toLowerCase()
    for (const [key, template] of Object.entries(recipeTemplates)) {
      if (lowerItem.includes(key)) {
        return {
          id: `${key}-recipe`,
          ...template,
          name: `${item} Recipe`,
        } as Recipe
      }
    }
  }

  // If no specific template matches, create a generic recipe based on the first food item
  const mainItem = foodItems[0]
  return {
    id: `${mainItem.toLowerCase()}-recipe`,
    name: `${mainItem} Recipe`,
    description: `A delicious ${mainItem} recipe that's easy to make at home.`,
    ingredients: [
      `1 ${mainItem}`,
      "2 tablespoons olive oil",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Fresh herbs (parsley, basil, or cilantro)",
    ],
    instructions: [
      `Prepare the ${mainItem} by washing and cutting it as needed.`,
      "Heat olive oil in a pan over medium heat.",
      "Add onion and garlic, cook until softened.",
      `Add the ${mainItem} and cook until done.`,
      "Season with salt, pepper, and fresh herbs.",
      "Serve hot and enjoy!",
    ],
    cooking_time: "30 minutes",
    servings: 2,
    difficulty: "Medium",
  }
}
