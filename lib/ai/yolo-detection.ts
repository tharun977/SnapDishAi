// Food-related class names that our detection can identify
const FOOD_CLASS_NAMES = [
  "pizza",
  "hot dog",
  "sandwich",
  "burger",
  "banana",
  "apple",
  "orange",
  "broccoli",
  "carrot",
  "donut",
  "cake",
  "bowl",
  "salad",
  "sushi",
  "pasta",
  "steak",
  "soup",
  "rice",
  "bread",
  "cookie",
]

// Function to detect food items in an image
export async function detectFoodItems(imageData: string): Promise<string[]> {
  try {
    console.log("Starting mock food detection")

    // Simulate detection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return random food items (1-3 items)
    const numItems = Math.floor(Math.random() * 3) + 1
    const detectedItems: string[] = []

    for (let i = 0; i < numItems; i++) {
      const randomIndex = Math.floor(Math.random() * FOOD_CLASS_NAMES.length)
      const foodItem = FOOD_CLASS_NAMES[randomIndex]

      // Avoid duplicates
      if (!detectedItems.includes(foodItem)) {
        detectedItems.push(foodItem)
      }
    }

    console.log("Detected food items:", detectedItems)
    return detectedItems
  } catch (error) {
    console.error("Error in food detection:", error)
    // Return a default food item to prevent further errors
    return ["dish"]
  }
}
