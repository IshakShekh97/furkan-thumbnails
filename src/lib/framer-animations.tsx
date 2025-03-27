"use client"

import type React from "react"
import { motion } from "framer-motion"

export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5 },
}

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const FadeInView = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode
    delay?: number
    className?: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const SlideInView = ({
    children,
    direction = "left",
    delay = 0,
    className = "",
}: {
    children: React.ReactNode
    direction?: "left" | "right" | "up" | "down"
    delay?: number
    className?: string
}) => {
    const directionMap = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        up: { x: 0, y: -50 },
        down: { x: 0, y: 50 },
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directionMap[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

