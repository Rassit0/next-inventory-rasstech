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
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { addBranch } from "@/modules/admin/branches";
import {
  addWarehouse,
  WarehousesConfigResponse,
} from "@/modules/admin/warehouses";

interface Props {
  textButton?: string;
  size?: "sm" | "md" | "lg";
  config: WarehousesConfigResponse;
}

export const AddModal = ({ textButton, size, config }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [branch_id, setBranch_id] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Record<string, string> = {};

    if (!name || name.trim().length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (name.length > 255) {
      validationErrors.name = "El nombre no debe exceder los 255 caracteres";
    }

    if (!address || address.trim().length < 3) {
      validationErrors.description =
        "La dirección es obligatoria y debe tener al menos 3 caracteres";
    } else if (address.length > 500) {
      validationErrors.description =
        "La dirección no debe exceder los 500 caracteres";
    }

    if (phone && phone.length > 20) {
      validationErrors.description =
        "El teléfono no debe exceder los 20 caracteres";
    }

    if (phone && phone.length < 3) {
      validationErrors.description =
        "El teléfono debe tener al menos 3 caracteres";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name: name.trim(),
      address: address.trim(),
      phone: phone || undefined,
      branch_id,
      // state: 1 // Default to active
    };

    setIsLoading(true);
    const { error, message, warehouse, errors } = await addWarehouse({
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
        description: message || "Error al crear el almacén",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Almacén creado",
      description: "Almacén creado exitosamente",
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
      setAddress("");
      setPhone("");
      setBranch_id("");
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
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            formRef.current?.requestSubmit();
          }
        }}
      >
        <Providers>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Almacén
                </ModalHeader>
                <ModalBody>
                  <Form
                    ref={formRef}
                    className="grid grid-cols-1 gap-y-4"
                    onSubmit={onSubmit}
                    validationErrors={errors}
                  >
                    <Input
                      isRequired
                      name="name"
                      radius="lg"
                      label="Nombre"
                      placeholder="Ingrese el nombre del almacén"
                      type="text"
                      variant="bordered"
                      value={name}
                      onValueChange={setName}
                    />
                    <Textarea
                      isRequired
                      name="address"
                      radius="lg"
                      label="Dirección"
                      placeholder="Ingrese la dirección del almacén"
                      type="text"
                      variant="bordered"
                      value={address}
                      onValueChange={setAddress}
                    />
                    <Select
                      isRequired
                      name="branch_id"
                      radius="lg"
                      label="Sucursal"
                      variant="bordered"
                      selectedKeys={[branch_id]}
                      onChange={(e) => setBranch_id(e.target.value)}
                    >
                      {config.branches.map((branch) => (
                        <SelectItem key={branch.id}>{branch.name}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      name="phone"
                      radius="lg"
                      label="Teléfono"
                      placeholder="Ingrese el nombre de la sucursal"
                      type="text"
                      variant="bordered"
                      max={20}
                      value={phone}
                      onValueChange={setPhone}
                    />
                  </Form>
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
                    onPress={() => formRef.current?.requestSubmit()}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Providers>
      </Modal>
    </>
  );
};
