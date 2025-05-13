"use client"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

type categoryType = {
    _createdAt: string
    _updatedAt: string
    _originalId: string
    _rev: string
    _type: "category"
    _id: string
    title: string
    slug: string
    images: {
        image: string
        caption: string
    }[]
}



export default function ScrollingGallery() {
    const [categoryData, setCategoryData] = useState<categoryType[]>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const categoryQuery = `
                *[_type == 'category']{
         ...,
          "images": images[]{
            "image" : image.asset._ref,
            caption
          },
          "slug" : slug.current,
          }`

        client
            .fetch(categoryQuery)
            .then((data: categoryType[]) => {
                setCategoryData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="min-h-screen text-primary">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-10 text-primary">
                    My Creative <span className="text-lime-400">Work</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse through my portfolio of design work across different categories
                </p>
            </motion.div>

            {
                !categoryData && !isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-muted-foreground">No categories available</p>
                    </div>
                )
            }

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {categoryData?.map((category) => (
                        <CategorySection key={category._id} category={category} />
                    ))}
                </>
            )}
        </div>
    )
}

interface CategorySectionProps {
    category: categoryType
}

function CategorySection({ category }: CategorySectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const galleryItems =
        category.images.length < 5
            ? [...category.images, ...category.images, ...category.images].slice(0, 10)
            : category.images

    const totalItems = galleryItems.length

    const getMaxIndex = () => {
        return totalItems - 1
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === getMaxIndex() ? 0 : prevIndex + 1))
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? getMaxIndex() : prevIndex - 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }


    return (
        <section className="py-6 md:py-8 relative" id="work">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center dark:text-[#5cff00] text-black ">
                {category.title}
            </h2>

            <div className="relative w-full px-2 pt-4 ">
                <div className="relative overflow-hidden ">
                    {/* Carousel Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6">
                        {galleryItems.slice(currentIndex, currentIndex + 3).map((item, idx) => (
                            <motion.div
                                key={idx}
                                className={`${idx >= 1 ? "hidden md:block" : ""} ${idx >= 2 ? "hidden lg:block" : ""} rounded-md overflow-hidden relative`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <div className="w-full aspect-video bg-gradient-to-r from-gray-700 to-gray-800  overflow-hidden relative">
                                    <Image
                                        src={urlFor(item.image).width(800).url() || "/placeholder.svg"}
                                        alt={item.caption as string}
                                        width={800}
                                        height={660}
                                        className="object-cover w-full h-full"
                                    />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " variant={'ghost'} size={'icon'}>
                                                <Eye className="size-4" />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="bg-popover text-primary">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {item.caption}
                                                </DialogTitle>
                                            </DialogHeader>

                                            <Image
                                                src={urlFor(item.image).width(1000).url() || "/placeholder.svg"}
                                                alt={item.caption as string}
                                                width={1000}
                                                height={1000}
                                                className="object-cover w-full h-full aspect-video"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white hover:text-lime-400"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white hover:text-lime-400"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                    {Array.from({ length: Math.min(totalItems, 10) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex % totalItems ? "bg-lime-400 w-4" : "bg-gray-500 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
