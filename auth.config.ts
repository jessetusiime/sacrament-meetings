import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
  authorized({ auth, request: { nextUrl } }) {
    const isLoggedIn = !!auth?.user;
    const path = nextUrl.pathname;

    // Protect specific admin-only URLs
    const isProtected =
      path === '/meetings/new' ||
      /^\/meetings\/[^/]+\/edit$/.test(path);

    if (isProtected) {
      if (isLoggedIn) return true;
      return false;
    }

    if (isLoggedIn && path === '/login') {
      return Response.redirect(new URL('/meetings/new', nextUrl));
    }

    return true;
  },
},
  providers: [],
} satisfies NextAuthConfig;