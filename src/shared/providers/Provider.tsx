'use client'
import { appFont } from "@/config/fonts/fonts";
import { useUIStore } from "@/ui";
import { HeroUIProvider } from "@heroui/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {

    const { modeTheme } = useUIStore(state => state);

    return <HeroUIProvider>
        <main className={`valery-${modeTheme} ${appFont.className} antialiased text-foreground`}>
            {children}
        </main>
    </HeroUIProvider>;
};