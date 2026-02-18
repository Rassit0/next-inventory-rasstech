"use client";

import type { SVGProps } from "react";
import type { ChipProps } from "@heroui/react";

import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Delete02Icon, ViewIcon } from "hugeicons-react";
import { DeleteModal, EditModal, Supplier } from "@/modules/admin/suppliers";
import { AvatarItem } from "@/ui";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "ID", uid: "id" },
  { name: "PROVEEDOR", uid: "full_name" },
  { name: "RUC", uid: "ruc" },
  { name: "CORREO", uid: "email" },
  { name: "TELÉFONO", uid: "phone" },
  { name: "DIRECCIÓN", uid: "address" },
  { name: "FECHA DE REGISTRO", uid: "created_at" },
  { name: "ESTADO", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

const statusTextMap: Record<string, "Activo" | "Inactivo"> = {
  1: "Activo",
  0: "Inactivo",
};

interface Props {
  suppliers: Supplier[];
}

export const SuppliersTable = ({ suppliers }: Props) => {
  const renderCell = useCallback((item: Supplier, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "full_name":
        return (
          <div className="flex items-center gap-2">
            <AvatarItem title={item.full_name} image={item.image} size={35} />
            <span>{item.full_name}</span>
          </div>
        );
      case "ruc":
        return <span>{item.ruc}</span>;
      case "address":
        return <span>{item.address}</span>;
      case "phone":
        return <span>{item.phone}</span>;
      case "created_at":
        return <span>{new Date().toLocaleDateString()}</span>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.state]}
            size="sm"
            variant="flat"
          >
            {statusTextMap[item.state]}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <EditModal supplier={item} />
            <DeleteModal supplier={item} />
          </div>
        );
      default:
        return "N/A";
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      removeWrapper
      selectionMode="single"
      classNames={{
        th: ["bg-foreground-800", "text-foreground", "font-bold"],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={suppliers}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
