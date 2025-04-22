"use client"

import * as React from "react"
import { Lightbulb, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
    const { setTheme } = useTheme()

    return (

        <>
            <div >
                <Button
                    variant={'secondary'}
                    size={"icon"}
                    onClick={() => setTheme("dark")}
                    className={cn("dark:hidden ")}
                >
                    <Lightbulb className="text-primary h-[1.2rem] w-[1.2rem]" />
                </Button>
                <Button
                    onClick={() => setTheme("light")}
                    className={cn("hidden dark:flex")}
                    variant={'secondary'}
                    size={"icon"}
                >
                    <Sparkles className="text-primary h-[1.2rem] w-[1.2rem]" />
                </Button>
            </div>
        </>


    )
}
