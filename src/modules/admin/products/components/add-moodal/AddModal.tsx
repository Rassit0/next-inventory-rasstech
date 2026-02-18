'use client'

import { Providers } from "@/shared/providers";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, Selection, SelectItem, Textarea, useDisclosure } from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { useRef, useState } from "react";
import { CategoriesConfigResponse } from "@/modules/admin/categories";

interface Props {
    textButton?: string;
    size?: "sm" | "md" | "lg"
    config: CategoriesConfigResponse;
}

export const AddModal = ({ textButton, size, config }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<Selection>(new Set([]));
    const [image, setImage] = useState<File | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

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

            <Modal
                ref={modalRef}
                isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}
                className='bg-foreground-900'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar Categoría</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 gap-y-4">
                                    <Input radius="lg" label="Nombre" placeholder="Ingrese el nombre de la sucursal" type="text" variant="bordered" value={name} onValueChange={setName} />
                                    <Select
                                        radius="lg"
                                        label="Padre"
                                        placeholder="Seleccione un padre"
                                        variant="bordered"
                                        selectedKeys={parentId}
                                        onSelectionChange={setParentId}
                                        className="w-full"
                                        classNames={{
                                            value: ['group-data-[has-value=true]:text-foreground']
                                        }}
                                        popoverProps={{
                                            // ESto ponemos para que el contenedor este dentro del modal y no afuera que ocasiona conflictos o adevertencias
                                            portalContainer: modalRef.current || undefined,
                                        }}
                                    >
                                        {config.categories.map((cat) => (
                                                <SelectItem key={cat.id} textValue={cat.name}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                    </Select>
                                    <Input radius="lg" label="Imagen" type="file" variant="bordered"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setImage(file);
                                        }}
                                    />
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
            </Modal>
        </>
    )
}
