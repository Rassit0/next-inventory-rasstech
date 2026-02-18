"use client";

import { Providers } from "@/shared/providers";
import {
  addToast,
  Button,
  closeAll,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { addUnit, UnitsConfigResponse } from "@/modules/admin/units";
import { usePathname } from "next/navigation";

interface Props {
  textButton?: string;
  size?: "sm" | "md" | "lg";
}

export const AddModal = ({ textButton, size }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Record<string, string> = {};

    if (!name || name.trim().length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (name.length > 250) {
      validationErrors.name = "El nombre no debe exceder los 250 caracteres";
    }

    if (!description || description.trim().length < 3) {
      validationErrors.description =
        "La descripción es obligatoria y debe tener al menos 3 caracteres";
    } else if (description.length > 300) {
      validationErrors.description =
        "La descripción no debe exceder los 300 caracteres";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name: name.trim(),
      description: description.trim(),
      // state: 1 // Default to active
    };

    setIsLoading(true);
    const { error, message, unit, errors } = await addUnit({
      data,
      callbackUrl: pathname,
    });
    setIsLoading(false);
    if (errors) {
      setErrors(errors);
      return;
    }

    if (error) {
      // closeAll();
      addToast({
        title: "Error al crear",
        description: message || "Error al crear la unidad",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Unidad creada",
      description: "Unidad creada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setIsLoading(false);
      setErrors({});
      if (isOpen) closeAll();
    }
  }, [isOpen]);

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
        isOpen={isOpen}
        scrollBehavior="inside"
        size="xl"
        onClose={onClose}
        className="bg-foreground-900"
      >
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationErrors={errors}>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Unidad
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="grid grid-cols-1 gap-y-4">
                  <Input
                    isRequired
                    name="name"
                    radius="lg"
                    label="Nombre"
                    placeholder="Ingrese el nombre de la unidad"
                    type="text"
                    variant="bordered"
                    value={name}
                    onValueChange={setName}
                  />
                  <Textarea
                    isRequired
                    name="description"
                    placeholder="Ingrese una descripción"
                    variant="bordered"
                    value={description}
                    onValueChange={setDescription}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isLoading}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  color="primary"
                  type="submit"
                >
                  Guardar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
