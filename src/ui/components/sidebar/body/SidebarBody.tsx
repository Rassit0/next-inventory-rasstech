import { NavSection } from '@/ui';
import { SidebarSections } from './SidebarSections'
import { IoClose } from 'react-icons/io5';

interface Props {
    sections: NavSection[];
    isSidebarOpen: boolean;
    hoverSidebar: boolean;
    closeSidebar: () => void;
}

export const SidebarBody = ({ sections, isSidebarOpen, hoverSidebar, closeSidebar }: Props) => {
    return (
        <div>
            {/* <!-- Items --> */}
            <SidebarSections sections={sections} isSidebarOpen={isSidebarOpen} hoverSidebar={hoverSidebar} />
            {/* boton para cerrar el sidebar en modo celular */}
            {
                isSidebarOpen && (
                    <div className="flex md:hidden w-full items-center justify-center">
                        <button
                            onClick={closeSidebar}
                            className="
                            relative flex items-center justify-center
                            text-gray-800 group 
                            hover:bg-red-50 hover:text-red-600 
                            transition-width duration-300
                            rounded-full w-12 h-12"
                        >
                            <IoClose />
                        </button>
                    </div>
                )
            }
        </div >
    )
}
