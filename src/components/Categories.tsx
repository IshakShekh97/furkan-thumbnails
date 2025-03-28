"use client"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectTrigger } from "./ui/select"
import { Button } from "./ui/button"

type categoryType = {
    id: string
    title: string
    slug: string
    gallary: {
        images: string
        caption: string
    }[]
}

export default function Categories() {
    const [categoryData, setCategoryData] = useState<categoryType[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('Vlog')
    const [isSelectOpen, setIsSelectOpen] = useState(false)

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
        <section id="work" className="py-20">
            <div className="container mx-auto px-4">
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
                    <Tabs defaultValue="vlog" className="w-full">
                        <div className="flex justify-center mb-8 max-xl:hidden">
                            <TabsList className="grid grid-flow-col auto-cols-max gap-2  overflow-x-auto max-w-full">
                                {categoryData?.map((item, index) => (
                                    <TabsTrigger
                                        key={index}
                                        value={item.slug}
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2"
                                    >
                                        {item.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <Select open={isSelectOpen} onOpenChange={setIsSelectOpen}>
                            <SelectTrigger className="bg-black text-white border-lime-400 xl:hidden w-full">
                                {selectedCategory ? selectedCategory : 'Select '}
                            </SelectTrigger>
                            <SelectContent className="bg-black w-full">
                                <TabsList className="flex flex-col  gap-2 h-full bg-black w-full">
                                    {categoryData?.map((item, index) => (
                                        <TabsTrigger
                                            asChild
                                            key={index}
                                            value={item.slug}
                                            onClick={() => {
                                                setSelectedCategory(item.title)
                                                setIsSelectOpen(false)
                                            }}
                                            className="data-[state=active]:bg-lime-300/20 data-[state=active]:border-lime-400 p-2 bg-black text-white "
                                        >
                                            <Button className="w-full">
                                                {item.title}
                                            </Button>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </SelectContent>
                        </Select>


                        {
                            categoryData?.map((item) => (
                                <TabsContent key={item.id} value={item.slug} className="mt-0">
                                    <AnimatePresence>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {
                                                item.gallary?.map((image, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                                                        className="group overflow-hidden bg-lime-500/10 backdrop-blur-sm border-lime-200 rounded-lg">
                                                        <div className="relative aspect-video overflow-hidden">
                                                            <Image
                                                                src={urlFor(image.images).url()}
                                                                alt={item.title}
                                                                width={1000}
                                                                height={1000}
                                                                className="object-contain transition-transform group-hover:scale-105 duration-500"
                                                            />
                                                            <div className="absolute p-4 inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                                <div className="w-full">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-white font-medium">{item.title}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-center py-5">
                                                            <h3 className="font-medium text-white text-xl">{image.caption}</h3>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            }
                                        </div>
                                    </AnimatePresence>
                                </TabsContent>
                            ))
                        }

                    </Tabs>
                )}
            </div>
        </section>
    )
}

