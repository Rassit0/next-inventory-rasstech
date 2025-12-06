import { Logout03Icon } from 'hugeicons-react';

interface Props{
    isSidebarOpen: boolean;
}

export const SidebarFooter = ({isSidebarOpen}: Props) => {

    const handleLogout = () => {
        // Aquí puedes agregar la lógica de cierre de sesión
        console.log('Cerrar sesión');
        // router.push('/login');
    };
    return (
        <div className='pb-8'>
            {/* <!-- Cerrar sesión --> */}
            <button
                onClick={handleLogout}
                className="w-full relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-600 rounded-lg group hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
                <Logout03Icon strokeWidth={2} className="text-xl shrink-0" />
                <span className={`font-medium transition-all duration-200 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>Cerrar sesión</span>
            </button>
        </div >
    )
}
