import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { z } from "zod";
import { login } from "./modules/auth";
import NextAuth from "next-auth";

const protectedRoutes = [
  "/dashboard",
  "/products",
  "/branches",
  "/categories",
  "/units",
];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, method } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      // Si no es una ruta protegida, permitir el acceso
      if (!isProtectedRoute) {
        return true;
      }

      // Si es una petición que no es GET, permitir el acceso
      if (method !== "GET") {
        return true;
      }

      // Para peticiones GET a rutas protegidas, verificar autenticación
      if (!isLoggedIn) {
        return false; // Redirigirá a /login
      }

      return true;
    },
    jwt({ token, user }) {
      // Aqui se puede refrescar el user
      // Login inicial
      if (user) {
        token.user = user;
        token.access_token = user.access_token;
        token.expires_at = user.expires_at;
      }

      // Token expirado
      if (token.expires_at && Date.now() > token.expires_at) {
        return null; // fuerza logout
      }

      return token;
    },
    session({ session, token }) {
      // Si el token no existe o expiró,
      // devuelve la sesión "vacía" por defecto
      if (token) {
        session.user = token.user as User;
        session.access_token = token.access_token as string;
        session.expires_at = token.expires_at as number;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log('email ingresado:' + email)

        try {
          const { error, response } = await login({
            email: email.toLowerCase(),
            password,
          });

          console.log("Login response:", { error, response });

          if (error || !response?.user) {
            console.log("Login failed:", { error, user: response?.user });
            return null;
          }

          // Map the response to match the User type expected by NextAuth
          const user = {
            id: response.user.email, // or response.user.id if available
            email: response.user.email,
            name: response.user.full_name,
            full_name: response.user.full_name,
            image: response.user.avatar,
            emailVerified: new Date(),
            role: {
              ...response.user.role,
              permissions: response.user.role.permissions,
            },
            access_token: response.access_token,
            token_type: response.token_type,
            expires_at: response.expires_at,
          };

          console.log("Mapped user:", user);
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ], // Add providers with an empty array for now
  trustHost:
    process.env.NODE_ENV === "development" ||
    process.env.NEXTAUTH_TRUST_HOST === "true",
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig); // auth es el middleware
