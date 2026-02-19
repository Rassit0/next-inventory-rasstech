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
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon, Edit02Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import {
  addUser,
  editUser,
  User,
  UsersConfigResponse,
} from "@/modules/admin/users";

interface Props {
  textButton?: string;
  sizeButton?: "sm" | "md" | "lg";
  usersConfig: UsersConfigResponse;
  user: User;
}

export const EditModal = ({
  textButton,
  sizeButton,
  usersConfig,
  user,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string>(user.name);
  const [surname, setSurname] = useState<string>(user.surname || "");
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [documentType, setDocumentType] = useState<string>(
    user.type_document || "",
  );
  const [documentNumber, setDocumentNumber] = useState<string>(
    user.n_document || "",
  );
  const [branchId, setBranchId] = useState<string>(user.branch_id || "");
  const [roleId, setRoleId] = useState<string>(user.role_id?.toString() || "");
  const [gender, setGender] = useState<string>(user.gender || "");
  const [imagen, setImagen] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstSubmit) setFirstSubmit(true);

    let validationErrors = false;
    if (!name || !email || !roleId) {
      validationErrors = true;
      setErrors({
        name: !name ? "El nombre es requerido" : "",
        email: !email ? "El correo es requerido" : "",
        roleId: !roleId ? "El rol es requerido" : "",
        // password: !password ? 'La contraseña es requerida' : '',
      });
    }

    if (validationErrors) return;

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
      password: password || undefined,
      password_confirmation: passwordConfirmation || undefined,
    };

    // console.log({ data })

    setIsLoading(true);
    const { error, message } = await editUser({ id: user.id, data });
    setIsLoading(false);

    if (error) {
      // closeAll();
      addToast({
        title: "Error al editar",
        description: "Error al editar el usuario",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Usuario editado",
      description: "Usuario editado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  const resetForm = () => {
    setFirstSubmit(false);
    setName(user.name);
    setSurname(user.surname || "");
    setEmail(user.email);
    setPhone(user.phone || "");
    setDocumentType(user.type_document || "");
    setDocumentNumber(user.n_document || "");
    setBranchId(user.branch_id || "");
    setRoleId(user.role_id?.toString() || "");
    setGender(user.gender || "");
    setImagen(null);
  };

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <>
      <Tooltip color="warning" content="Editar usuario">
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-4"
                    validationErrors={errors}
                    onSubmit={handleSubmit}
                  >
                    <Input
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
                      radius="lg"
                      label="Teléfono"
                      placeholder="Ingrese el teléfono del usuario"
                      type="text"
                      variant="bordered"
                      value={phone}
                      onValueChange={setPhone}
                    />
                    <Select
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
                      <SelectItem key="PASAPORTE">Pasaporte</SelectItem>
                    </Select>
                    <Input
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
                      radius="lg"
                      label="Rol"
                      variant="bordered"
                      selectedKeys={[roleId]}
                      onChange={(e) => setRoleId(e.target.value)}
                      popoverProps={{
                        portalContainer: modalRef.current || undefined,
                      }}
                    >
                      {usersConfig.roles.map((role) => (
                        <SelectItem key={role.id}>{role.name}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      radius="lg"
                      label="Sucursal"
                      variant="bordered"
                      selectedKeys={[branchId]}
                      onChange={(e) => setBranchId(e.target.value)}
                      popoverProps={{
                        portalContainer: modalRef.current || undefined,
                      }}
                    >
                      {usersConfig.branches.map((branch) => (
                        <SelectItem key={branch.id}>{branch.name}</SelectItem>
                      ))}
                    </Select>

                    <RadioGroup
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
                      name="password"
                      radius="lg"
                      label="Contraseña"
                      type="password"
                      variant="bordered"
                      value={password}
                      onValueChange={setPassword}
                    />
                    <Input
                      name="password_confirmation"
                      radius="lg"
                      label="Confirmar contraseña"
                      type="password"
                      variant="bordered"
                      value={passwordConfirmation}
                      onValueChange={setPasswordConfirmation}
                      isInvalid={
                        password && password !== passwordConfirmation
                          ? true
                          : false
                      }
                      errorMessage="Las contraseñas no coinciden"
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
