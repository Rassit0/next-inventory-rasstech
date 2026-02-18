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
import {
  DeleteModal,
  EditModal,
  Warehouse,
  WarehousesConfigResponse,
} from "@/modules/admin/warehouses";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "ID", uid: "id" },
  { name: "ALMACÉN", uid: "name" },
  { name: "DIRECCIÓN", uid: "address" },
  { name: "TELÉFONO", uid: "phone" },
  { name: "SUCURSAL", uid: "branch" },
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
  warehouses: Warehouse[];
  config: WarehousesConfigResponse;
}

export const WarehousesTable = ({ config, warehouses }: Props) => {
  const renderCell = useCallback((item: Warehouse, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "name":
        return <span>{item.name}</span>;
      case "address":
        return <span>{item.address}</span>;
      case "branch":
        return <span>{item.branch.name}</span>;
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
            <EditModal warehouse={item} config={config} />
            <DeleteModal warehouse={item} />
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
      <TableBody items={warehouses}>
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
