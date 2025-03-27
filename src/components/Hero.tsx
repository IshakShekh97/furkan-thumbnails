"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen pt-20 flex items-center">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-6"
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="inline-block px-4 py-1 rounded-full bg-white/10 text-white mb-4"
                            >
                                Graphic Designer & Thumbnail Artist
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-4xl md:text-6xl font-extrabold leading-tight"
                            >
                                Creating <span className="text-lime-400">Visual</span> Stories That Capture Attention
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="mt-4 text-lg text-muted max-w-md"
                            >
                                {"Specialized in eye-catching thumbnails and graphics that drive engagement and tell your brand's story."}
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Button size="lg" className="rounded-full" asChild>
                                <Link href={'#work'}>
                                    View My Work
                                </Link>
                            </Button>
                            <Button size="lg" className="rounded-full border-lime-500 border bg-lime-300/20" asChild>
                                <Link href={'#contact'}>
                                    Contact Me
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border border-primary/20 shadow-lime-400/20 shadow-xl">
                            <Image
                                src="/profile.jpg"
                                alt="Designer Profile"
                                width={500}
                                height={500}
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <Button variant="ghost" size="icon" className="animate-bounce">
                        <ChevronDown className="h-6 w-6" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

