'use client'

import { motion } from "framer-motion"
import { client } from "@/sanity/client";
import { useEffect, useState } from "react"


async function fetchCategories() {


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

    const data = await client.fetch(categoryQuery);
    return data
}

type WorkItem = {
    id: string
    title: string
    slug: string
    gallary: {
        images: string
        caption: string
    }[]
}



export default function Categories() {
    const [categoryData, setCategoryData] = useState<WorkItem[]>()
    useEffect(() => {
        async function getCategoriesData() {
            await fetchCategories().then((data) => {
                setCategoryData(data)
            })
        }
        getCategoriesData()
    })

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
                {
                    categoryData?.map((category, index) => (
                        <p key={index}>
                            {category.title}
                            {category.gallary?.map((image, index) => (
                                <img key={index} src={image.images} alt={image.caption} />
                            ))}
                        </p>
                    ))
                }
            </div>
        </section>

    )
}

