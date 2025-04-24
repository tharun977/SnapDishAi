import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              About SnapDish AI
            </span>
          </h1>
          <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
            We're on a mission to make cooking accessible to everyone by leveraging the power of AI.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
          <p>
            SnapDish AI began as a personal passion project. As someone who’s always been fascinated by both technology and food, I found myself constantly snapping photos of incredible dishes—whether from restaurants, friends’ kitchens, or trending posts on social media—wishing I had a way to recreate them at home.
          </p>
          <p>
            This year, I set out to build something that could bridge that gap. I developed a system that uses computer vision to recognize dishes from photos and match them with detailed recipes. The process involved countless hours of experimenting with models, training datasets, and refining a recipe database to make the platform smart, accurate, and helpful.
          </p>
          <p>
            What started as a small idea is now a growing platform trusted by home cooks, foodies, and professional chefs globally. SnapDish AI continues to evolve, learning with every new image it sees and refining its recommendations to suit each user’s unique taste and preferences.
          </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Our Mission</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
            <p>
              At SnapDish AI, our mission is to democratize cooking knowledge and make culinary skills accessible to
              everyone. We believe that good food should be enjoyed by all, and that anyone can become a great cook with
              the right guidance.
            </p>
            <p>We're committed to:</p>
            <ul>
              <li>Making cooking more accessible through technology</li>
              <li>Preserving and sharing culinary traditions from around the world</li>
              <li>Reducing food waste by helping people cook more at home</li>
              <li>Building a community of food enthusiasts who share their knowledge and passion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Tharun Raman Card */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 p-6 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <img
                  src="/images/tharun.jpeg" // 🔁 Replace with actual image path
                  alt="Tharun Raman"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">Tharun Raman</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Founder & CEO</p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                A cs student with a passion for food and technology.
              </p>
            </div>

            {/* Dummy1 */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 p-6 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Team Member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">Dummy1</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">CTO</p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                AI specialist with expertise in computer vision and machine learning for food recognition.
              </p>
            </div>

            {/* Dummy2 */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 p-6 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Team Member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">Dummy2</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Head of Culinary</p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                Professional chef with 15 years of experience curating our recipe database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-purple-100/50 to-white dark:from-purple-900/20 dark:to-black p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">Join Our Journey</h2>
          <p className="mb-8 text-neutral-600 dark:text-neutral-400">
            Be part of our mission to revolutionize home cooking with AI technology.
          </p>
          <Link href="/contact">
            <Button className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
