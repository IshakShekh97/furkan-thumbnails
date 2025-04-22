"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";


export default function TestimonialCarousel(
    { testimonials }: { testimonials: { id: string; name: string; src: string }[] }
) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const isAutoPlaying = true
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    const resetAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current)
        }

        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                nextSlide()
            }, 5000)
        }
    }

    useEffect(() => {
        resetAutoPlay()

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [currentIndex, isAutoPlaying])

    const handlePrevClick = () => {
        prevSlide()
        resetAutoPlay()
    }

    const handleNextClick = () => {
        nextSlide()
        resetAutoPlay()
    }



    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                            <div className="h-full">
                                <div className="p-4 sm:p-6 flex flex-col items-center text-center relative  w-full h-[30rem] overflow-hidden group">
                                    <Image
                                        src={urlFor(testimonial.src).url()}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        draggable={true}
                                        className="h-full w-full rounded-3xl object-cover object-center"
                                    />
                                    <p className="font-bold absolute dark:bg-gradient-to-t from-black to to-transparent w-full bottom-0 h-40 flex items-end justify-center">
                                        <span className="pb-10">
                                            {testimonial.name}
                                        </span>
                                    </p>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size={'lg'} className="hidden group-hover:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black  text-white rounded-full p-2 w-40 shadow-md transition duration-300 ease-in-out z-50">
                                                View
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-black text-white border-lime-500/50">
                                            <DialogTitle>
                                                {testimonial.name}
                                            </DialogTitle>
                                            <div className="flex flex-col items-center text-center">
                                                <Image
                                                    src={urlFor(testimonial.src).url()}
                                                    alt={testimonial.name}
                                                    width={500}
                                                    height={500}
                                                    className="h-full w-full rounded-lg object-cover object-center mb-4"
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center mt-4 sm:mt-6 gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-lime-500 bg-lime-300/40 hover:bg-lime-300/60"
                    onClick={handlePrevClick}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-1">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-lime-500" : "bg-muted-foreground/30"}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-lime-500 bg-lime-300/40 hover:bg-lime-300/60"
                    onClick={handleNextClick}
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
