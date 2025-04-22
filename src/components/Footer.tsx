"use client"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t  dark:bg-white bg-black pt-12 pb-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-primary-foreground font-bold text-2xl">FURKAN THUMBNAILS</span>
                            <span className="inline-block w-2 h-2 bg-muted rounded-full animate-pulse"></span>
                        </Link>
                        <p className="text-muted max-w-md">
                            Creating eye-catching designs and thumbnails that capture attention and drive engagement for your brand.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href="/https://www.instagram.com/furkan.thumbnails?igsh=ZjFmZjRycmZ0dzBt" target="_blank" className="text-muted hover:text-muted-foreground transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-primary-foreground">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#home" className="text-muted hover:text-muted-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#work" className="text-muted hover:text-muted-foreground transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="text-muted hover:text-muted-foreground transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-muted hover:text-muted-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-primary-foreground">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <p className="text-muted hover:text-muted-foreground transition-colors">
                                    Thumbnail Design
                                </p>
                            </li>
                            <li>
                                <p className="text-muted hover:text-muted-foreground transition-colors">
                                    Social Media Graphics
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center">
                    <p className="text-muted text-sm">© {currentYear} Furkan Thumbnails Portfolio. All rights reserved.</p>
                    <p className="text-muted">
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

