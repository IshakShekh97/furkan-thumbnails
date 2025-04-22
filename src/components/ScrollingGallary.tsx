// "use client"
// import { client } from "@/sanity/lib/client"
// import { urlFor } from "@/sanity/lib/image"
// import Image from "next/image"
// import { useEffect, useState } from "react"
// import Marquee from "react-fast-marquee"
// import { motion } from "framer-motion"
// import { ChevronLeft, ChevronRight } from "lucide-react" // Import icons

// type categoryType = {
//     id: string
//     title: string
//     slug: string
//     gallary: {
//         images: string
//         caption: string
//     }[]
// }

// export default function ScrollingGallery() {
//     const [categoryData, setCategoryData] = useState<categoryType[]>()
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         const categoryQuery = `
//             *[_type == 'category']{
//              "id" : _id,
//               title,
//               "slug" : slug.current,
//                "gallary": images[]{
//                  "images" : image.asset._ref,
//                   caption
//                }
//           }
//               `

//         client
//             .fetch(categoryQuery)
//             .then((data: categoryType[]) => {
//                 setCategoryData(data)
//                 setIsLoading(false)
//             })
//             .catch((error) => {
//                 console.error("Error fetching categories:", error)
//                 setIsLoading(false)
//             })
//     }, [])

//     return (
//         <div className="min-h-screen  text-white">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="text-center mb-12"
//             >
//                 <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-10">
//                     My Creative <span className="text-lime-400">Work</span>
//                 </h2>
//                 <p className="text-muted-foreground max-w-2xl mx-auto">
//                     Browse through my portfolio of design work across different categories
//                 </p>
//             </motion.div>

//             {isLoading ? (
//                 <div className="flex justify-center items-center py-20">
//                     <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             ) : (
//                 <>
//                         {categoryData?.map((category, index) => (
//                             <CategorySection key={category.id} category={category} direction={index % 2 === 0 ? "left" : "right"} />
//                         ))}
//                 </>
//             )}
//         </div>
//     )
// }

// interface CategorySectionProps {
//     category: categoryType
//     direction: "left" | "right"
// }

// function CategorySection({ category, direction: initialDirection }: CategorySectionProps) {
//     const [currentDirection, setCurrentDirection] = useState<"left" | "right">(initialDirection)

//     // Ensure we have at least 5 items for a good scrolling effect
//     const galleryItems =
//         category.gallary.length < 5
//             ? [...category.gallary, ...category.gallary, ...category.gallary, ...category.gallary, ...category.gallary].slice(
//                 0,
//                 10,
//             )
//             : category.gallary

//     const handleDirectionChange = (newDirection: "left" | "right") => {
//         setCurrentDirection(newDirection)
//     }

//     return (
//         <section className="py-6 md:py-8 relative" id="work">
//             {/* Added relative positioning */}
//             <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center" style={{ color: "#5cff00" }}>
//                 {category.title}
//             </h2>

//             <div className="relative w-full overflow-hidden">
//                 {/* Left fade effect */}
//                 <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>

//                 <Marquee direction={currentDirection} speed={30} gradient={false} pauseOnHover={true} className="py-2">
//                     {galleryItems.map((item, idx) => (
//                         <div key={idx} className="flex-shrink-0 mx-2 md:mx-3">
//                             <div className="w-[200px] h-[112px] md:w-[300px] md:h-[169px] bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg overflow-hidden">
//                                 <Image
//                                     src={urlFor(item.images).width(400).url()}
//                                     alt={item.caption}
//                                     width={300}
//                                     height={169}
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>
//                             <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-300 truncate max-w-[200px] md:max-w-[300px]">
//                                 {item.caption}
//                             </p>
//                         </div>
//                     ))}
//                 </Marquee>

//                 {/* Right fade effect */}
//                 <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>

//                 {/* Direction Control Buttons */}
//                 <button
//                     onClick={() => handleDirectionChange("left")}
//                     className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${currentDirection === "left" ? "text-lime-400" : "text-white"
//                         }`}
//                     aria-label="Scroll left"
//                 >
//                     <ChevronLeft size={20} />
//                 </button>
//                 <button
//                     onClick={() => handleDirectionChange("right")}
//                     className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${currentDirection === "right" ? "text-lime-400" : "text-white"
//                         }`}
//                     aria-label="Scroll right"
//                 >
//                     <ChevronRight size={20} />
//                 </button>
//             </div>
//         </section>
//     )
// }

"use client"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
        <div className="min-h-screen text-white">
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

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                        {categoryData?.map((category) => (
                            <CategorySection key={category.id} category={category} />
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

    // Ensure we have at least 5 items for a good carousel effect
    const galleryItems =
        category.gallary.length < 5
            ? [...category.gallary, ...category.gallary, ...category.gallary].slice(0, 10)
            : category.gallary

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
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center" style={{ color: "#5cff00" }}>
                {category.title}
            </h2>

            <div className="relative w-full px-4 md:px-8 lg:px-12">
                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    {/* Carousel Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {galleryItems.slice(currentIndex, currentIndex + 3).map((item, idx) => (
                            <motion.div
                                key={idx}
                                className={`${idx >= 1 ? "hidden md:block" : ""} ${idx >= 2 ? "hidden lg:block" : ""} rounded-md overflow-hidden relative`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <div className="w-full aspect-video bg-gradient-to-r from-gray-700 to-gray-800  overflow-hidden">
                                    <Image
                                        src={urlFor(item.images).width(300).url() || "/placeholder.svg"}
                                        alt={item.caption}
                                        width={400}
                                        height={225}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <p className="py-1 text-sm md:text-base text-white truncate text-center absolute bottom-0 left-0 w-full bg-secondary/20 backdrop-blur-3xl">{item.caption}</p>
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
