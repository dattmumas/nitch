'use client'

import { useRef, useState, useEffect } from 'react'

const boxes = [
  { id: 1, title: "Innovation", content: "Pushing boundaries in technology" },
  { id: 2, title: "Creativity", content: "Inspiring new ideas and solutions" },
  { id: 3, title: "Collaboration", content: "Working together to achieve more" },
  { id: 4, title: "Excellence", content: "Striving for the highest quality" },
  { id: 5, title: "Impact", content: "Making a difference in the world" },
]

export default function HeroComponent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeBox, setActiveBox] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
    if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft
        const boxWidth = scrollRef.current.offsetWidth
        const totalScrollWidth = scrollRef.current.scrollWidth - boxWidth
        const newActiveBox = Math.round((scrollPosition / totalScrollWidth) * (boxes.length - 1))
        setActiveBox(newActiveBox)
        }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {boxes[activeBox].title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
            {boxes[activeBox].content}
          </p>
        </div>
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto pb-8 pt-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {boxes.map((box, index) => (
            <div
              key={box.id}
              className="mr-6 flex h-96 w-full flex-none snap-center items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-foreground p-8 text-primary-foreground last:mr-0 md:w-3/4 lg:w-1/2"
            >
              <h2 className="text-3xl font-bold md:text-4xl">{box.title}</h2>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-2">
          {boxes.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === activeBox ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.offsetWidth,
                    behavior: 'smooth',
                  })
                }
              }}
              aria-label={`Scroll to box ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}