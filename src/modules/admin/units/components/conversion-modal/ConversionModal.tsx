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
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Add01Icon, RepositoryIcon } from "hugeicons-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import {
  addConversion,
  addUnit,
  Unit,
  UnitsConfigResponse,
} from "@/modules/admin/units";
import { usePathname } from "next/navigation";

interface Props {
  unit: Unit;
  config: UnitsConfigResponse;
  textButton?: string;
  size?: "sm" | "md" | "lg";
}

export const ConversionModal = ({ unit, config, textButton, size }: Props) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [unit_to_id, setUnit_to_id] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!unit_to_id) {
      setErrors({ unit_to_id: "La unidad a convertir es requerida" });
    }

    const data = {
      unit_id: unit.id,
      unit_to_id: Number(unit_to_id),
      // state: 1 // Default to active
    };

    setIsLoading(true);
    const {
      error,
      message,
      conversion: conversionCreated,
      errors,
    } = await addConversion({
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
        description: message || "Error al crear la conversión",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Conversión creada",
      description: "Conversión creada exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });
    setUnit_to_id("");
  };

  useEffect(() => {
    if (!isOpen) {
      setUnit_to_id("");
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
        endContent={<RepositoryIcon />}
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Conversión de Unidad: {unit.name}
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="grid grid-cols-1 gap-y-4">
                  <Form
                    ref={formRef}
                    onSubmit={onSubmit}
                    validationErrors={errors}
                    className="grid grid-cols-5 items-center"
                  >
                    <Select
                      className="col-span-4"
                      isRequired
                      name="role_id"
                      radius="lg"
                      label="Unidad"
                      variant="bordered"
                      selectedKeys={[unit_to_id]}
                      onChange={(e) => setUnit_to_id(e.target.value)}
                      popoverProps={{
                        portalContainer: modalRef.current || undefined,
                      }}
                    >
                      {config.units
                        .filter((u) => u.id !== unit.id)
                        .map((u) => (
                          <SelectItem key={u.id}>{u.name}</SelectItem>
                        ))}
                    </Select>
                    <Button
                      color="primary"
                      startContent={<Add01Icon />}
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      onPress={() => formRef.current?.requestSubmit()}
                    />
                  </Form>
                  <Table
                    aria-label="Lista de Conversiones"
                    removeWrapper
                    selectionMode="single"
                    classNames={{
                      th: ["bg-foreground-800", "text-foreground", "font-bold"],
                    }}
                  >
                    <TableHeader>
                      <TableColumn>CONVERSIÓN</TableColumn>
                      <TableColumn>ACCIONES</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="Sin conversiones.">
                      {unit.conversions.map((u) => (
                        <TableRow>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>aCCION</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
