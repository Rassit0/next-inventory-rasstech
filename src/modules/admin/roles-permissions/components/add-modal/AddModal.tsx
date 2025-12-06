import { appFont } from '@/config/fonts/fonts';
import { Providers } from '@/shared/providers';
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from '@heroui/react'
import { Add01Icon } from 'hugeicons-react';
import React from 'react'

export const AddModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                radius="full"
                variant="solid"
                color="primary"
                endContent={<Add01Icon />}
            >
                Agregar Rol
            </Button>

            <Modal isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}>
                <Providers>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Rol: id</ModalHeader>
                                <ModalBody>
                                    <Input label="Rol" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" />
                                    <table className="min-w-full border-collapse">
                                        <thead className="bg-foreground-200 text-left text-sm font-medium text-foreground-900">
                                            <tr className="h-12">
                                                <th className="px-4 py-2 rounded-tl-lg">Módulo</th>
                                                <th className="px-4 py-2 rounded-tr-lg">Permisos</th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-sm text-foreground-700">
                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Dashboard</td>
                                                <td className="px-4 py-3 flex flex-wrap gap-2">
                                                    <Checkbox color='secondary'>Gráficos</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Roles</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Usuarios</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Configuraciones</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Disponible</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Productos</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Clientes</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Venta</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Devolución</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Disponible</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Compras</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Transporte</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Registrar</Checkbox>
                                                    <Checkbox>Listado</Checkbox>
                                                    <Checkbox>Editar</Checkbox>
                                                    <Checkbox>Eliminar</Checkbox>
                                                    <Checkbox>Ver Existencias</Checkbox>
                                                    <Checkbox>Ver billetera de precios</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Conversiones</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Disponible</Checkbox>
                                                </td>
                                            </tr>

                                            <tr className="border-b border-foreground-200 hover:bg-foreground-100 transition-colors">
                                                <td className="px-4 py-3">Kardex</td>
                                                <td className="px-4 py-3 flex flex-col gap-2">
                                                    <Checkbox>Disponible</Checkbox>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

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
            </Modal>
        </>
    )
}
