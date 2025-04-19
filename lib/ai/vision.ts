import OpenAI from "openai"

// Initialize the OpenAI client with proper error handling
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Please add OPENAI_API_KEY to your environment variables.")
  }

  return new OpenAI({ apiKey })
}

export async function identifyFoodImage(imageBase64: string): Promise<{ dishName: string; confidence: number }> {
  try {
    const openai = getOpenAIClient()

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a food identification expert. Identify the dish in the image with high accuracy. Return ONLY the dish name and your confidence level (0-1).",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "What dish is this? Identify it as specifically as possible." },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    })

    // Parse the response to extract dish name and confidence
    const content = response.choices[0]?.message?.content || ""

    // Simple parsing logic - in production, you'd want more robust parsing
    const dishMatch = content.match(/dish name:?\s*([^,\n]+)/i) || content.match(/([^,\n]+)/i)
    const confidenceMatch = content.match(/confidence:?\s*(0\.\d+|1\.0|1)/i) || [null, "0.7"]

    const dishName = dishMatch ? dishMatch[1].trim() : "Unknown dish"
    const confidence = confidenceMatch ? Number.parseFloat(confidenceMatch[1]) : 0.7

    return {
      dishName,
      confidence,
    }
  } catch (error: any) {
    console.error("Error identifying food image:", error)

    // Return a fallback response when OpenAI API fails
    return {
      dishName: "Unable to identify dish",
      confidence: 0,
    }
  }
}
