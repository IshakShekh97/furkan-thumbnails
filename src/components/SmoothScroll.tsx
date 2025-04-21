"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import ResizeObserver from "resize-observer-polyfill"

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [pageHeight, setPageHeight] = useState(0)

    // Measure the height of the content
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setPageHeight(entry.contentRect.height)
            }
        })

        if (scrollRef.current) {
            resizeObserver.observe(scrollRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    const { scrollY } = useScroll()
    const scrollYSpring = useSpring(scrollY, {
        stiffness: 300,
        damping: 60,
        restDelta: 0.001,
    })

    return (
        <>
            <motion.div
                ref={scrollRef}
                style={{ y: scrollYSpring }} // Apply negative scroll value for smooth effect
                transformTemplate={({ y }) => `translateY(${-parseFloat(y as string)}px)`}
                className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
            >
                {children}
            </motion.div>
            {/* Create a div with the measured height to maintain scrollbar */}
            <div style={{ height: pageHeight }} />
        </>
    )
}

export default SmoothScroll
