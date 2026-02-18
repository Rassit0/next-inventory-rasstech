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
  Switch,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon, Edit02Icon } from "hugeicons-react";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { addBranch, Branch, editBranch } from "@/modules/admin/branches";

interface Props {
  branch: Branch;
  textButton?: string;
  size?: "sm" | "md" | "lg";
}

export const EditModal = ({ textButton, size, branch }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState(branch.name);
  const [address, setAddress] = useState(branch.address);
  const [phone, setPhone] = useState(branch.phone || "");
  const [state, setState] = useState<boolean>(
    branch.state === 1 ? true : false,
  );

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
      phone: phone || null,
      state: state ? 1 : 0,
      // state: 1 // Default to active
    };

    setIsLoading(true);
    const { error, message, errors } = await editBranch({
      id: branch.id,
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
        title: "Error al editar",
        description: message || "Error al editar la sucursal",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Sucursal editada",
      description: "Sucursal editada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setName(branch.name);
      setAddress(branch.address);
      setPhone(branch.phone || "");
      setState(branch.state === 1 ? true : false);
      setIsLoading(false);
      setErrors({});
      if (isOpen) closeAll();
    }
  }, [branch, isOpen]);

  return (
    <>
      <Tooltip color="warning" content="Editar sucursal">
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

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="xl"
        onClose={onClose}
        className="bg-foreground-900"
      >
        <Providers>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Editar Sucursal: {branch.name}
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
                      placeholder="Ingrese el nombre de la sucursal"
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
                      placeholder="Ingrese la dirección de la sucursal"
                      type="text"
                      variant="bordered"
                      value={address}
                      onValueChange={setAddress}
                    />
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
                    <Switch
                      name="state"
                      isSelected={state}
                      onValueChange={setState}
                      color={state ? "success" : "danger"}
                    >
                      {state ? "Activo" : "Inactivo"}
                    </Switch>
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
