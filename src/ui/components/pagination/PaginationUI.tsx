'use client'

import { Pagination } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
        const params = new URLSearchParams(searchParams);

        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
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
            // isCompact
            size='sm'
            showControls
            initialPage={currentPage}
            total={totalPages}
            onChange={(page) => changePage(page)}
        />
    )
}
