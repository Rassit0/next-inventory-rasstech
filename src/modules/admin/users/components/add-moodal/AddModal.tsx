'use client'

import { Providers } from "@/shared/providers";
import { ImagesUpload } from "@/ui/components/upload-files";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, Selection, SelectItem, useDisclosure } from "@heroui/react";
import { Add01Icon, Edit02Icon } from "hugeicons-react";
import { useState } from "react";

interface Props {
    textButton?: string;
    size?: "sm" | "md" | "lg"
}

export const AddModal = ({ textButton, size }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [documentType, setDocumentType] = useState<Selection>(new Set([]));
    const [documentNumber, setDocumentNumber] = useState('');
    const [branch, setBranch] = useState<Selection>(new Set([]));
    const [role, setRole] = useState<Selection>(new Set([]));
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);

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
                                <ModalHeader className="flex flex-col gap-1">Agregar Usuario</ModalHeader>
                                <ModalBody>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-4">
                                        <Input radius="lg" label="Nombre" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" value={name} onValueChange={setName} />
                                        <Input radius="lg" label="Apellido" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" value={lastName} onValueChange={setLastName} />
                                        <Input radius="lg" label="Email" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" value={email} onValueChange={setEmail} />
                                        <Input radius="lg" label="Teléfono" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" value={phone} onValueChange={setPhone} />
                                        <Select
                                            radius="lg"
                                            label="Tipo de Documento"
                                            variant="bordered"
                                            selectedKeys={documentType}
                                            onSelectionChange={setDocumentType}
                                        >
                                            <SelectItem>
                                                CI
                                            </SelectItem>
                                        </Select>
                                        <Input radius="lg" label="Número de Documento" placeholder="Ingrese el nombre del rol" type="text" variant="bordered" value={documentNumber} onValueChange={setDocumentNumber} />
                                        <Select
                                            radius="lg"
                                            label="Rol"
                                            variant="bordered"
                                            selectedKeys={role}
                                            onSelectionChange={setRole}
                                        >
                                            <SelectItem>
                                                CI
                                            </SelectItem>
                                        </Select>
                                        <Select
                                            radius="lg"
                                            label="Sucursal"
                                            variant="bordered"
                                            selectedKeys={branch}
                                            onSelectionChange={setBranch}
                                        >
                                            <SelectItem>
                                                CI
                                            </SelectItem>
                                        </Select>

                                        <RadioGroup className="ml-1" value={gender} onValueChange={setGender}>
                                            <Radio value="male">Masculino</Radio>
                                            <Radio value="female">Feminino</Radio>
                                        </RadioGroup>
                                        <Input radius="lg" label="Avatar" type="file" variant="bordered"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setAvatar(file);
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
                </Providers>
            </Modal>
        </>
    )
}
