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
  Select,
  Selection,
  SelectItem,
  Textarea,
  Tooltip,
  useDisclosure,
  Form,
} from "@heroui/react";
import { Edit02Icon } from "hugeicons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  CategoriesConfigResponse,
  Category,
  editCategory,
} from "@/modules/admin/categories";

interface Props {
  category: Category;
  config: CategoriesConfigResponse;
}

export const EditModal = ({ category, config }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(category.name);
  const [parentId, setParentId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(category.image);

  const modalRef = useRef(null);

  useEffect(() => {
    setName(category.name);
    setParentId(category.parent_id?.toString() || "");
    setImage(null);
    setPreview(category.image || null);
    setIsLoading(false);
    setErrors({});
    if (isOpen) closeAllToast();
  }, [isOpen, category]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    const data = {
      name,
      parent_id: parentId || undefined,
      image: image || undefined,
    };

    setIsLoading(true);
    const { error, errors } = await editCategory({ id: category.id, data });
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
      title: "Categoría editada",
      description: "Categoría editada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  return (
    <>
      <Tooltip color="warning" content="Editar categoría">
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
                Editar Categoría: id
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="grid grid-cols-1 gap-y-4">
                  <Input
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
                    selectedKeys={parentId}
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
                    {config.categories
                      .filter((c) => c.id !== category.id)
                      .map((cat) => (
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
