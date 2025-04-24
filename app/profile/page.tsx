import { getUserProfile, getUserSavedRecipes } from "@/app/actions"
import { getSessionSafely } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/profile/profile-form"
import { SavedRecipes } from "@/components/profile/saved-recipes"

export default async function ProfilePage() {
  const sessionData = await getSessionSafely()
  const session = sessionData?.session

  if (!session) {
    redirect("/signin")
  }

  const profile = await getUserProfile()
  const savedRecipes = await getUserSavedRecipes()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-black dark:text-white">Your Profile</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm profile={profile} />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Saved Recipes</CardTitle>
              <CardDescription>Recipes you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedRecipes recipes={savedRecipes} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
