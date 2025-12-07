'use client'
import { Providers } from '@/shared/providers';
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react'
import { Add01Icon } from 'hugeicons-react';


interface Props {
    textButton?: string;
    sizeButton?: "sm" | "md" | "lg"
}

export const AddModal = ({ textButton, sizeButton }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                variant={textButton ? "flat" : "light"}
                endContent={<Add01Icon />}
                isIconOnly={textButton ? false : true}
                size={sizeButton}
            >
                {textButton}
            </Button>

            <Modal isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}
                className='bg-foreground-900'
            >
                <Providers>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Rol: id</ModalHeader>
                                <ModalBody>
                                    <Input label="Rol" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" />
                                    <Table
                                        removeWrapper
                                        classNames={{
                                            th: ["bg-foreground-800", "text-foreground", "font-bold", "border-b-2 border-transparent"],
                                            tr: ['border-b-2', 'border-foreground-600']
                                        }}
                                    >
                                        <TableHeader>
                                            <TableColumn>Módulo</TableColumn>
                                            <TableColumn>Permisos</TableColumn>
                                        </TableHeader>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Dashboard</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Gráficos</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Roles</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Usuarios</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Configuraciones</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Disponible</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Productos</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Clientes</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Venta</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Devolución</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Disponible</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Compras</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Transporte</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Conversiones</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Disponible</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell>Kardex</TableCell>
                                                <TableCell className='flex flex-col gap-2'>
                                                    <Checkbox>Disponible</Checkbox>
                                                </TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Guardar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Providers>
            </Modal >
        </>
    )
}
