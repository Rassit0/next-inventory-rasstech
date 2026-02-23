'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AvatarItem } from '@/ui'
import { usePathname, useRouter } from 'next/navigation'

export const UserMenu = () => {

    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status, update } = useSession();

    const router = useRouter()


    const handleLogout = async () => {
        await signOut({
            redirect: false
        });

        router.refresh()
    }

    useEffect(() => {
        const updateSession = async () => {
            await update();
        };
        updateSession();
    }, []);


    const checkSessionExpiration = () => {
        // console.log('entro a check exp: ' + session)
        if (session) return;

        router.refresh()
    }

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         await update();
    //         checkSessionExpiration()
    //     }, 1000 * 60) // cada minuto

    //     return () => clearInterval(interval)
    // }, [])


    // useEffect(() => {
    //   console.log(session || 'Sesión expirada')
    // }, [session])


    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <button>
                    <AvatarItem
                        size={40}
                        title={session?.user.full_name || ''}
                        image={session?.user.image}
                        radius='full'
                        onClick={() => { }}
                    />
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{session?.user.full_name}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    Cerrar Sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
