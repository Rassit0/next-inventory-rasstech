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

export const Filters = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    // useEffect(() => {
    //     changePerPage(take);
    //     console.log({ take })
    // }, [take])


    const changePerPage = (perPage: string) => {

        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        // si no es ninguna de las condiciones
        params.set('per_page', perPage);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                    <Button
                        endContent={<ArrowDown01Icon className="text-small" />}
                        // size="sm"
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
        </>
    )
}
