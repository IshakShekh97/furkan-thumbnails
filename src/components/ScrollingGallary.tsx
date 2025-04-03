"use client"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"
import { motion } from "framer-motion"



type categoryType = {
    id: string
    title: string
    slug: string
    gallary: {
        images: string
        caption: string
    }[]
}

export default function ScrollingGallery() {
    const [categoryData, setCategoryData] = useState<categoryType[]>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const categoryQuery = `
            *[_type == 'category']{
             "id" : _id,
              title,
              "slug" : slug.current,
               "gallary": images[]{
                 "images" : image.asset._ref,
                  caption
               }
          }
              `

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
        <div className="min-h-screen  text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    My Creative <span className="text-lime-400">Work</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse through my portfolio of design work across different categories
                </p>
            </motion.div>


            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {
                        categoryData?.map((category, index) => (
                            <CategorySection key={category.id} category={category} direction={index % 2 === 0 ? "left" : "right"} />
                        ))}
                </>
            )}
        </div>
    )
}

interface CategorySectionProps {
    category: categoryType
    direction: "left" | "right"
}

function CategorySection({ category, direction }: CategorySectionProps) {
    // Ensure we have at least 5 items for a good scrolling effect
    const galleryItems =
        category.gallary.length < 5
            ? [...category.gallary, ...category.gallary, ...category.gallary, ...category.gallary, ...category.gallary].slice(
                0,
                10,
            )
            : category.gallary

    return (
        <section className="py-6 md:py-8" id="work">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center" style={{ color: "#5cff00" }}>
                {category.title}
            </h2>

            <div className="relative w-full overflow-hidden">
                {/* Left fade effect */}
                <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>

                <Marquee direction={direction} speed={30} gradient={false} pauseOnHover={true} className="py-2">
                    {galleryItems.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 mx-2 md:mx-3">
                            <div className="w-[200px] h-[112px] md:w-[300px] md:h-[169px] bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg overflow-hidden">
                                <Image
                                    src={urlFor(item.images).width(400).url()}
                                    alt={item.caption}
                                    width={300}
                                    height={169}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-300 truncate max-w-[200px] md:max-w-[300px]">
                                {item.caption}
                            </p>
                        </div>
                    ))}
                </Marquee>

                {/* Right fade effect */}
                <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
            </div>
        </section>
    )
}

