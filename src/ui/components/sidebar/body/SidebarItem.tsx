'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { NavItem } from '@/ui';
import clsx from 'clsx';

interface Props {
    // Item de navegación actual (puede ser hoja o tener hijos)
    item: NavItem;
    // Estado global del sidebar (expandido/colapsado)
    isSidebarOpen: boolean;
    // Indica si el mouse está sobre el sidebar cuando está colapsado
    hoverSidebar: boolean;
    // Callback opcional para reportar altura al padre (solo se pasa cuando hay hijos)
    updateHeightChildren?: (height: number) => void;
}

// Determina si un item o alguno de sus descendientes coincide con la ruta actual
const hasMatchingDescendant = (navItem: NavItem, path: string): boolean => {
    // Caso 1: el item es una hoja y tiene href
    // Coincide si el path es exactamente igual
    if ('href' in navItem && navItem.href) {
        return path === navItem.href;
    }

    // Caso 2: el item es un padre y tiene children
    // Recorremos recursivamente todos los hijos para ver
    // si alguno coincide con el path actual
    if ('children' in navItem && navItem.children) {
        return navItem.children.some(child => hasMatchingDescendant(child, path));
    }

    // Si no tiene href ni children, no hay coincidencia
    return false;
}

export const SidebarItem = ({ item, isSidebarOpen, hoverSidebar, updateHeightChildren }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    // Este item tiene hijos (submenú) si existe children con longitud > 0
    const isSubMenu = item.children && item.children.length > 0 ? true : false;

    // El item se considera activo si la ruta coincide con su href
    // o si alguno de sus descendientes coincide
    const activeItem = (pathname === item.href || hasMatchingDescendant(item, pathname));

    // Estado local: si el submenú de este item está abierto o cerrado
    const [openSubMenu, setOpenSubMenu] = useState<boolean>(
        () => isSubMenu && hasMatchingDescendant(item, pathname) ? true : false
    );

    // Altura acumulada de submenús anidados (se usa para animar max-height)
    const [heightSubMenu, setHeightSubMenu] = useState<number>(0);

    // Ref al contenedor del submenú para poder leer y escribir su altura real
    const submenuRef = useRef<HTMLDivElement | null>(null);

    // Alterna el estado abierto/cerrado del submenú actual
    const toggleSubMenu = () => {
        setOpenSubMenu(!openSubMenu);
    };

    // Reabre o cierra este submenú en función de si la ruta actual
    // pertenece a este item o a alguno de sus descendientes
    const restartOpenSubMenu = () => {
        if (isSubMenu && hasMatchingDescendant(item, pathname)) {
            setOpenSubMenu(true);
        } else {
            setOpenSubMenu(false);
        }
    };

    // Acumula la altura de los submenús hijos y la propaga hacia arriba
    const accumulateChildHeight = (heigth?: number): void => {
        if (heigth) {
            setHeightSubMenu(prev => prev + heigth);

            if (updateHeightChildren) {
                updateHeightChildren(heigth);
            }
        }
    };

    // Sincroniza la variable CSS --submenu-height con la altura real
    // del contenedor + altura acumulada de los hijos
    useEffect(() => {
        if (submenuRef.current) {
            submenuRef.current.style.setProperty(
                '--submenu-height',
                (submenuRef.current.scrollHeight + heightSubMenu) + 'px'
            );
        }
    }, [heightSubMenu]);

    // Cuando se abre/cierra este submenú, medimos su altura actual
    // y la añadimos al acumulador para que el padre conozca la altura total
    useEffect(() => {
        if (submenuRef.current) {
            accumulateChildHeight(submenuRef.current.scrollHeight);
        }
    }, [openSubMenu])

    // Cuando el sidebar está colapsado y sin hover, cerramos este submenú
    // y reseteamos cualquier altura acumulada
    useEffect(() => {
        if (!isSidebarOpen && !hoverSidebar) {
            if (openSubMenu) {
                setOpenSubMenu(false);
            }
            if (heightSubMenu !== 0) {
                setHeightSubMenu(0);
                if (submenuRef.current) {
                    submenuRef.current.style.setProperty('--submenu-height', '0px');
                }
            }
        }
    }, [isSidebarOpen, hoverSidebar]);

    // Cuando el sidebar está colapsado pero el mouse entra (hoverSidebar = true),
    // reabrimos los submenús que coinciden con la ruta actual
    useEffect(() => {
        if (!isSidebarOpen && hoverSidebar) {
            restartOpenSubMenu();
        }
    }, [hoverSidebar, pathname]);

    // Navega a la ruta indicada (para items hoja sin submenú)
    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <div key={item.label} className='space-y-2'>
            <button
                onClick={() => {
                    if (isSubMenu) {
                        // Item con submenú: solo abrimos/cerramos, no navegamos
                        toggleSubMenu();
                    } else {
                        // Item hoja: navegamos a su href
                        handleNavigation(item.href!);
                    }
                }}
                className={`
                    cursor-pointer min-w-min w-full relative px-2 py-2 flex items-center space-x-4 justify-start rounded-lg duration-300 
                    ${isSidebarOpen || hoverSidebar ? 'rounded-r-lg' : 'rounded-r-none'} 
                    ${activeItem && !isSubMenu
                        ? 'bg-linear-to-l from-primary-600 to-primary-400 text-primary-foreground'
                        : openSubMenu || activeItem ? 'bg-foreground-800 text-foreground'
                            : 'hover:bg-default-200'}`}
            >
                {item.icon ?
                    (
                        item.icon
                    )
                    : (
                        <span className='shrink-0 w-1.5 h-1.5 rounded-full bg-foreground ml-1'></span>
                    )}
                <span className={`font-medium transition-all duration-200 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {item.label}
                </span>
                {isSubMenu && (
                    <span
                        className={clsx(
                            `ml-auto transform transition-transform duration-300`,
                            {
                                'rotate-90': openSubMenu,
                                'rotate-0': !openSubMenu
                            }
                        )}
                    >
                        ▸
                    </span>
                )}
            </button>

            {/* Render recursivo */}

            {isSubMenu && (
                <div
                    ref={submenuRef}
                    className={clsx(
                        `pl-1 flex flex-col overflow-hidden space-y-2
                        transition-[max-height] duration-300`,
                        {
                            'max-h-(--submenu-height)': openSubMenu,   // abrir: animando hasta la altura calculada
                            'max-h-0': !openSubMenu                          // cerrar completamente
                        }
                    )}
                >
                    {item.children!.map((child, index) => (
                        <SidebarItem
                            key={index}
                            item={child}
                            isSidebarOpen={isSidebarOpen}
                            hoverSidebar={hoverSidebar}
                            updateHeightChildren={child.children ? accumulateChildHeight : undefined}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}
