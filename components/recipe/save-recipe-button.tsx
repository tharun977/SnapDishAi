"use client"

import { saveRecipe } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Bookmark } from "lucide-react"
import { useState } from "react"

interface SaveRecipeButtonProps {
  recipeId: string
  initialSaved: boolean
}

export function SaveRecipeButton({ recipeId, initialSaved }: SaveRecipeButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const result = await saveRecipe(recipeId)

      if (result.success) {
        setIsSaved(result.saved)
        toast({
          title: result.saved ? "Recipe saved" : "Recipe removed",
          description: result.saved
            ? "This recipe has been added to your saved recipes."
            : "This recipe has been removed from your saved recipes.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save recipe",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full ${
        isSaved
          ? "border-purple-300 dark:border-purple-800 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
          : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white"
      }`}
      onClick={handleSave}
      disabled={isLoading}
    >
      <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
      {isSaved ? "Saved" : "Save"}
    </Button>
  )
}
