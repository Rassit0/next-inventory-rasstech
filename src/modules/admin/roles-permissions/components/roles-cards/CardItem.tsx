'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'
import { GroupUsers } from './GroupUsers'
import { Delete02Icon, Edit01Icon, Edit02Icon, EyeIcon } from 'hugeicons-react'
import { EditModal } from '../edit-modal/EditModal'


export const CardItem = () => {
    return (
        <Card className="min-w-fit max-h-[140px]">
            <CardHeader className="flex justify-between items-center">
                <span className='text-foreground-500'>Total 4 usuarios</span>
                <GroupUsers />
            </CardHeader>
            <CardBody className='flex flex-row justify-between items-center min-w-fit min-h-fit'>
                <div>
                    <span className='font-bold text-lg'>Administrator</span>
                    <p className="text-sm text-foreground-500">
                        Acceso total al sistema
                    </p>
                </div>

                <div className='flex'>
                    <Button radius="full" variant="light" color="primary" isIconOnly>
                        <EyeIcon />
                    </Button>
                    <EditModal />
                    <Button radius="full" variant="light" color="danger" isIconOnly>
                        <Delete02Icon />
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
