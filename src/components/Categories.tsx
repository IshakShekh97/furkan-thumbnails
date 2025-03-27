'use client'

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// async function fetchCategories() {

//     const data = await client.fetch(categoryQuery);
//     return data
// }

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

        client.fetch(categoryQuery).then((data: categoryType[]) => {
            setCategoryData(data)
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
                        My Creative <span className="text-lime-500">Work</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Browse through my portfolio of design work across different categories
                    </p>
                </motion.div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="w-fit flex items-center gap-2">
                            <TabsTrigger
                                value="all"
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                All
                            </TabsTrigger>

                            {
                                categoryData?.map((item, index) => (
                                    <TabsTrigger
                                        value={item.slug}
                                        key={index}
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        {item.title}
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        <AnimatePresence>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryData?.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="hover-scale grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full"
                                    >
                                        {
                                            item.gallary?.map((image, idx) => (
                                                <div
                                                    key={idx}
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
                                                </div>
                                            ))
                                        }
                                    </motion.div>
                                ))}

                            </div>
                        </AnimatePresence>
                    </TabsContent>

                    {
                        categoryData?.map((item) => (
                            <TabsContent key={item.id} value={item.slug} className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        item.gallary?.map((image, idx) => (
                                            <div
                                                key={idx}
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
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
        </section>

    )
}

