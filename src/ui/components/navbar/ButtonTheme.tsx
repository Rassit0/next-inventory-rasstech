'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/ui/stores/ui-store'
import { Button } from '@heroui/react'
import { setCookie, getCookie } from 'cookies-next'
import { Moon02Icon, Sun02Icon } from 'hugeicons-react'
import { useTheme } from 'next-themes'
import { useIsSSR } from "@react-aria/ssr";

export const ButtonTheme = () => {
     const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

    return (
        <>
            <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={onChange}
            >
                <Moon02Icon strokeWidth={2} size={20} className="valery-dark:hidden text-foreground" />
                <Sun02Icon strokeWidth={2} size={20} className="valery-light:hidden text-foreground" />
            </Button>
        </>
    )
}
