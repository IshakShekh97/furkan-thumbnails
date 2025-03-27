"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(!isOpen);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef, isOpen]);

    return (
        <div className="backdrop-blur-md bg-transparent border-b border-primary/20 py-2 px-3">
            <div className="container flex h-14 items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mr-4 flex items-center space-x-2"
                >
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-white font-bold text-2xl">Furkan Thumbnails</span>
                        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </Link>
                </motion.div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link href={item.href} className="transition-colors hover:text-primary">
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
                <div className=""></div>
                <div className="md:hidden relative">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>

                    </Button>
                    {
                        isOpen && (
                            <div className="absolute top-14 right-0" ref={containerRef}>
                                <motion.nav
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex w-60 items-center space-y-6 text-sm font-medium flex-col bg-white/20 backdrop-blur-3xl rounded-lg shadow-lg p-4">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <Link href={item.href} className="transition-colors hover:text-primary">
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <Button className="w-full">Hire Me</Button>
                                </motion.nav>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

