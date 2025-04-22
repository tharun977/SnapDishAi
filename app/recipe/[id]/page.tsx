import Image from "next/image"
import Link from "next/link"
import { getRecipeById, isRecipeSaved } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, ChefHat, ArrowLeft, Share2, Printer } from "lucide-react"
import { SaveRecipeButton } from "@/components/recipe/save-recipe-button"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function RecipePage({ params }: { params: { id: string } }) {
  // Fetch the recipe by ID
  const recipe = await getRecipeById(params.id)

  // Create Supabase client and get the session
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the recipe is saved
  const saved = session ? await isRecipeSaved(params.id) : false

  if (!recipe) {
    // Handle the case where the recipe is not found
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">Recipe not found</h1>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  // Ensure ingredients and instructions are arrays
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === "object" && recipe.ingredients !== null
      ? Object.values(recipe.ingredients)
      : []

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === "object" && recipe.instructions !== null
      ? Object.values(recipe.instructions)
      : []

  // Check if the image_url is a data URL
  const isDataUrl = recipe.image_url?.startsWith("data:")

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      {/* Recipe Header */}
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-neutral-700 dark:text-neutral-300">AI Identified Recipe</span>
          </div>

          <h1 className="mb-4 text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {recipe.name}
          </h1>

          <p className="mb-6 text-lg text-neutral-700 dark:text-neutral-300">{recipe.description}</p>

          <div className="mb-6 flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Cooking Time</p>
                <p className="text-sm font-medium text-black dark:text-white">{recipe.cooking_time || "30 minutes"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Servings</p>
                <p className="text-sm font-medium text-black dark:text-white">{recipe.servings || 4} servings</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2">
                <ChefHat className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Difficulty</p>
                <p className="text-sm font-medium text-black dark:text-white">{recipe.difficulty || "Medium"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <SaveRecipeButton recipeId={recipe.id} initialSaved={saved} />
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="relative h-64 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 sm:h-80 md:h-96">
          {isDataUrl ? (
            // For data URLs, use img tag
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={recipe.image_url || "/placeholder.svg?height=400&width=600"}
              alt={recipe.name}
              className="h-full w-full object-cover"
            />
          ) : (
            // For regular URLs, use Next.js Image component
            <Image
              src={recipe.image_url || "/placeholder.svg?height=400&width=600"}
              alt={recipe.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1 border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">Ingredients</h2>
            <ul className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start border-b border-neutral-200 dark:border-neutral-800 pb-3 last:border-0 last:pb-0"
                >
                  <span className="mr-3 mt-1.5 block h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span className="text-neutral-700 dark:text-neutral-300">{ingredient as string}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">Instructions</h2>
            <ol className="space-y-6">
              {instructions.map((step, index) => (
                <li
                  key={index}
                  className="flex border-b border-neutral-200 dark:border-neutral-800 pb-6 last:border-0 last:pb-0"
                >
                  <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {index + 1}
                  </span>
                  <p className="text-neutral-700 dark:text-neutral-300 pt-1">{step as string}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md px-6 py-8 text-center">
        <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">Enjoy your meal!</h3>
        <SaveRecipeButton recipeId={recipe.id} initialSaved={saved} />
      </div>
    </div>
  )
}
