import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Proteger todo lo que esté dentro de /admin
export const config = {
  matcher: ["/admin/:path*"],
};
