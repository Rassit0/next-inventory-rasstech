'use client'

import { Providers } from "@/shared/providers";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { useState } from "react";

interface Props {
    textButton?: string;
    size?: "sm" | "md" | "lg"
}

export const AddModal = ({ textButton, size }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                variant={textButton ? "flat" : "light"}
                endContent={<Add01Icon />}
                isIconOnly={textButton ? false : true}
                size={size}
            >
                {textButton}
            </Button>

            <Modal isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}>
                <Providers>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Agregar Sucursal</ModalHeader>
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
