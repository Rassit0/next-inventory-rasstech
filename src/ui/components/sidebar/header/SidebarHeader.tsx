import { ArrowRightDoubleIcon } from 'hugeicons-react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
    isSidebarOpen: boolean;
    hoverSidebar: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}

export const SidebarHeader = ({ isSidebarOpen, hoverSidebar, openSidebar, closeSidebar }: Props) => {

    return (
        < div className={`h-18 flex items-center justify-between ${isSidebarOpen || hoverSidebar ? 'pl-5' : 'pl-0.5'} gap-2 transition-all duration-300 ease-in-out`}>
            <div className='flex items-center gap-2'>
                {/* logo */}
                {/* < div className="text-primary text-3xl" >
                    <GiChicken />
                </div > */}
                <div className="w-12 h-12 relative">
                    <Image src="/rasstech_logo.png" alt="Logo" fill className="object-contain" />
                </div>
                {/* titulo */}
                < span className={`${!isSidebarOpen && 'opacity-0'} group-hover:opacity-100 transition duration-150 ease-in-out group-hover:block text-lg font-bold`}>
                    RASSTECH
                </span >
            </div>

            <button
                onClick={isSidebarOpen ? closeSidebar : openSidebar}
                className="hidden lg:block cursor-pointer mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Expandir/cerrar sidebar"
            >
                <ArrowRightDoubleIcon
                    className={`text-gray-800 [&>path:nth-child(2)]:text-gray-500 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-rotate-180' : ''
                        }`}
                    size={20}
                    strokeWidth={2.5}
                />
            </button>
            <button
                onClick={closeSidebar}
                className="lg:hidden mr-1 p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Cerrar sidebar"
            >
                <AiOutlineClose
                    className="text-gray-800"
                    size={20}
                />
            </button>

        </div >
    )
}
