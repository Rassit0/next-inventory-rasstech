"use client";

import { Providers } from "@/shared/providers";
import { ImagesUpload } from "@/ui/components/upload-files";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  Selection,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon, Edit02Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { addUser, UsersConfigResponse } from "@/modules/admin/users";

interface Props {
  textButton?: string;
  sizeButton?: "sm" | "md" | "lg";
  config: UsersConfigResponse;
}

export const AddModal = ({ textButton, sizeButton, config }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [branchId, setBranchId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [gender, setGender] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    if (!name || name.trim().length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (name.length > 250) {
      validationErrors.name = "El nombre no debe exceder los 250 caracteres";
    }

    if (surname && surname.trim().length < 3) {
      validationErrors.surname = "El apellido debe tener al menos 3 caracteres";
    } else if (surname.length > 250) {
      validationErrors.surname =
        "El apellido no debe exceder los 250 caracteres";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name,
      surname: surname || undefined,
      email,
      phone: phone || undefined,
      type_document: documentType || undefined,
      n_document: documentNumber || undefined,
      branch_id: branchId || undefined,
      role_id: roleId,
      gender: gender || undefined,
      imagen,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    // console.log({ data })

    setIsLoading(true);
    const { error, message, user, errors } = await addUser({ data });
    setIsLoading(false);
    if (errors) {
      setErrors(errors);
      return;
    }

    if (error) {
      // closeAll();
      addToast({
        title: "Error al crear",
        description: "Error al crear el usuario",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Usuario creado",
      description: "Usuario creado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  const resetForm = () => {
    setFirstSubmit(false);
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setDocumentType("");
    setDocumentNumber("");
    setBranchId("");
    setRoleId("");
    setGender("");
    setImagen(null);
  };

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <>
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
                  Agregar Usuario
                </ModalHeader>
                <ModalBody>
                  <Form
                    ref={formRef}
                    validationErrors={errors}
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-4">
                      <Input
                        isRequired
                        name="name"
                        radius="lg"
                        label="Nombre"
                        placeholder="Ingrese el nombre del usuario"
                        type="text"
                        variant="bordered"
                        value={name}
                        onValueChange={setName}
                        onFocusChange={() => {
                          if (name) {
                            setName(
                              name.charAt(0).toUpperCase() +
                                name.slice(1).toLowerCase(),
                            );
                          }
                        }}
                      />
                      <Input
                        name="surname"
                        radius="lg"
                        label="Apellido"
                        placeholder="Ingrese el apellido del usuario"
                        type="text"
                        variant="bordered"
                        value={surname}
                        onValueChange={setSurname}
                        onFocusChange={() => {
                          if (name) {
                            setName(
                              name.charAt(0).toUpperCase() +
                                name.slice(1).toLowerCase(),
                            );
                          }
                        }}
                      />
                      <Input
                        isRequired
                        name="email"
                        radius="lg"
                        label="Email"
                        placeholder="Ingrese el correo del usuario"
                        type="email"
                        variant="bordered"
                        value={email}
                        onValueChange={setEmail}
                      />
                      <Input
                        name="phone"
                        radius="lg"
                        label="Teléfono"
                        placeholder="Ingrese el teléfono del usuario"
                        type="text"
                        variant="bordered"
                        value={phone}
                        onValueChange={setPhone}
                      />
                      <Select
                        name="type_document"
                        radius="lg"
                        label="Tipo de Documento"
                        variant="bordered"
                        selectedKeys={[documentType]}
                        onChange={(e) => setDocumentType(e.target.value)}
                        popoverProps={{
                          portalContainer: modalRef.current || undefined,
                        }}
                      >
                        <SelectItem key="CI">CI</SelectItem>
                      </Select>
                      <Input
                        name="n_document"
                        radius="lg"
                        label="Número de Documento"
                        placeholder="Ingrese el nombre del rol"
                        type="text"
                        variant="bordered"
                        value={documentNumber}
                        onValueChange={setDocumentNumber}
                        isInvalid={documentType !== "" && documentNumber === ""}
                        errorMessage="El número de documento es obligatorio"
                      />
                      <Select
                        isRequired
                        name="role_id"
                        radius="lg"
                        label="Rol"
                        variant="bordered"
                        selectedKeys={[roleId]}
                        onChange={(e) => setRoleId(e.target.value)}
                        popoverProps={{
                          portalContainer: modalRef.current || undefined,
                        }}
                      >
                        {config.roles.map((role) => (
                          <SelectItem key={role.id}>{role.name}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        name="branch_id"
                        radius="lg"
                        label="Sucursal"
                        variant="bordered"
                        selectedKeys={[branchId]}
                        onChange={(e) => setBranchId(e.target.value)}
                        popoverProps={{
                          portalContainer: modalRef.current || undefined,
                        }}
                      >
                        {config.branches.map((branch) => (
                          <SelectItem key={branch.id}>{branch.name}</SelectItem>
                        ))}
                      </Select>

                      <RadioGroup
                        name="gender"
                        className="ml-1"
                        value={gender}
                        onValueChange={setGender}
                      >
                        <Radio value="male">Masculino</Radio>
                        <Radio value="female">Femenino</Radio>
                      </RadioGroup>
                      <Input
                        radius="lg"
                        label="Avatar"
                        type="file"
                        variant="bordered"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setImagen(file);
                        }}
                      />
                      <Input
                        isRequired
                        name="password"
                        radius="lg"
                        label="Contraseña"
                        type="password"
                        variant="bordered"
                        value={password}
                        onValueChange={setPassword}
                      />
                      <Input
                        isRequired
                        name="password_confirmation"
                        radius="lg"
                        label="Confirmar contraseña"
                        type="password"
                        variant="bordered"
                        value={passwordConfirmation}
                        onValueChange={setPasswordConfirmation}
                        isInvalid={
                          firstSubmit &&
                          password &&
                          password !== passwordConfirmation
                            ? true
                            : false
                        }
                        errorMessage="Las contraseñas no coinciden"
                      />
                    </div>
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
