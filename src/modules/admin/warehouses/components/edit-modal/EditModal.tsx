'use client'
import { Providers } from "@/shared/providers";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Tooltip, useDisclosure } from "@heroui/react";
import { Edit02Icon } from "hugeicons-react";
import { useState } from "react";


export const EditModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    return (
        <>
            <Tooltip color="warning" content="Editar almacén">
                <Button
                    onPress={onOpen}
                    radius="full"
                    variant="light"
                    color="warning"
                    isIconOnly
                >
                    <Edit02Icon />
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}
                className='bg-foreground-900'
            >
                <Providers>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Almacén: id</ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-1 gap-y-4">
                                        <Input radius="lg" label="Nombre" placeholder="Ingrese el nombre de la sucursal" type="text" variant="bordered" value={name} onValueChange={setName} />
                                        <Textarea radius="lg" label="Dirección" placeholder="Ingrese la dirección de la sucursal" type="text" variant="bordered" value={address} onValueChange={setAddress} />
                                    </div>

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
