"use client"

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        // Toggle between 'light' and 'dark' themes
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
                <>
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <span className="sr-only">Switch to Dark Mode</span>
                </>
            ) : (
                <>
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all light:-rotate-90 light:scale-0" />
                    <span className="sr-only">Switch to Light Mode</span>
                </>
            )
            }
        </Button>
    );
}

