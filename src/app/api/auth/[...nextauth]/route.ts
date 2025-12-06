// import prisma from '@/lib/prisma'
// import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
// import { signInEmailPassword } from '@/auth/actions/auth-actions';

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo electrónico", type: "email", placeholder: "usuario@gmail.com" },
                password: { label: "Contraseña", type: "password", placeholder: '********' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                // const user = await signInEmailPassword(credentials!.email, credentials!.password)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
        // ...add more providers here
    ],

    session: {
        strategy: 'jwt'
    },

    // Es lo que pasa despues de autenticar
    callbacks: {
        // ejemplo para cuando no se deja autenticar, se puede poner propias condicionales
        // async signIn({ user }) {
        //     console.log(user)
        //     return false;
        // }
        async signIn({ user, account, profile, email, credentials }) {

            return true;
        },
        // Aqui se tiene la informacion que va ser parte del jwt
        async jwt({ token, user, account, profile }) {
            // El token ya viene con los nuevos parámetros roles y isActive

            // const dbUser = await prisma.user.findUnique({
            //     where: { email: token.email || 'no-email' }
            // })

            // if (dbUser?.isActive === false) {
            //     throw Error('Usuario no está activo')
            // }

            // if (dbUser) {
            //     token.id = dbUser.id;
            //     token.roles = dbUser.roles;
            //     token.isActive = dbUser.isActive;
            // }
            // console.log(token)

            return token
        },
        //
        async session({ session, token, user }) {
            if (session.user && token) {
                session.user.id = token.id || '';
                session.user.roles = token.roles ?? [];
                session.user.isActive = token.isActive ?? true;
            }

            // console.log(token)

            return session
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };