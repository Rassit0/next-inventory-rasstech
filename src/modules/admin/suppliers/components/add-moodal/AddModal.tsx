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
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { addSupplier } from "@/modules/admin/suppliers";

interface Props {
  textButton?: string;
  size?: "sm" | "md" | "lg";
}

export const AddModal = ({ textButton, size }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [full_name, setFull_name] = useState("");
  const [ruc, setRuc] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Record<string, string> = {};

    if (!full_name || full_name.trim().length < 3) {
      validationErrors.full_name = "El nombre debe tener al menos 3 caracteres";
    } else if (full_name.length > 255) {
      validationErrors.full_name =
        "El nombre no debe exceder los 255 caracteres";
    }

    if (!address || address.trim().length < 3) {
      validationErrors.description =
        "La dirección es obligatoria y debe tener al menos 3 caracteres";
    } else if (address.length > 500) {
      validationErrors.description =
        "La dirección no debe exceder los 500 caracteres";
    }

    if (ruc && ruc.length > 20) {
      validationErrors.description =
        "El RUC/NIT no debe exceder los 20 caracteres";
    }

    if (email && email.length > 255) {
      validationErrors.description =
        "El correo no debe exceder los 255 caracteres";
    }

    if (phone && phone.length < 3) {
      validationErrors.description =
        "El teléfono debe tener al menos 3 caracteres";
    }

    // Validar tamaño de la imagen (2MB = 2 * 1024 * 1024 bytes)
    if (image && image.size > 2 * 1024 * 1024) {
      validationErrors.image = "La imagen no debe superar los 2MB";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      full_name: full_name.trim(),
      ruc: ruc.trim(),
      email: email?.trim() || undefined,
      address: address?.trim() || undefined,
      phone: phone,
      image: image || undefined,
    };

    setIsLoading(true);
    const { error, message, supplier, errors } = await addSupplier({
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
        description: message || "Error al crear el proveedor",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Proveedor creado",
      description: "Proveedor creado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setFull_name("");
      setRuc("");
      setEmail("");
      setAddress("");
      setPhone("");
      setImage(null);
      setPreview(null);
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
                  Agregar Proveedor
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
                      name="full_name"
                      radius="lg"
                      label="Nombre"
                      placeholder="Ingrese el nombre del proveedor"
                      type="text"
                      variant="bordered"
                      value={full_name}
                      onValueChange={setFull_name}
                    />
                    <Input
                      isRequired
                      name="ruc"
                      radius="lg"
                      label="RUC/NIT"
                      placeholder="Ingrese el RUC/NIT del proveedor"
                      type="text"
                      variant="bordered"
                      value={ruc}
                      onValueChange={setRuc}
                    />
                    <Input
                      name="email"
                      radius="lg"
                      label="Correo"
                      placeholder="Ingrese el correo del proveedor"
                      type="email"
                      variant="bordered"
                      value={email}
                      onValueChange={setEmail}
                    />
                    <Textarea
                      isRequired
                      name="address"
                      radius="lg"
                      label="Dirección"
                      placeholder="Ingrese la dirección del proveedor"
                      type="text"
                      variant="bordered"
                      value={address}
                      onValueChange={setAddress}
                    />
                    <Input
                      isRequired
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

                    {preview && (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={preview}
                          alt="Vista previa"
                          className="max-h-40 w-auto rounded-lg border border-default-200"
                        />
                      </div>
                    )}

                    <Input
                      name="image"
                      radius="lg"
                      label="Imagen"
                      type="file"
                      variant="bordered"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImage(file);

                        // Create preview
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setPreview(null);
                        }
                      }}
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
