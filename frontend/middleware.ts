import { withAuth,NextRequestWithAuth } from "next-auth/middleware";

import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/signin`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {matcher:["/projects", "/projects/create", "/profile/:path*", "/projects/:path*/settings"]}