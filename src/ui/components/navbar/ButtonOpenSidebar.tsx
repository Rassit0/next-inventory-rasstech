'use client'

import { useUIStore } from '@/ui/stores/ui-store';
import { Button } from '@heroui/react'
import { Menu01Icon } from 'hugeicons-react';
import React from 'react'

export const ButtonOpenSidebar = () => {

    const { openSidebar } = useUIStore(state => state);
    return (
        <Button
            onPress={openSidebar}
            isIconOnly
            variant="light"
            radius="full"
            className="lg:hidden"
            startContent={<Menu01Icon strokeWidth={2} size={20} className="text-foreground" />}
        />
    )
}
