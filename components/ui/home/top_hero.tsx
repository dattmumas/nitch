'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Logo from "../logo"

export default function Component() {
  const cyclingTexts = [
    "Innovative",
    "Personal",
    "User-Friendly",
    "Efficient",
    "Game-Changing"
  ]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [nextTextIndex, setNextTextIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTextIndex(nextTextIndex)
        setNextTextIndex((nextTextIndex + 1) % cyclingTexts.length)
        setIsAnimating(false)
      }, 500) // Half of the transition duration
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(intervalId)
  }, [nextTextIndex])

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 pt-6 pb-12">
      <div className="mb-4">
        <Logo width={300} height={300} />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="mb-2">Your</div>
          <div className="inline-block w-75 relative">
            <span
              className={`block w-full text-primary transition-all duration-500 ease-in-out ${
                isAnimating ? "-translate-x-full opacity-0" : "opacity-100"
              }`}
              aria-hidden={isAnimating}
            >
              {cyclingTexts[currentTextIndex]}
            </span>
          </div>
          <div className="mt-2">Platform</div>
        </div>
      </h1>
      <p className="text-xl md:text-2xl text-center mb-12 max-w-2xl text-muted-foreground">
        Become the creator you were meant to be.
        Nitch is revolutionizing creator tools and making it easier for you to go from idea to post to profit. All in one platform.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="text-lg px-8">
          Free Trial
        </Button>
        <Button size="lg" variant="outline" className="text-lg px-8 group">
          See Our Plans
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  )
}