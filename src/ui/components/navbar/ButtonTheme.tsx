'use client'

import { Button } from '@heroui/react'
import { DarkModeIcon } from 'hugeicons-react'
import React from 'react'

export const ButtonTheme = () => {
    return (
        <Button
            isIconOnly
            variant="light"
            radius="full"
            startContent={<DarkModeIcon strokeWidth={2} size={20} className=" text-foreground" />}
        />
    )
}
