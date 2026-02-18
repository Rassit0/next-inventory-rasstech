'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/ui/stores/ui-store'
import { Button } from '@heroui/react'
import { setCookie, getCookie } from 'cookies-next'
import { Moon02Icon, Sun02Icon } from 'hugeicons-react'

export const ButtonTheme = () => {
    const { modeTheme, setModeTheme } = useUIStore()

    const handleToggleTheme = () => {
        const newTheme = modeTheme === 'light' ? 'dark' : 'light'
        setModeTheme(newTheme)          // actualiza el store
        setCookie('modeTheme', newTheme) // actualiza la cookie
    }

    return (
        <>
            <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={handleToggleTheme}
            >
                <Moon02Icon strokeWidth={2} size={20} className="valery-dark:hidden text-foreground" />
                <Sun02Icon strokeWidth={2} size={20} className="valery-light:hidden text-foreground" />
            </Button>
        </>
    )
}
