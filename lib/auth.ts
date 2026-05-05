import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      username?: string;
      telefono?: string;
      foto_perfil_url?: string;
    } & DefaultSession["user"];
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Por favor ingresa tu correo y contraseña.");
        }

        try {
          // Llamada directa al backend local para evitar el loop de Nginx
          const backendUrl = process.env.INTERNAL_API_URL || 'http://localhost:3002';
          const res = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

          const data = await res.json();

          if (res.ok && data.token) {
            return {
              id: data.user?.id?.toString() || '1',
              name: data.user?.nombre || 'Admin',
              email: data.user?.email || credentials.email,
              role: data.user?.rol || 'admin',
              username: data.user?.username,
              telefono: data.user?.telefono,
              foto_perfil_url: data.user?.foto_perfil_url,
              token: data.token,
            };
          }
          
          throw new Error(data.message || "Credenciales inválidas");
        } catch (error: any) {
          throw new Error(error.message || "Error al conectar con el servidor");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.username = (user as any).username;
        token.telefono = (user as any).telefono;
        token.foto_perfil_url = (user as any).foto_perfil_url;
        token.accessToken = (user as any).token;
      }
      
      // Manejar actualización manual de sesión
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
        session.user.telefono = token.telefono as string;
        session.user.foto_perfil_url = token.foto_perfil_url as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
