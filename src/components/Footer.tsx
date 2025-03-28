"use client"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t  bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-black font-bold text-2xl">FURKAN THUMBNAILS</span>
                            <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                        </Link>
                        <p className="text-zinc-800 max-w-md">
                            Creating eye-catching designs and thumbnails that capture attention and drive engagement for your brand.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="text-zinc-800 hover:text-black transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#home" className="text-zinc-800 hover:text-black transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#work" className="text-zinc-800 hover:text-black transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="text-zinc-800 hover:text-black transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-zinc-800 hover:text-black transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-zinc-800 hover:text-black transition-colors">
                                    Thumbnail Design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-800 hover:text-black transition-colors">
                                    Social Media Graphics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-800 hover:text-black transition-colors">
                                    Brand Identity
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-800 hover:text-black transition-colors">
                                    UI/UX Design
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col md:flex-row justify-center items-center">
                    <p className="text-zinc-800 text-sm">© {currentYear} Furkan Thumbnails Portfolio. All rights reserved.</p>
                    {/* <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-zinc-800 hover:text-black transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-zinc-800 hover:text-black transition-colors">
                            Terms of Service
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

