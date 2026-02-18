
import { ButtonOpenSidebar, ButtonTheme, Search, UserMenu } from "@/ui";


export const Navbar = () => {


    return (
        <nav className="flex flex-row bg-background h-16">
            <div className="flex justify-between items-center pl-3 px-6 flex-1">

                <div>
                    {/* <!-- Ícono de Menú (cyan) --> */}
                    <ButtonOpenSidebar />

                    <Search />
                </div>

                {/* <!-- Ícono de Notificación y Perfil --> */}
                <div className="flex justify-center items-center space-x-4">
                    {/* <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        startContent={<Notification02Icon strokeWidth={2} size={20} className=" text-foreground" />}
                    /> */}
                    <ButtonTheme />
                    {/* <!-- Botón de Perfil --> */}
                    <UserMenu />
                </div>
            </div>
        </nav>
    )
}
