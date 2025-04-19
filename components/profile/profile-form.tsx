"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateUserProfile } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"
import type { Tables } from "@/lib/supabase/database.types"

interface ProfileFormProps {
  profile: Tables<"profiles"> | null
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    username: profile?.username || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = new FormData()
      form.append("fullName", formData.fullName)
      form.append("username", formData.username)

      const result = await updateUserProfile(form)

      if (result.success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Username
        </label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
