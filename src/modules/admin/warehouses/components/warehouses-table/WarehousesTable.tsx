'use client'

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
import { EditModal } from "@/modules/admin/warehouses";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const columns = [
    { name: "ID", uid: "id" },
    { name: "ALMACÉN", uid: "name" },
    { name: "DIRECCIÓN", uid: "address" },
    { name: "SUCURSAL", uid: "branch" },
    { name: "FECHA DE REGISTRO", uid: "created_at" },
    { name: "ESTADO", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export const branches = [
    {
        id: 1,
        name: "Almacén 1",
        address: "Dirección 1",
        branch: 'Sucursal 1',
        created_at: "2022-01-01",
        status: "active",
    },
    {
        id: 2,
        name: "Almacén 2",
        address: "Dirección 2",
        branch: 'Sucursal 2',
        created_at: "2022-01-01",
        status: "active",
    },
    {
        id: 3,
        name: "Almacén 3",
        address: "Dirección 3",
        branch: 'Sucursal 3',
        created_at: "2022-01-01",
        status: "active",
    },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type Warehouse = (typeof branches)[0];

export const WarehousesTable = () => {
    const renderCell = useCallback((user: Warehouse, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Warehouse];

        switch (columnKey) {
            case "id":
                return (
                    <span>{cellValue}</span>
                );
            case "name":
                return (
                    <span>{cellValue}</span>
                );
            case "address":
                return (
                    <span>{cellValue}</span>
                );
            case "branch":
                return (
                    <span>{cellValue}</span>
                );
            case "created_at":
                return (
                    <span>{new Date().toLocaleDateString()}</span>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Ver usuario">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ViewIcon />
                            </span>
                        </Tooltip>
                        <EditModal />
                        <Tooltip color="danger" content="Eliminar usuario">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Delete02Icon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
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
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={branches}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
