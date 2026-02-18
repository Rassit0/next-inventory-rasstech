"use client";
import { Providers } from "@/shared/providers";
import { PERMISSIONS } from "@/shared/utils";
import {
  addToast,
  Button,
  Card,
  CardBody,
  Checkbox,
  closeAll,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { addRole } from "@/modules/admin/roles";

interface Props {
  textButton?: string;
  sizeButton?: "sm" | "md" | "lg";
  buttonCard?: boolean;
}

export const AddModal = ({
  textButton,
  sizeButton,
  buttonCard = false,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    setName("");
    setDescription("");
    setPermissions([]);
    if (isOpen) closeAll();
    setErrors({});
  }, [isOpen]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    if (!name || name.trim().length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (name.length > 250) {
      validationErrors.name = "El nombre no debe exceder los 250 caracteres";
    }

    if (permissions.length === 0) {
      validationErrors.permissions = "Debe seleccionar al menos un permiso";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const { error, message, role, errors } = await addRole({
      data: {
        name,
        description: description || undefined,
        permissions,
      },
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
        description: "Error al crear el rol",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Rol creado",
      description: "Rol creado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      {!buttonCard ? (
        <Button
          onPress={onOpen}
          color="primary"
          variant={textButton ? "flat" : "light"}
          endContent={<Add01Icon />}
          isIconOnly={textButton ? false : true}
          size={sizeButton}
        >
          {textButton}
        </Button>
      ) : (
        <Card
          isPressable
          shadow="sm"
          onPress={onOpen}
          className="min-w-fit min-h-[140px]  bg-foreground-900 hover:bg-foreground-800 cursor-pointer transition-colors"
        >
          <CardBody className="flex flex-row justify-center items-center gap-3 py-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Add01Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-base">Agregar Rol</span>
          </CardBody>
        </Card>
      )}

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="xl"
        onClose={onClose}
        className="bg-foreground-900"
        onKeyDown={handleKeyDown}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Rol
              </ModalHeader>
              <ModalBody>
                <Form
                  ref={formRef}
                  onSubmit={onSubmit}
                  validationErrors={errors}
                >
                  <Input
                    name="name"
                    label="Rol"
                    placeholder="Ingrese el nombre del rol"
                    type="text"
                    variant="bordered"
                    value={name}
                    onValueChange={setName}
                  />
                  {errors.permissions &&
                    typeof errors.permissions === "string" && (
                      <div className="text-danger text-sm mt-2 mb-2">
                        {errors.permissions}
                      </div>
                    )}
                  <Table
                    removeWrapper
                    classNames={{
                      th: [
                        "bg-foreground-800",
                        "text-foreground",
                        "font-bold",
                        "border-b-2 border-transparent",
                      ],
                      tr: ["border-b-2", "border-foreground-600"],
                    }}
                  >
                    <TableHeader>
                      <TableColumn>Módulo</TableColumn>
                      <TableColumn>Permisos</TableColumn>
                    </TableHeader>

                    <TableBody>
                      {PERMISSIONS.map((item, i) => (
                        <TableRow key={item.name}>
                          <TableCell key={`cell-name-${item.name}`}>
                            {item.name}
                          </TableCell>
                          <TableCell
                            key={item.name}
                            className="flex flex-col gap-2"
                          >
                            {item.permissions.map((p, index) => (
                              <Checkbox
                                key={p.permission}
                                isSelected={permissions.includes(p.permission)}
                                onValueChange={(value) => {
                                  if (value) {
                                    // Si se tickea se agrega el permiso
                                    setPermissions((prev) => [
                                      ...prev,
                                      p.permission,
                                    ]);
                                  } else {
                                    // Si se des tickea se quita el permiso
                                    setPermissions(
                                      permissions.filter(
                                        (permission) =>
                                          permission !== p.permission,
                                      ),
                                    );
                                  }
                                }}
                              >
                                {p.name}
                              </Checkbox>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
      </Modal>
    </>
  );
};
