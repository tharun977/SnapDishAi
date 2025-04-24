// This file integrates with Google's Gemini API for image recognition

interface GeminiRecognitionResult {
  success: boolean
  dish?: string
  confidence?: number
  error?: string
  description?: string
  allPredictions?: Array<{ name: string; probability: number }>
}

// Function to recognize food from base64 image data using Gemini
export async function recognizeFoodWithGemini(base64Image: string): Promise<GeminiRecognitionResult> {
  try {
    console.log("Starting Gemini food recognition")

    // Remove the data:image/jpeg;base64, part if present
    const imageData = base64Image.replace(/^data:image\/[a-z]+;base64,/, "")

    // Use the provided API key
    const apiKey = process.env.GEMINI_API_KEY || ""

    if (!apiKey) {
      throw new Error("Gemini API key is not configured")
    }

    // Updated API endpoint for Gemini 1.5 Flash (replacing the deprecated gemini-pro-vision)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Identify the food dish in this image. Respond in JSON format with the following structure: {"dish": "name of the dish", "description": "brief description of the dish", "confidence": number between 0 and 1 representing your confidence}. Only respond with this JSON object and nothing else.',
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageData,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()

    // Extract the text from the response
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error("No text in Gemini response")
    }

    // Try to parse the JSON response
    try {
      // Find JSON in the response (in case there's any extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? jsonMatch[0] : text

      const parsedResponse = JSON.parse(jsonText)

      // Extract the dish name, description, and confidence
      const dish = parsedResponse.dish || "Unknown dish"
      const description = parsedResponse.description || `A delicious ${dish} dish.`
      const confidence = parsedResponse.confidence || 0.9

      console.log("Gemini recognition complete:", dish, "with confidence", confidence)

      return {
        success: true,
        dish: dish,
        confidence: confidence,
        description: description,
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError)

      // If we can't parse the JSON, try to extract the dish name from the text
      const dishMatch = text.match(/dish[:\s]+"?([^"]+)"?/i) || text.match(/food[:\s]+"?([^"]+)"?/i)
      if (dishMatch && dishMatch[1]) {
        return {
          success: true,
          dish: dishMatch[1].trim(),
          confidence: 0.7,
          description: text.substring(0, 200) + "...",
        }
      }

      throw new Error("Failed to parse Gemini response")
    }
  } catch (error) {
    console.error("Error in Gemini food recognition:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process the image with Gemini",
    }
  }
}

// Fallback function that uses Groq if available
export async function recognizeFoodWithFallback(base64Image: string): Promise<GeminiRecognitionResult> {
  try {
    // First try with Gemini
    const geminiResult = await recognizeFoodWithGemini(base64Image)

    if (geminiResult.success) {
      return geminiResult
    }

    // If Gemini fails, we could add Groq integration here in the future
    // For now, return a generic error
    return {
      success: false,
      error: "Image recognition failed. Please try again with a clearer image of food.",
    }
  } catch (error) {
    console.error("All recognition methods failed:", error)
    return {
      success: false,
      error: "Image recognition service is currently unavailable. Please try again later.",
    }
  }
}
