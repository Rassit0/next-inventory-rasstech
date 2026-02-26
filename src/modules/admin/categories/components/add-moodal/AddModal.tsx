"use client";
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
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  addCategory,
  CategoriesConfigResponse,
} from "@/modules/admin/categories";

interface Props {
  textButton?: string;
  isIcon?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "flat"
    | "light"
    | "solid"
    | "bordered"
    | "faded"
    | "shadow"
    | "ghost";
  config: CategoriesConfigResponse;
  revalidatePath?: string;
}

export const AddModal = ({
  textButton,
  variant,
  isIcon,
  size,
  config,
  revalidatePath = "/categories",
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formCategoryRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmitCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Record<string, string> = {};

    if (!name || name.trim().length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (name.length > 250) {
      validationErrors.name = "El nombre no debe exceder los 250 caracteres";
    }

    // Validar tamaño de la imagen (2MB = 2 * 1024 * 1024 bytes)
    if (image && image.size > 2 * 1024 * 1024) {
      validationErrors.image = "La imagen no debe superar los 2MB";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const { error, message, category, errors } = await addCategory({
      name,
      parent_id: parentId || undefined,
      image: image || undefined,
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
        description: "Error al crear la categoría",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Categoría creada",
      description: "Categoría creada exitosamente",
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
      setParentId("");
      setImage(null);
      setPreview(null);
      setIsLoading(false);
      if (isOpen) closeAll();
      setErrors({});
    }
  }, [isOpen]);

  return (
    <>
      {isIcon ? (
        <Tooltip color="primary" content="Agregar categoría">
          <Button
            onPress={onOpen}
            color="primary"
            variant={variant}
            endContent={<Add01Icon />}
            isIconOnly
            size={size}
          />
        </Tooltip>
      ) : (
        <Button
          onPress={onOpen}
          color="primary"
          variant={variant}
          endContent={<Add01Icon />}
          size={size}
        >
          {textButton}
        </Button>
      )}

      <Modal
        ref={modalRef}
        key="modal-form-add-category"
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
                Agregar Categoría
              </ModalHeader>
              <ModalBody className="w-full">
                <Form
                  key="add-category-modal-form"
                  id="register-category-modal-form"
                  ref={formCategoryRef}
                  onSubmit={onSubmitCategory}
                  validationErrors={errors}
                  className="contents"
                >
                  <div className="w-full col-span-full grid grid-cols-1 gap-y-4">
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
                    <Select
                      name="parentId"
                      radius="lg"
                      label="Padre"
                      placeholder="Seleccione un padre"
                      variant="bordered"
                      selectedKeys={[parentId]}
                      onSelectionChange={(value) =>
                        setParentId(value.currentKey || "")
                      }
                      className="w-full"
                      classNames={{
                        value: ["group-data-[has-value=true]:text-foreground"],
                      }}
                      popoverProps={{
                        // ESto ponemos para que el contenedor este dentro del modal y no afuera que ocasiona conflictos o adevertencias
                        portalContainer: modalRef.current || undefined,
                      }}
                    >
                      {config.categories.map((cat) => (
                        <SelectItem key={cat.id} textValue={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </Select>
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
                  type="button"
                  onPress={() => formCategoryRef.current?.requestSubmit()}
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
