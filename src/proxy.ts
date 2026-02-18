import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth, authConfig } from "@/auth.config";
import NextAuth from 'next-auth';

// This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {

//   if (request.nextUrl.pathname.startsWith('/checkout')) {
//     const session = await auth()

//     if (!session?.user) {
//       return NextResponse.redirect(new URL('/auth/login?redirectTo=' + request.nextUrl.pathname, request.url))
//     }
//   }


//   return NextResponse.next();
// }

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: '/checkout/:path*',
// }

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};