'use client'

import { Button } from '@heroui/react'
import { Search01Icon } from 'hugeicons-react'
import React from 'react'

export const Search = () => {
    return (
        <Button
            isIconOnly
            variant="light"
            radius="full"
            startContent={<Search01Icon strokeWidth={2} size={20} className="text-foreground" />}
        />
    )
}
