"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { identifyDish } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"

export function ImageUploader() {
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB")
      return
    }

    setImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      setError("Please select an image")
      return
    }

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("image", image)

      const result = await identifyDish(formData)

      if (result.success) {
        toast({
          title: "Dish identified!",
          description: `We identified this as ${result.recipeName}`,
        })
        // Navigate to results page with the recipe ID
        router.push(`/recipe/${result.recipeId}`)
      } else {
        setError(result.error || "Failed to identify dish")
        toast({
          title: "Error",
          description: result.error || "Failed to identify dish",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.")
      toast({
        title: "Error",
        description: err.message || "An error occurred",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md p-0 overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-t-lg ${
              preview ? "bg-white dark:bg-black" : "bg-neutral-100 dark:bg-neutral-900/50"
            } hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors`}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />

            {preview ? (
              <img
                src={preview || "/placeholder.svg"}
                alt="Food preview"
                className="h-full w-full rounded-t-lg object-contain p-2"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 p-3">
                  <ImageIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>

          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400 px-4">{error}</p>}

          {preview && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 px-4">
              {image?.name} (
              {(image?.size || 0) / 1024 < 1000
                ? `${Math.round((image?.size || 0) / 1024)} KB`
                : `${Math.round(((image?.size || 0) / 1024 / 1024) * 10) / 10} MB`}
              )
            </p>
          )}
        </div>

        <div className="px-4 pb-4">
          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={!image || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Identifying dish...
              </>
            ) : (
              "Identify Dish & Get Recipe"
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
