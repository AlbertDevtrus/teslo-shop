import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

const authRoutes = ['/auth/login', '/auth/register'];
const protectedRoutes = ['/profile'];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },

  callbacks: {

    jwt({ token, user }) {
      if(user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {

      session.user = token.data as any;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);

      if (authRoutes.includes(nextUrl.pathname)) {
        if(isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));;
        }
        return true;
      } else if(protectedRoutes.includes(nextUrl.pathname)) {
        if(!isLoggedIn) {
          return Response.redirect(new URL(`/auth/login?origin=${nextUrl.pathname}`, nextUrl));
        }
        return true;
      } 
      
      return true;
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
        
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

        if(!user) throw new Error('User not found');

        if(!bcryptjs.compareSync(password, user.password)) throw new Error('Wrong password');

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);