import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id, email, password_hash, name, role
    FROM users
    WHERE LOWER(email) = LOWER(${email})
  `;
  return (rows[0] as unknown as User) ?? null;
}