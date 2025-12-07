'use client'

import { Card, CardBody } from '@heroui/react'
import { Add01Icon, NewsIcon } from 'hugeicons-react'
import React from 'react'

export const CardNew = () => {
    return (
        <Card
            isPressable shadow="sm" onPress={() => console.log("add new role")}
            className="min-w-fit min-h-[140px]  bg-foreground-900 hover:bg-foreground-800 cursor-pointer transition-colors"
            >
            <CardBody className="flex flex-row justify-center items-center gap-3 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Add01Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold text-base">Agregar Rol</span>
            </CardBody>
        </Card>
    )
}
