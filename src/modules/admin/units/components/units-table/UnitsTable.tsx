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
import {
  DeleteModal,
  EditModal,
  Unit,
  UnitsConfigResponse,
} from "@/modules/admin/units";
import { useSession } from "next-auth/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "ID", uid: "id" },
  { name: "UNIDAD", uid: "name" },
  { name: "DESCRIPCIÓN", uid: "description" },
  { name: "FECHA DE REGISTRO", uid: "created_at" },
  { name: "ESTADO", uid: "state" },
  { name: "ACCIONES", uid: "actions" },
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
  units: Unit[];
  config: UnitsConfigResponse;
}

export const UnitsTable = ({ units, config }: Props) => {
  const renderCell = useCallback((item: Unit, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "name":
        return <span>{item.name}</span>;
      case "description":
        return <span>{item.description}</span>;
      case "created_at":
        return <span>{item.created_at.toLocaleDateString()}</span>;
      case "state":
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
            {/* <ViewModal unit={item} /> */}
            <EditModal
              unit={item}
              config={config}
            />
            <DeleteModal unit={item} />
          </div>
        );
      default:
        return item != null ? String(item) : null;
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
      <TableBody items={units}>
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
