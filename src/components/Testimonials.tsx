'use client'

import { client } from '@/sanity/lib/client';
import TestimonialCarousel from './ui/TestomonialCarousel';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"


type testimonialType = {
    id: string;
    name: string
    src: string
}

const Testimonials = () => {
    const [testimonialData, setTestimonialData] = useState<testimonialType[]>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const categoryQuery = `*[_type == 'testimonials']{
   "id": _id,
    name,
    "src" : src.asset._ref
 }`

        client
            .fetch(categoryQuery)
            .then((data: testimonialType[]) => {
                setTestimonialData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
                setIsLoading(false)
            })
    }, [])


    return (
        <div className='mb-5' id='testimonials'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                    My Creative <span className="text-lime-400">Work</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse through my portfolio of design work across different categories
                </p>
            </motion.div>

            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!testimonialData && !isLoading && (
                <div className="flex justify-center items-center py-20">
                    <p className="text-muted-foreground">No testimonials available</p>
                </div>
            )}

            {testimonialData && !isLoading && (
                <div className="flex flex-col items-center justify-center gap-4">
                    <TestimonialCarousel testimonials={testimonialData} />
                </div>
            )}

        </div>
    )
}

export default Testimonials