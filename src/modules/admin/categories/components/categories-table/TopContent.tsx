'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection } from '@heroui/react'
import { ArrowDown01Icon, Search01Icon } from 'hugeicons-react'
import { AddModal } from '../add-moodal/AddModal';
import { CategoriesConfigResponse } from "@/modules/admin/categories";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const statusOptions = [
    { name: "Activo", uid: "active" },
    { name: "Inactivo", uid: "inactive" },
    // { name: "Vacation", uid: "vacation" },
];

interface Props {
    totalItems: number;
    take: string;
    config: CategoriesConfigResponse;
}

export const TopContent = ({ totalItems, take, config }: Props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    // useEffect(() => {
    //   changePerPage(take);
    //   console.log({take})
    // }, [take])


    const changePerPage = (perPage: string) => {

        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        // si no es ninguna de las condiciones
        params.set('per_page', perPage);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[44%]",
                        inputWrapper: "border-2 border-foreground-300 text-default-foreground bg-transparent",
                    }}
                    placeholder="Buscar..."
                    size="sm"
                    startContent={<Search01Icon className="text-foreground" />}
                // value={filterValue}
                // variant="bordered"
                // onClear={() => setFilterValue("")}
                // onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button
                                endContent={<ArrowDown01Icon className="text-small" />}
                                size="sm"
                                variant="flat"
                                color="default"
                            >
                                Estado
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            // selectedKeys={statusFilter}
                            selectionMode="multiple"
                        // onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {status.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <AddModal textButton="Agregar categoría" size="sm" config={config} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {totalItems} sucursales</span>
                <label className="flex items-center text-default-400 text-small">
                    Filas por página:
                    <select
                        className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                        onChange={(e) => changePerPage(e.target.value)}
                        value={take}
                        // defaultValue={take}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    )
}
