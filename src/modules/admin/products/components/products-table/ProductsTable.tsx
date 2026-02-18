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
import { CategoriesConfigResponse, Category, EditModal } from "@/modules/admin/categories";
import { Product } from "@/modules/admin/products";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const columns = [
    { name: "ID", uid: "id" },
    { name: "TÍTULO", uid: "title" },
    { name: "SKU", uid: "sku" },
    { name: "CATEGORÍA", uid: "category" },
    {name: "¿Es regalo?", uid: "is_gift"},
    {name: "¿Permite sin stock?", uid: "allow_without_stock"},
    {name: "¿Tiene descuento?", uid: "is_discount"},
    {name: "¿Tiene garantía?", uid: "warranty_day"},
    {name: "IVA", uid: "iva"},
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

const yesOrNoTextMap: Record<string, 'Sí' | 'No'> = {
    1: "Sí",
    0: "No",
};

interface Props {
    products: Product[];
    config: CategoriesConfigResponse;
}

export const ProductsTable = ({ products, config }: Props) => {
    const renderCell = useCallback((item: Product, columnKey: React.Key) => {

        switch (columnKey) {
            case "id":
                return (
                    <span>{item.id}</span>
                );
            case "title":
                return (
                    <div className="flex items-center gap-2">
                        <AvatarItem title={item.title} image={item.image} />
                        <span>{item.title}</span>
                    </div>
                );
            case 'sku':
                return (
                    <span>{item.sku}</span>
                )
            case "category":
                if (item.category) {
                    return (
                        <Chip
                            className="capitalize"
                            color="default"
                            size="sm"
                            variant="flat"
                        >
                            {item.category.name}
                        </Chip>
                    );
                }
                return (
                    <span>Sin padre</span>
                );
            case 'is_gift':
                return (
                    <Chip className="capitalize" color={statusColorMap[item.is_gift ? 1 : 0]} size="sm" variant="light">
                        {yesOrNoTextMap[item.is_gift ? 1 : 0]}
                    </Chip>
                );
            case "allow_without_stock":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.allow_without_stock ? 1 : 0]} size="sm" variant="light">
                        {yesOrNoTextMap[item.allow_without_stock ? 1 : 0]}
                    </Chip>
                );
            case "is_discount":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.is_discount ? 1 : 0]} size="sm" variant="light">
                        {yesOrNoTextMap[item.is_discount ? 1 : 0]}
                    </Chip>
                );
            case "warranty_day":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.warranty_day ? 1 : 0]} size="sm" variant="light">
                        {yesOrNoTextMap[item.warranty_day ? 1 : 0]}
                    </Chip>
                );
            case "iva":
                return (
                    <span>{item.iva}</span>
                );
            case "created_at":
                return (
                    <span>{item.created_at.toLocaleDateString()}</span>
                );
            case "state":
                return (
                    <Chip className="capitalize" color={statusColorMap[item.state ? 1 : 0]} size="sm" variant="flat">
                        {statusTextMap[item.state ? 1 : 0]}
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
                        {/* <EditModal category={item} config={config} /> */}
                        <Tooltip color="danger" content="Eliminar usuario">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Delete02Icon />
                            </span>
                        </Tooltip>
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
            <TableBody items={products}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
