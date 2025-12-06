'use client'

import { useUIStore } from "@/ui/stores/ui-store"
import { Button } from "@heroui/react";
import { Menu01Icon, Notification02Icon, Search01Icon, UserIcon } from "hugeicons-react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa"


export const Navbar = () => {

    const { openSidebar } = useUIStore(state => state);

    return (
        <nav className="flex flex-row bg-background h-16">
            <div className="flex justify-between items-center pl-3 px-6 flex-1">

                <div>
                    {/* <!-- Ícono de Menú (cyan) --> */}
                    <Button
                        onPress={openSidebar}
                        isIconOnly
                        variant="light"
                        radius="full"
                        className="lg:hidden"
                        startContent={<Menu01Icon strokeWidth={2} size={20} className="text-foreground" />}
                    />

                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        startContent={<Search01Icon strokeWidth={2} size={20} className="text-foreground" />}
                    />
                </div>

                {/* <!-- Ícono de Notificación y Perfil --> */}
                <div className="space-x-4">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        startContent={<Notification02Icon strokeWidth={2} size={20} className=" text-foreground" />}
                    />
                    {/* <!-- Botón de Perfil --> */}
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        startContent={<UserIcon strokeWidth={2} size={20} className="text-foreground" />}
                    />
                </div>
            </div>
        </nav>
    )
}
