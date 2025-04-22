"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Testomonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="backdrop-blur-md bg-transparent border-b border-primary/20 py-2 px-10">
            <div className="flex min-h-14 items-center justify-between container mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className=" flex items-center space-x-2"
                >
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            alt="logo"
                            src={'/logo.jpg'}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
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
                            <Link href={item.href} className={cn("transition-colors text-muted-foreground hover:text-primary ")} >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="relative z-50 max-md:hidden">
                    <ThemeSwitcher />
                </div>
                <div className="md:hidden relative flex items-center justify-center gap-1">
                    <div className="">
                        <ThemeSwitcher />
                    </div>
                    {
                        isOpen ? (
                            <Button variant="outline" onClick={() => setIsOpen(false)} size="icon" className="*:text-primary">
                                <X className="size-4" />
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={() => setIsOpen(true)} size="icon" className="*:text-primary">
                                <Menu className="size-4" />
                            </Button>
                        )
                    }

                    {
                        isOpen && (
                            <div className="absolute top-14 right-0">
                                <motion.nav
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex w-60 items-center space-y-6 text-sm font-medium flex-col bg-secondary border-lime-500 border-2 backdrop-blur-3xl rounded-lg shadow-lg p-4">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <Link href={item.href} className="transition-colors text-primary">
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.nav>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

