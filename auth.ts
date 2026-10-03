import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? '';
const OWNER_PASSWORD_HASH = process.env.OWNER_PASSWORD_HASH ?? '';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        if (email.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          password,
          OWNER_PASSWORD_HASH
        );
        if (!passwordMatches) return null;

        return {
          id: 'owner',
          email: OWNER_EMAIL,
          name: 'Bishopric Admin',
        };
      },
    }),
  ],
});