'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'
import { GroupUsers } from './GroupUsers'
import { Delete02Icon, Edit01Icon, Edit02Icon, EyeIcon } from 'hugeicons-react'
import { EditModal } from '../edit-modal/EditModal'


export const CardItem = () => {
    return (
        <Card className="min-w-fit max-h-[140px] bg-foreground-900">
            <CardHeader className="flex justify-between items-center">
                <span className='text-foreground'>Total 4 usuarios</span>
                <GroupUsers />
            </CardHeader>
            <CardBody className='flex flex-row justify-between items-center min-w-fit min-h-fit'>
                <div>
                    <span className='font-bold text-lg text-foreground'>Administrator</span>
                    <p className="text-sm text-foreground-400">
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
