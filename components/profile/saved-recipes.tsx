import Link from "next/link"
import Image from "next/image"
import type { Tables } from "@/lib/supabase/database.types"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Utensils } from "lucide-react"

interface SavedRecipesProps {
  recipes: Tables<"recipes">[]
}

export function SavedRecipes({ recipes }: SavedRecipesProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600 dark:text-neutral-400">You haven't saved any recipes yet.</p>
        <Link href="/" className="text-purple-600 dark:text-purple-400 hover:underline mt-2 inline-block">
          Discover recipes
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
            <div className="relative h-40">
              <Image
                src={recipe.image_url || "/placeholder.svg?height=160&width=320"}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-black dark:text-white mb-2">{recipe.name}</h3>
              <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400 space-x-4">
                {recipe.cooking_time && (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{recipe.cooking_time}</span>
                  </div>
                )}
                {recipe.difficulty && (
                  <div className="flex items-center">
                    <Utensils className="h-3 w-3 mr-1" />
                    <span>{recipe.difficulty}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
