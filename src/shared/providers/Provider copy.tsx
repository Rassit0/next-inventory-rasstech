'use client'
import { useUIStore } from "@/ui";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useState, useEffect, useRef } from 'react';

interface Props {
    modeTheme?: 'light' | 'dark';
    children: React.ReactNode;
}

export const Providers = ({ modeTheme, children }: Props) => {

    const { modeTheme: theme, setModeTheme } = useUIStore(state => state);
    const [themeUI, setThemeUI] = useState<'light' | 'dark'>(modeTheme || theme);

    const firstRender = useRef(true);

    useEffect(() => {
        // En el primer render no cambia el tema que llega que es de cookies para evitar el parpadeo al cambiar de tema
        if (firstRender.current) {
            setModeTheme(modeTheme || theme);
            // ignoramos la primera ejecución
            firstRender.current = false;
            return;
        }

        setThemeUI(theme)
    }, [theme])


    return <HeroUIProvider>
        <main className={`valery-${themeUI} text-foreground`}>
            <ToastProvider placement="top-right" />
            {children}
        </main>
    </HeroUIProvider>;
};