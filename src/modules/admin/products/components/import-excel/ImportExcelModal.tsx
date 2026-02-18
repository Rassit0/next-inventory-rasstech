'use client'

import { Providers } from "@/shared/providers";
import { ImagesUpload } from "@/ui/components/upload-files";
import { addToast, Alert, Button, Form, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, Selection, SelectItem, useDisclosure } from "@heroui/react";
import { Add01Icon, Edit02Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { addUser, UsersConfigResponse } from "@/modules/admin/users";
import { BsFileExcel } from "react-icons/bs";
import { FaRegFileExcel } from "react-icons/fa";
import { importExcel } from "../../actions/import-excel";

interface Props {
    sizeButton?: "sm" | "md" | "lg";
}

export const ImportExcelModal = ({ sizeButton }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState<
        {
            fila: number;
            campo: string;
            error: string;
        }[]
    >([]);
    const [totalErrors, setTotalErrors] = useState(0);
    const [remainingErrors, setRemainingErrors] = useState(0);

    const [showAll, setShowAll] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            setErrors({
                file: 'Debe seleccionar un archivo'
            });
            return;
        };

        setIsLoading(true);
        const { error, message, errors, total_errors, remaining_errors } = await importExcel({ file: selectedFile });
        setIsLoading(false);

        if (errors) {
            setValidationErrors(errors || [])
            setTotalErrors(total_errors || 0);
            setRemainingErrors(remaining_errors || 0);
            // closeAll();
            // addToast({
            //     title: "Error al importar",
            //     description: errors ? 
            //         Object.entries(errors).map(([field, messages]) => 
            //             `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
            //         ).join('\n') : 
            //         'Error al procesar el archivo',
            //     color: 'danger',
            //     timeout: 5000, // Aumentar tiempo para poder leer los errores
            //     variant: 'bordered',
            //     shouldShowTimeoutProgress: true,
            // });
            return;
        }

        addToast({
            title: "Productos importados",
            description: "Productos importados exitosamente",
            color: 'success',
            timeout: 2000,
            variant: 'bordered',
            shouldShowTimeoutProgress: true,
        });

        onClose();
    }

    const resetForm = () => {
        setSelectedFile(null);
        setErrors([]);
        setValidationErrors([]);
        setTotalErrors(0);
        setRemainingErrors(0);
        setShowAll(false);

    }

    useEffect(() => {
        resetForm();
    }, [isOpen])


    return (
        <>
            <Button
                onPress={onOpen}
                color="success"
                variant='solid'
                isIconOnly
                startContent={<FaRegFileExcel className="text-white" size={25} />}
                size={sizeButton}
            />

            <Modal
                ref={modalRef}
                isOpen={isOpen} scrollBehavior='inside' size='xl' onClose={onClose}
                className='bg-foreground-900'
            >
                <Providers>
                    <ModalContent>
                        {(onClose) => (
                            <Form
                                validationErrors={errors}
                                onSubmit={handleSubmit}
                            >
                                <ModalHeader className="flex flex-col gap-1">Agregar Usuario</ModalHeader>
                                <ModalBody className="w-full">
                                    {
                                        validationErrors.length > 0 ? (
                                            <div className="w-full flex items-center my-3">
                                                <Alert color='danger'
                                                    title={`Error al importar`}
                                                    description={
                                                        <div className="space-y-1">
                                                            {validationErrors.flat().slice(0, showAll ? undefined : 4).map((error, index) => (
                                                                <div key={index} className="text-sm">
                                                                    {String(error.error).split('\n').map((line, i) => (
                                                                        <div key={i}>Fila {error.fila}: {line}</div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                            {showAll && <div className="text-sm">{`${remainingErrors} errores más.`}</div>}
                                                            {validationErrors.length > 4 && !showAll && (
                                                                <button
                                                                    className="text-sm text-blue-500 hover:underline mt-1 cursor-pointer"
                                                                    onClick={() => setShowAll(true)}
                                                                >
                                                                    Mostrar {validationErrors.length - 4} errores más...
                                                                </button>
                                                            )}
                                                            {showAll && (
                                                                <button
                                                                    className="text-sm text-blue-500 hover:underline mt-1 cursor-pointer"
                                                                    onClick={() => setShowAll(false)}
                                                                >
                                                                    Mostrar menos
                                                                </button>
                                                            )}
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        )
                                            :
                                            null
                                    }
                                    <div>
                                        <Input
                                            radius="lg"
                                            label="Archivo"
                                            name="file"
                                            type="file"
                                            variant="bordered"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setSelectedFile(file);
                                            }}
                                        />
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Guardar
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </ModalContent>
                </Providers>
            </Modal>
        </>
    )
}
