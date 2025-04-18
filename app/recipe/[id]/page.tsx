import Image from "next/image"
import Link from "next/link"
import { getRecipeById } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, ChefHat, ArrowLeft, Share2, Bookmark, Printer } from "lucide-react"

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)

  if (!recipe) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-4 text-2xl font-bold">Recipe not found</h1>
        <p className="mb-8 text-neutral-400">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button className="rounded-full bg-white text-black hover:bg-neutral-200">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="mb-8 inline-flex items-center text-neutral-400 hover:text-white transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      {/* Recipe Header */}
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full border border-neutral-800 bg-black/50 px-3 py-1 text-sm backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-neutral-300">AI Identified Recipe</span>
          </div>

          <h1 className="mb-4 text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {recipe.name}
          </h1>

          <p className="mb-6 text-lg text-neutral-300">{recipe.description}</p>

          <div className="mb-6 flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-900/30 p-2">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Cooking Time</p>
                <p className="text-sm font-medium">{recipe.cookingTime}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-900/30 p-2">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Servings</p>
                <p className="text-sm font-medium">{recipe.servings} servings</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-purple-900/30 p-2">
                <ChefHat className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Difficulty</p>
                <p className="text-sm font-medium">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-800 bg-black text-neutral-300 hover:bg-neutral-900 hover:text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-800 bg-black text-neutral-300 hover:bg-neutral-900 hover:text-white"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-800 bg-black text-neutral-300 hover:bg-neutral-900 hover:text-white"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="relative h-64 overflow-hidden rounded-xl border border-neutral-800 sm:h-80 md:h-96">
          <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" priority />
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1 border-neutral-800 bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-semibold">Ingredients</h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                  <span className="mr-3 mt-1.5 block h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  <span className="text-neutral-300">{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-neutral-800 bg-black/50 backdrop-blur-md">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-semibold">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex border-b border-neutral-800 pb-6 last:border-0 last:pb-0">
                  <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-900/30 text-sm font-medium text-purple-400">
                    {index + 1}
                  </span>
                  <p className="text-neutral-300 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-xl border border-neutral-800 bg-gradient-to-b from-purple-900/20 to-black p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Want to identify another dish?</h2>
        <p className="mb-6 text-neutral-400">Upload another food photo and get the recipe instantly.</p>
        <Link href="/">
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-neutral-200">
            Upload Another Photo
          </Button>
        </Link>
      </div>
    </div>
  )
}
