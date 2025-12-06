'use client'

import { useUIStore } from '@/ui/stores/ui-store'
import { Button } from '@heroui/react'
import { Moon02Icon, Sun02Icon } from 'hugeicons-react'
import React from 'react'

export const ButtonTheme = () => {

    const { modeTheme, setModeTheme } = useUIStore(state => state);

    return (
        <Button
            isIconOnly
            variant="light"
            radius="full"
            startContent={
                modeTheme === 'light' ?
                    <Moon02Icon strokeWidth={2} size={20} className=" text-foreground" />
                    : <Sun02Icon strokeWidth={2} size={20} className=" text-foreground" />
            }
            onPress={() => setModeTheme(modeTheme === 'light' ? 'dark' : 'light')}
        />
    )
}
