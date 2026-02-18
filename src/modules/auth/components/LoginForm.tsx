'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "@/modules/auth";
import { Button, Input } from "@heroui/react";


export const LoginForm = () => {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Iniciar Sesión</h2>

            {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                    <p className="font-medium">Error de autenticación</p>
                    <p>{errorMessage === 'Invalid credentials.' ? 'Credenciales inválidas.' : ''}</p>
                </div>
            )}

            <form action={formAction} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                    </label>
                    <Input
                        isRequired
                        errorMessage="Ingrese el correo"
                        name="email"
                        type="email"
                        color="primary"
                        placeholder="usuario@ejemplo.com"
                        variant="bordered"
                        defaultValue="laravest@gmail.com"
                        classNames={{
                            input: "text-gray-900 dark:text-white",
                            inputWrapper: [
                                "bg-white dark:bg-gray-900",
                                "border-gray-300 dark:border-gray-600",
                                "hover:border-primary-500 dark:hover:border-primary-400",
                                "focus-within:!border-primary-500 dark:focus-within:!border-primary-400"
                            ]
                        }}
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        {/* <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                            ¿Olvidaste tu contraseña?
                        </Link> */}
                    </div>
                    <Input
                        isRequired
                        errorMessage="Ingrese la contraseña"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        defaultValue="12345678"
                        variant="bordered"
                        classNames={{
                            input: "text-gray-900 dark:text-white",
                            inputWrapper: [
                                "bg-white dark:bg-gray-900",
                                "border-gray-300 dark:border-gray-600",
                                "hover:border-primary-500 dark:hover:border-primary-400",
                                "focus-within:!border-primary-500 dark:focus-within:!border-primary-400"
                            ]
                        }}
                    />
                </div>

                {/* <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Recordarme
                    </label>
                </div> */}
                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <div>
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        isDisabled={isPending}
                        isLoading={isPending}
                    // className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        Iniciar sesión
                    </Button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">¿No tienes una cuenta?</span>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href="/register"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    )
}
