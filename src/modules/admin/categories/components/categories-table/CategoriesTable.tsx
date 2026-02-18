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
import { AvatarItem } from "@/ui";
import { CategoriesConfigResponse, Category, DeleteModal, EditModal, ViewModal } from "@/modules/admin/categories";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const columns = [
    { name: "ID", uid: "id" },
    { name: "CATEGORÍA", uid: "name" },
    { name: "PADRE", uid: "parent" },
    { name: "FECHA DE REGISTRO", uid: "created_at" },
    { name: "ESTADO", uid: "state" },
    { name: "ACCIONES", uid: "actions" },
];


const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
};

const statusTextMap: Record<string, 'Activo' | 'Inactivo'> = {
    1: "Activo",
    0: "Inactivo",
};


interface Props {
    categories: Category[];
    config: CategoriesConfigResponse;
}

export const CategoriesTable = ({ categories, config }: Props) => {
    const renderCell = useCallback((item: Category, columnKey: React.Key) => {

        switch (columnKey) {
            case "id":
                return (
                    <span>{item.id}</span>
                );
            case "name":
                return (
                    <div className="flex items-center gap-2">
                        <AvatarItem title={item.name} image={item.image} size={35} />
                        <span>{item.name}</span>
                    </div>
                );
            case "parent":
                if (item.parent) {
                    return (
                        <Chip
                            className="capitalize"
                            color="default"
                            size="sm"
                            variant="flat"
                        >
                            {item.parent.name}
                        </Chip>
                    );
                }
                return (
                    <span>Sin padre</span>
                );
            case "created_at":
                return (
                    <span>{item.created_at.toLocaleDateString()}</span>
                );
            case "state":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.state]} size="sm" variant="flat">
                        {statusTextMap[item.state]}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <ViewModal category={item}/>
                        <EditModal category={item} config={config} />
                        <DeleteModal category={item}/>
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
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={categories}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
