"use client";

import { LoginForm } from '@/modules/auth';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function LoginPage() {



  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo-colorido-borroso-vivo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.1)' /* Pequeño zoom para evitar bordes al hacer zoom */
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Logo Section */}
          <div className="bg-primary-600 p-6 flex justify-center">
            <div className="w-32 h-32 relative">
              <Image
                src="/rasstech_logo.png"
                alt="RassTech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Login Form */}
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <div className="mt-6 text-center text-sm text-white">
          <p> {new Date().getFullYear()} RassTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}