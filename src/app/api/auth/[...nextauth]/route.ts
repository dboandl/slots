import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      /** implementation based on tutroial:  */
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (!credentials) return null;
        // TODO @Chris: database operations to verify credentials
        return {
          id: "1",
          Email: credentials.email,
        };

        /*example: 
        
        const { email, password } = credentials
        // Fetch user and password hash from your database
        // Example: const user = await getUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id, name: user.name, email: user.email }
        } else {
          throw new Error('Invalid credentials')
        }*/
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
