"use client";
import { Providers } from "@/shared/providers";
import {
  addToast,
  closeAll as closeAllToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
  Form,
  Switch,
} from "@heroui/react";
import { Edit02Icon } from "hugeicons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { editUnit, Unit, UnitsConfigResponse } from "@/modules/admin/units";
import { usePathname } from "next/navigation";

interface Props {
  unit: Unit;
  config: UnitsConfigResponse;
}

export const EditModal = ({ unit, config }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(unit.name);
  const [description, setDescription] = useState<string>("");
  const [state, setState] = useState<boolean>(unit.state === 1 ? true : false);

  const modalRef = useRef(null);

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
      name,
      description: description,
      state: state ? 1 : 0,
    };

    setIsLoading(true);
    const { error } = await editUnit({
      id: unit.id,
      data,
      callbackUrl: pathname,
    });
    setIsLoading(false);

    if (error) {
      // closeAll();
      addToast({
        title: "Error al editar",
        description: "Error al editar la unidad",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Unidad editada",
      description: "Unidad editada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  useEffect(() => {
    setName(unit.name);
    setDescription(unit.description);
    setIsLoading(false);
    setErrors({});
    if (isOpen) closeAllToast();
  }, [isOpen, unit]);

  return (
    <>
      <Tooltip color="warning" content="Editar unidad">
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
                Editar Unidad: {unit.id}
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
                  <Switch
                    name="state"
                    isSelected={state}
                    onValueChange={setState}
                    color={state ? "success" : "danger"}
                  >
                    {state ? "Activo" : "Inactivo"}
                  </Switch>
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
