"use client";
import {
  addToast,
  Button,
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
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Edit02Icon } from "hugeicons-react";
import { Role } from "../../interfaces/role.interface";
import { FormEvent, useEffect, useRef, useState } from "react";
import { PERMISSIONS } from "@/shared/utils";
import { editRole } from "@/modules/admin/roles";
import { useSession } from "next-auth/react";

interface Props {
  role: Role;
}

export const EditModal = ({ role }: Props) => {
  const { data: session, status, update } = useSession();

  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description || "");

  const [permissions, setPermissions] = useState(
    role.permissions.map((p) => p.name),
  );

  useEffect(() => {
    setName(role.name);
    setDescription(role.description || "");
    setPermissions(role.permissions.map((p) => p.name));
    if (isOpen) closeAll();
    setErrors({});
  }, [role, isOpen]);

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
    const {
      error,
      message,
      role: updatedRole,
      errors,
    } = await editRole({
      id: role.id,
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
        title: "Error al editar",
        description: "Error al editar el rol",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Rol editado",
      description: "Rol editado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    if (updatedRole) {
      await update({
        ...session,
        user: {
          ...session!.user,
          role: {
            id: updatedRole.id,
            name: updatedRole.name,
            permissions: updatedRole.permissions_pluck,
          },
        },
      });
    }
    console.log({ session,updatedRole });

    onClose();
  };

  return (
    <>
      <Tooltip color="warning" content="Editar rol">
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Rol: {role.name}
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
                      {PERMISSIONS.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell key={`cell-name-${item.name}`}>
                            {item.name}
                          </TableCell>
                          <TableCell
                            key={item.name}
                            className="flex flex-col gap-2"
                          >
                            {item.permissions.map((p) => (
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
