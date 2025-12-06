'use client'
import { appFont } from "@/config/fonts/fonts";
import { HeroUIProvider } from "@heroui/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <HeroUIProvider>
        <main className={`valery-light ${appFont.className} antialiased text-foreground`}>
            {children}
        </main>
    </HeroUIProvider>;
};