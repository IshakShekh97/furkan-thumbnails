"use client"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t  bg-white pt-12 pb-5">
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
                            <Link href="/https://www.instagram.com/furkan.thumbnails?igsh=ZjFmZjRycmZ0dzBt" target="_blank" className="text-zinc-800 hover:text-black transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-black">Quick Links</h3>
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
                        <h3 className="font-semibold text-lg mb-4 text-black">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <p className="text-zinc-800 hover:text-black transition-colors">
                                    Thumbnail Design
                                </p>
                            </li>
                            <li>
                                <p className="text-zinc-800 hover:text-black transition-colors">
                                    Social Media Graphics
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center">
                    <p className="text-zinc-800 text-sm">© {currentYear} Furkan Thumbnails Portfolio. All rights reserved.</p>
                    <p className="text-black">
                        Developed By
                        <Link className="font-black underline underline-offset-2" href={'https://github.com/IshakShekh97'}>
                            @Ishak
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

