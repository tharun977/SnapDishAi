// Food categories that our model can recognize
const FOOD_CATEGORIES = [
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
  "bread",
]

interface RecognitionResult {
  success: boolean
  dish?: string
  confidence?: number
  error?: string
  allPredictions?: Array<{ name: string; probability: number }>
}

// Function to recognize food from an image
export async function recognizeFood(imageData: string): Promise<RecognitionResult> {
  try {
    console.log("Starting food recognition")

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a random food prediction
    const randomIndex = Math.floor(Math.random() * FOOD_CATEGORIES.length)
    const randomFood = FOOD_CATEGORIES[randomIndex]

    // Generate a random confidence score between 0.7 and 0.99
    const confidence = 0.7 + Math.random() * 0.29

    // Generate additional predictions with lower confidence
    const allPredictions = [{ name: randomFood, probability: confidence }]

    // Add 2-4 more predictions with lower confidence
    const numAdditionalPredictions = 2 + Math.floor(Math.random() * 3)
    for (let i = 0; i < numAdditionalPredictions; i++) {
      const idx = (randomIndex + i + 1) % FOOD_CATEGORIES.length
      const prob = Math.max(0.1, confidence - (0.1 + Math.random() * 0.3))
      allPredictions.push({
        name: FOOD_CATEGORIES[idx],
        probability: prob,
      })
    }

    // Sort by probability
    allPredictions.sort((a, b) => b.probability - a.probability)

    console.log("Recognition complete:", randomFood, "with confidence", confidence)

    return {
      success: true,
      dish: randomFood,
      confidence: confidence,
      allPredictions: allPredictions,
    }
  } catch (error) {
    console.error("Error in food recognition:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process the image",
    }
  }
}
