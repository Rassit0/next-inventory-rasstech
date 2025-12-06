'use client'

import { Pagination } from '@heroui/react'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
    className?: string;
    totalPages: number;
}

export const PaginationUI = ({ className, totalPages }: Props) => {

    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || '1');

    if (currentPage < 1 || isNaN(currentPage)) {
        redirect(pathname);
    }

    const changePage = (page: number) => {

        const params = new URLSearchParams(searchParams);

        // si no es ninguna de las condiciones
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Pagination
            className={className}
            showControls
            initialPage={currentPage}
            total={totalPages}
            onChange={(page) => changePage(page)}
        />
    )
}
