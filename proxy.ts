import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => {
      // Si no hay token de sesión, no está autorizado
      if (!token) return false;

      // Validación agresiva: Revisar si el accessToken del backend ya expiró
      if (token.accessToken) {
        try {
          // Decodificar el payload del JWT (Edge runtime compatible)
          const base64Url = (token.accessToken as string).split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );

          const payload = JSON.parse(jsonPayload);

          // Si la fecha actual es mayor a la de expiración, el token ya no es válido
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            console.log("Token expirado, redirigiendo al login...");
            return false;
          }
        } catch (error) {
          console.error("Error decodificando token en middleware:", error);
          // Si el token está corrupto o no se puede leer, denegar acceso por seguridad
          return false;
        }
      }

      return true;
    },
  },
});

// Proteger todo lo que esté dentro de /admin
export const config = {
  matcher: ["/admin/:path*"],
};
