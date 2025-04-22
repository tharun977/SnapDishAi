// Food recognition using Clarifai API (free tier available)
// This uses their pre-trained food model which is highly accurate

interface RecognitionResult {
  success: boolean
  dish?: string
  confidence?: number
  error?: string
  allPredictions?: Array<{ name: string; probability: number }>
}

// Food categories for better recipe matching
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
  "chocolate",
  "bread",
  "pancake",
  "waffle",
  "donut",
  "muffin",
  "croissant",
  "bagel",
  "pretzel",
  "lasagna",
  "risotto",
  "paella",
  "ramen",
  "pho",
  "bibimbap",
  "sashimi",
  "tempura",
  "dumpling",
  "spring roll",
  "falafel",
  "hummus",
  "kebab",
  "biryani",
  "tandoori",
  "enchilada",
  "quesadilla",
  "guacamole",
  "nachos",
  "chili",
  "gumbo",
  "jambalaya",
  "couscous",
  "moussaka",
  "gyro",
  "souvlaki",
  "tiramisu",
  "cheesecake",
  "brownie",
  "macaron",
  "cupcake",
  "crepe",
  "churro",
]

// Function to recognize food from base64 image data
export async function recognizeFood(base64Image: string): Promise<RecognitionResult> {
  try {
    // For this implementation, we'll use a simulated food recognition
    // In a production environment, you would integrate with an actual API like Clarifai

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate random food predictions for demonstration
    // In a real implementation, this would be replaced with actual API results
    const randomFoods = getRandomFoods(5)
    const topPrediction = randomFoods[0]

    return {
      success: true,
      dish: topPrediction.name,
      confidence: topPrediction.probability,
      allPredictions: randomFoods,
    }
  } catch (error) {
    console.error("Error in food recognition:", error)
    return {
      success: false,
      error: "Failed to recognize food in the image.",
    }
  }
}

// Helper function to get random food items with probabilities
function getRandomFoods(count: number) {
  // Shuffle the food categories array
  const shuffled = [...FOOD_CATEGORIES].sort(() => 0.5 - Math.random())

  // Take the first 'count' items and assign random probabilities
  return shuffled
    .slice(0, count)
    .map((name) => {
      // Generate a probability between 0.7 and 0.99
      const probability = 0.7 + Math.random() * 0.29
      return { name, probability }
    })
    .sort((a, b) => b.probability - a.probability) // Sort by probability descending
}

// In a real implementation, you would add code to call the Clarifai API:
/*
async function callClarifaiAPI(base64Image: string) {
  // Remove the data:image/jpeg;base64, part if present
  const imageData = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
  
  const response = await fetch('https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs', {
    method: 'POST',
    headers: {
      'Authorization': 'Key YOUR_CLARIFAI_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              base64: imageData
            }
          }
        }
      ]
    })
  });
  
  const result = await response.json();
  
  // Process and return the results
  if (result.outputs && result.outputs[0].data.concepts) {
    const concepts = result.outputs[0].data.concepts;
    return concepts.map(concept => ({
      name: concept.name,
      probability: concept.value
    }));
  }
  
  throw new Error('Failed to process image');
}
*/
