"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AtSign, Send, Phone, Instagram, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_CONTACT_FORM_ID as string);

    return (
        <section id="contact" className="py-20 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-secondary/50 backdrop-blur-md -z-10"></div>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
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
                        className="bg-secondary  p-8 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <AtSign className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-primary">Email</h4>
                                    <Link href={'mailto:mfurkan786al@gmail.com'} className="text-muted-foreground">
                                        mfurkan786al@gmail.com
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full text-primary">
                                    <Phone className="h-5 w-5 " />
                                </div>
                                <div>
                                    <h4 className="font-medium text-primary">Phone</h4>
                                    <Link href={'tel:+919408944630'} className="text-muted-foreground">
                                        +91 9408944630
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h4 className="font-medium mb-4 text-primary">Follow Me</h4>
                            <div className="flex gap-4 text-primary">
                                <Button variant="default" size="icon" className="rounded-full" asChild>
                                    <Link href={'https://www.instagram.com/furkan.thumbnails?igsh=ZjFmZjRycmZ0dzBt'} target="_blank">
                                        <Instagram className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>


                    {state.succeeded ? (
                        <p className="flex h-full w-full items-center justify-center text-xl font-bold">
                            {"Thanks for reaching out! I'll get back to you soon. 👍 "}
                        </p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                            <Label className="text-primary" htmlFor="name">Name</Label>
                                            <Input className="text-primary bg-secondary border-lime-400 border" id="name" type="text" name="name" placeholder="Your name" required />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                                    </div>
                                    <div className="space-y-2">
                                            <Label className="text-primary" htmlFor="email">Email</Label>
                                            <Input className="text-primary bg-secondary border-lime-400 border" id="email" name="email" type="email" placeholder="Your email" required />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                        <Label className="text-primary" htmlFor="subject">Subject</Label>
                                        <Input className="text-primary bg-secondary border-lime-400 border" id="subject" name="subject" type="text" placeholder="Project inquiry" required />
                                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                                </div>

                                <div className="space-y-2">
                                        <Label className="text-primary" htmlFor="message">Message</Label>
                                        <Textarea id="message" name="message" placeholder="Tell me about your project..." className="min-h-[150px] border border-lime-400 bg-muted" required />
                                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                                </div>

                                <Button type="submit" className="w-full" disabled={state.submitting}>
                                    {state.submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : state.succeeded ? (
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

                    )}


                </div>
            </div>
        </section>
    )
}

