"use client";
import {
  closeAll,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { useEffect } from "react";
import { Category } from "@/modules/admin/categories";
import { EyeIcon } from "hugeicons-react";
import Image from "next/image";
import { clsx } from "clsx";

interface Props {
  category: Category;
}

export const ViewModal = ({ category }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) closeAll();
  }, [isOpen]);

  return (
    <>
      <Tooltip content="Ver detalles">
        <Button
          onPress={onOpen}
          radius="full"
          variant="light"
          color="primary"
          isIconOnly
        >
          <EyeIcon />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="2xl"
        onClose={onClose}
        className="bg-background"
        backdrop="blur"
      >
        <ModalContent className="overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="bg-linear-to-r from-primary-300 to-primary-400 text-foreground-50 p-6">
                <div className="flex flex-col space-y-1">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-primary-50 text-sm">
                    Detalles de la categoría
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="p-0">
                <div
                  className={clsx(
                    "grid grid-cols-1 divide-x divide-gray-200 valery-dark:divide-gray-700",
                    {
                      "lg:grid-cols-2": category.image ? true : false,
                    },
                  )}
                >
                  {/* Información de la categoría */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-500 valery-dark:text-gray-400">
                        Información General
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div className="bg-foreground-900 p-4 rounded-lg">
                          <p className="text-sm font-medium text-foreground-500">
                            Nombre
                          </p>
                          <p className="mt-1 text-foreground-200 font-medium">
                            {category.name}
                          </p>
                        </div>

                        {category.parent_id && (
                          <div className="bg-foreground-900 p-4 rounded-lg">
                            <p className="text-sm font-medium text-foreground-500">
                              Categoría Padre
                            </p>
                            <p className="mt-1 text-foreground-200">
                              {category.parent?.name || "Ninguna"}
                            </p>
                          </div>
                        )}

                        <div className="bg-foreground-900 p-4 rounded-lg">
                          <p className="text-sm font-medium text-foreground-500">
                            Estado
                          </p>
                          <Chip
                            variant="flat"
                            color={category.state === 1 ? "success" : "danger"}
                          >
                            {category.state === 1 ? "Activo" : "Inactivo"}
                          </Chip>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-foreground-100">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-500 mb-4">
                        Metadatos
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground-500">
                            Creado el
                          </span>
                          <span className="text-sm text-foreground-400 font-medium">
                            {new Date(category.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                        {/* {category.updated_at && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Última actualización
                            </span>
                            <span className="text-sm text-gray-900 dark:text-white">
                              {new Date(category.updated_at).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* Vista previa de la imagen */}
                  {category.image && (
                    <div className="bg-foreground-600 p-6 flex flex-col items-center justify-center">
                      <div className="w-full max-w-xs">
                        <div className="relative aspect-square w-full rounded-xl bg-foreground-500 shadow-md overflow-hidden border border-foreground-400">
                          <Image
                            src={category.image}
                            alt={`Imagen de ${category.name}`}
                            fill
                            className="object-contain transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-sm font-medium text-foreground-300">
                            Vista previa
                          </p>
                          <p className="text-xs text-foreground-400 mt-1">
                            Imagen de la categoría
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
