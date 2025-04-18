import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Camera,
  ChefHat,
  Utensils,
  Search,
  Share2,
  BookOpen,
  Clock,
  Sparkles,
  Smartphone,
  Globe,
  ArrowRight,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
            Discover how SnapDish AI transforms the way you cook with powerful AI-driven features.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="mb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-black dark:text-white">Core Features</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-600"></div>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 w-fit">
                  <Camera className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Image Recognition</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Our advanced AI can identify thousands of dishes from a single photo with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-600"></div>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 w-fit">
                  <ChefHat className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Detailed Recipes</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Get comprehensive recipes with ingredients, step-by-step instructions, and cooking tips.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-600"></div>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 w-fit">
                  <Utensils className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Cooking Guidance</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Follow along with clear instructions designed for cooks of all skill levels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="mb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-black dark:text-white">Additional Features</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Recipe Search</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Search our database of thousands of recipes by ingredients or dish name.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Social Sharing</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Share your favorite recipes with friends and family on social media.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Recipe Collections</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Save your favorite recipes in personalized collections.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Cooking Timers</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Built-in timers for each cooking step to keep you on track.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Ingredient Substitutions</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Get suggestions for ingredient substitutions based on dietary needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Mobile Friendly</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Access recipes on any device with our responsive design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-center text-black dark:text-white">Coming Soon</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3">
                      <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Multilingual Support</h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Recipes in multiple languages to serve our global community.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                    Q3 2023
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3">
                      <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Mobile App</h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Native mobile apps for iOS and Android with offline recipe access.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                    Q4 2023
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-purple-100/50 to-white dark:from-purple-900/20 dark:to-black p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Ready to Get Started?</h2>
          <p className="mb-8 text-neutral-600 dark:text-neutral-400">
            Upload your first food photo and discover the magic of SnapDish AI.
          </p>
          <Link href="/">
            <Button className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 px-8 py-6">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
