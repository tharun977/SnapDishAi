import { ImageUploader } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { Camera, ChefHat, Utensils, ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>

        {/* Radial gradient for the hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-purple-600/20 blur-[100px] -z-10"></div>

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-neutral-800 bg-black/50 px-3 py-1 text-sm backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
              <span className="text-neutral-300">Powered by AI Vision</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                SnapDish AI
              </span>
              <span className="block mt-2">Your Personal Visual Chef</span>
            </h1>

            <p className="mb-10 text-xl text-neutral-400">
              Snap a photo of any dish and instantly get a detailed recipe. Let AI identify your food and teach you how
              to make it.
            </p>

            <div className="flex flex-col items-center justify-center space-y-12">
              <ImageUploader />

              <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-xl border border-neutral-800 bg-black/50 p-6 backdrop-blur-md transition-all hover:border-purple-800 hover:bg-black/80">
                  <div className="mb-4 rounded-full bg-purple-900/50 p-3">
                    <Camera className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium">Snap a Photo</h3>
                  <p className="mt-2 text-xs text-neutral-400 text-center">
                    Upload any food image and let our AI analyze it
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl border border-neutral-800 bg-black/50 p-6 backdrop-blur-md transition-all hover:border-purple-800 hover:bg-black/80">
                  <div className="mb-4 rounded-full bg-purple-900/50 p-3">
                    <ChefHat className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium">AI Identifies It</h3>
                  <p className="mt-2 text-xs text-neutral-400 text-center">
                    Our advanced AI recognizes the dish with high accuracy
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl border border-neutral-800 bg-black/50 p-6 backdrop-blur-md transition-all hover:border-purple-800 hover:bg-black/80">
                  <div className="mb-4 rounded-full bg-purple-900/50 p-3">
                    <Utensils className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium">Get the Recipe</h3>
                  <p className="mt-2 text-xs text-neutral-400 text-center">
                    Receive detailed ingredients and cooking instructions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-400">
              Our AI-powered platform makes it easy to discover and recreate any dish you see.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-xl border border-neutral-800 bg-black/50 p-6 transition-all hover:border-purple-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/50 group-hover:bg-purple-900/80">
                <span className="text-xl font-bold text-purple-400">01</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Upload Any Food Photo</h3>
              <p className="text-neutral-400">
                Take a picture of a dish you saw at a restaurant, online, or anywhere else.
              </p>
              <div className="mt-4 flex items-center text-sm text-purple-400">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            <div className="group rounded-xl border border-neutral-800 bg-black/50 p-6 transition-all hover:border-purple-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/50 group-hover:bg-purple-900/80">
                <span className="text-xl font-bold text-purple-400">02</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Advanced AI Recognition</h3>
              <p className="text-neutral-400">Our AI analyzes the image to identify the dish with high accuracy.</p>
              <div className="mt-4 flex items-center text-sm text-purple-400">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            <div className="group rounded-xl border border-neutral-800 bg-black/50 p-6 transition-all hover:border-purple-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/50 group-hover:bg-purple-900/80">
                <span className="text-xl font-bold text-purple-400">03</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Detailed Recipe</h3>
              <p className="text-neutral-400">
                Get ingredients, instructions, and cooking tips to recreate the dish at home.
              </p>
              <div className="mt-4 flex items-center text-sm text-purple-400">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-800 bg-gradient-to-b from-purple-900/20 to-black p-8 text-center md:p-12">
            <div className="inline-flex items-center rounded-full border border-purple-800 bg-purple-900/20 px-3 py-1 text-sm backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-400" />
              <span className="text-purple-400">Try it now</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold">Ready to cook like a pro?</h2>
            <p className="mb-8 text-neutral-400">Upload your first food photo and get a detailed recipe in seconds.</p>
            <Button className="rounded-full bg-white px-8 py-6 text-black hover:bg-neutral-200">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
