'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection } from '@heroui/react'
import { Add01Icon, ArrowDown01Icon, Search01Icon } from 'hugeicons-react'
import React from 'react'
import { AddModal } from '../add-moodal/AddModal';

const statusOptions = [
    { name: "Activo", uid: "active" },
    { name: "Inactivo", uid: "inactive" },
    // { name: "Vacation", uid: "vacation" },
];

interface Props {
    totalItems: number;
    take: number;
    
}

export const TopContent = ({ totalItems,take }: Props) => {
    
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
                    <AddModal textButton="Agregar categoría" size="sm" />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {totalItems} sucursales</span>
                <label className="flex items-center text-default-400 text-small">
                    Filas por página:
                    <select
                        className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                        // onChange={onRowsPerPageChange}
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
