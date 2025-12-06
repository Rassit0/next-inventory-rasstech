'use client'

import { Button } from '@heroui/react'
import { UserIcon } from 'hugeicons-react'
import React from 'react'

export const UserMenu = () => {
    return (
        <Button
            isIconOnly
            variant="light"
            radius="full"
            startContent={<UserIcon strokeWidth={2} size={20} className="text-foreground" />}
        />
    )
}
