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
import { Delete02Icon, Edit02Icon, EyeIcon, ViewIcon } from "hugeicons-react";
import { Branch, DeleteModal, EditModal } from "@/modules/admin/branches";
import { span } from "framer-motion/client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "ID", uid: "id" },
  { name: "SUCURSAL", uid: "name" },
  { name: "DIRECCIÓN", uid: "address" },
  { name: "TELÉFONO", uid: "phone" },
  { name: "FECHA DE REGISTRO", uid: "created_at" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

// export const branches = [
//     {
//         id: 1,
//         name: "Sucursal 1",
//         address: "Dirección 1",
//         created_at: "2022-01-01",
//         status: "active",
//     },
//     {
//         id: 2,
//         name: "Sucursal 2",
//         address: "Dirección 2",
//         created_at: "2022-01-01",
//         status: "active",
//     },
//     {
//         id: 3,
//         name: "Sucursal 3",
//         address: "Dirección 3",
//         created_at: "2022-01-01",
//         status: "active",
//     },
// ];

const stateMap: Record<string, string> = {
  1: "Activo",
  0: "Inactivo",
};

const stateColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

// type User = (typeof branches)[0];

interface Props {
  branches: Branch[];
}

export const BranchesTable = ({ branches }: Props) => {
  const renderCell = useCallback((branch: Branch, columnKey: React.Key) => {
    // const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "id":
        return <span>{branch.id}</span>;
      case "name":
        return <span>{branch.name}</span>;
      case "address":
        return <span>{branch.address}</span>;
      case "phone":
        return <span>{branch.phone || "N/A"}</span>;
      case "created_at":
        return <span>{branch.created_at.toLocaleDateString()}</span>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={stateColorMap[branch.state]}
            size="sm"
            variant="flat"
          >
            {stateMap[branch.state]}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            {/* <Tooltip content="Ver usuario">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ViewIcon />
              </span>
            </Tooltip> */}
            <EditModal branch={branch} />
            <DeleteModal branch={branch}/>
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
      <TableBody items={branches}>
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
