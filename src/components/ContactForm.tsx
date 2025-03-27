"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AtSign, Send, Phone, Instagram, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)

            // Reset form after showing success message
            setTimeout(() => {

                setIsSubmitted(false)
            }, 3000)
        }, 1500)
    }

    return (
        <section id="contact" className="py-20 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get In <span className="text-lime-500">Touch</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {"Have a project in mind? Let's discuss how I can help bring your vision to life."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-transparent backdrop-blur-[2px] p-8 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <AtSign className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <Link href={'mailto:mfurkan786al@gmail.com'} className="text-muted-foreground">
                                        mfurkan786al@gmail.com
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Phone className="h-5 w-5 " />
                                </div>
                                <div>
                                    <h4 className="font-medium">Phone</h4>
                                    <Link href={'tel:+919408944630'} className="text-muted-foreground">
                                        +91 9408944630
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h4 className="font-medium mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                <Button variant="default" size="icon" className="rounded-full" asChild>
                                    <Link href={'https://www.instagram.com/furkan.thumbnails?igsh=ZjFmZjRycmZ0dzBt'} target="_blank">
                                        <Instagram className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Your email" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Project inquiry" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px]" required />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting || isSubmitted}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : isSubmitted ? (
                                    "Message Sent!"
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

