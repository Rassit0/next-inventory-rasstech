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
import {
  DeleteModal,
  EditModal,
  User as IUser,
  UsersConfigResponse,
} from "@/modules/admin/users";
import { AvatarItem } from "@/ui";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
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

// type User = (typeof users)[0];

interface Props {
  users: IUser[];
  usersConfig: UsersConfigResponse;
}

export const UsersTable = ({ users, usersConfig }: Props) => {
  const renderCell = useCallback((item: IUser, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <AvatarItem title={item.name} image={item.avatar} />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span className="text-foreground-500">{item.email}</span>
            </div>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{item.role.name}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{item.role.name}</p> */}
          </div>
        );
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
            {/* <Tooltip content="Ver usuario">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ViewIcon />
              </span>
            </Tooltip> */}
            <EditModal user={item} usersConfig={usersConfig} />
            <DeleteModal user={item} />
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
      <TableBody items={users}>
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
