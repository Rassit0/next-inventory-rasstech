"use client";
import {
  closeAll,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Delete01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { Branch, deleteBranch } from "@/modules/admin/branches";

interface Props {
  branch: Branch;
}

export const DeleteModal = ({ branch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const { error, message } = await deleteBranch(branch.id.toString());
    setIsLoading(false);

    if (error) {
      // closeAll();
      addToast({
        title: "Error al crear",
        description: message || "Error al eliminar la sucursal",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Categoría eliminada",
      description: "Categoría eliminada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });

    onClose();
  };

  useEffect(() => {
    if (isOpen) closeAll();
  }, [isOpen]);

  return (
    <>
      <Tooltip color="warning" content="Eliminar sucursal">
        <Button
          onPress={onOpen}
          radius="full"
          variant="light"
          color="danger"
          isIconOnly
        >
          <Delete01Icon />
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
              <ModalHeader className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-danger-100 p-3">
                  <Delete01Icon className="h-10 w-10 text-danger-600" />
                </div>
                <span className="text-lg font-semibold">
                  ¿Estás seguro de eliminar esta sucursal?
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="text-center text-foreground-500">
                  <p>
                    La sucursal{" "}
                    <span className="font-medium text-foreground">
                      {branch.name}
                    </span>{" "}
                    será eliminada permanentemente.
                  </p>
                  <p className="mt-1">Esta acción no se puede deshacer.</p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center gap-4">
                <Button
                  isDisabled={isLoading}
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="min-w-[120px]"
                >
                  Cancelar
                </Button>
                <Button
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  color="danger"
                  className="min-w-[120px]"
                  onPress={handleDelete}
                >
                  Sí, eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
