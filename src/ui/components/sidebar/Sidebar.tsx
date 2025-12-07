'use client'

import { sidebarNavigation } from '@/config/navigation'
import { useEffect, useState } from 'react'
import { SidebarHeader } from './header/SidebarHeader';
import { SidebarBody } from './body/SidebarBody';
import { SidebarFooter } from './footer/SidebarFooter';
import clsx from 'clsx';
import { useUIStore } from '@/ui';
import { appFont, titleFont } from '@/config/fonts/fonts';


export const Sidebar = () => {

    const { isSidebarOpen, closeSidebar, openSidebar } = useUIStore(state => state);

    const [hoverSidebar, setHoverSidebar] = useState(false);


    const handleHoverSidebar = (value: boolean) => {
        setHoverSidebar(value);
    }

    // Estado para saber si cruzamos lg hacia abajo
    const [isBelowLg, setIsBelowLg] = useState(false);

    // Trackea si el sidebar fue cerrado automáticamente por resize
    const [closedByResize, setClosedByResize] = useState(false);

    // Trackea si el usuario interactuó manualmente
    const [userToggled, setUserToggled] = useState(false);

    // Hook para manejar el resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024 && !isBelowLg) {
                if (isSidebarOpen) {
                    closeSidebar();
                    setClosedByResize(true); // cerró automáticamente
                }
                setIsBelowLg(true);
            } else if (window.innerWidth >= 1024 && isBelowLg) {
                setIsBelowLg(false);

                // Abrir automáticamente solo si no interactuó el usuario
                if (!userToggled && closedByResize) {
                    openSidebar();
                    setClosedByResize(false);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isSidebarOpen, closeSidebar, openSidebar, isBelowLg, closedByResize, userToggled]);

    return (
        <>
            {/* Backdrop para móvil */}
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-200 opacity-100 pointer-events-auto"
                        onClick={closeSidebar}
                    />
                )
            }

            <div className={clsx(
                'h-full w-0 transition-width duration-300 ease-in-out lg:block',
                {
                    'lg:w-14': !isSidebarOpen,
                    'lg:w-64': isSidebarOpen
                }
            )} />
            < div
                className={clsx(
                    `overflow-hidden 
                    bg-background 
                    h-full 
                    fixed top-0 left-0
                    z-40 
                    rounded-none border-none 
                    group 
                    transition-width duration-300 ease-in-out
                    text-foreground
                    `,
                    {
                        'w-64': isSidebarOpen,
                        'w-0 lg:w-14 lg:hover:w-64 hover:shadow-xl lg:group-hover:w-64': !isSidebarOpen,
                    }
                )}
                onMouseEnter={() => handleHoverSidebar(true)}
                onMouseLeave={() => handleHoverSidebar(false)}
            >
                {/* sidebar header */}
                <SidebarHeader
                    hoverSidebar={hoverSidebar}
                    isSidebarOpen={isSidebarOpen}
                    openSidebar={openSidebar}
                    closeSidebar={closeSidebar}
                />
                <div
                    id='sidebar_scroll'
                    onScroll={(e) => {
                        // console.log('SCROLL FIRED', e.currentTarget.scrollTop)
                    }}
                    className={`
                    overflow-y-scroll overflow-x-hidden h-[calc(100%-4rem)]
                    `}
                >
                    {/* sidebar body */}
                    <SidebarBody
                        sections={sidebarNavigation}
                        isSidebarOpen={isSidebarOpen}
                        hoverSidebar={hoverSidebar}
                        closeSidebar={closeSidebar}
                    />
                    {/* sidebar footer */}
                    <SidebarFooter isSidebarOpen={isSidebarOpen} />
                </div>
            </ div>
        </>
    )
}
