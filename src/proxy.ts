import { NextResponse } from "next/server";
import { auth } from '../auth';


export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // define routes
  const protectedRoutes = ["/matches", "/lists", "/messages"];

  // check routes
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // 1️⃣ If logged in → prevent access to login/register
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // 2️⃣ If not logged in → block protected routes
  if (!isLoggedIn && (isProtectedRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }


  // 3️⃣ Admin protection
  if (isAdminRoute && userRole !== "admin") {
    console.log("⛔ Access Denied: Not an admin");
    return NextResponse.redirect(new URL("/", nextUrl));
  }


  return NextResponse.next();
});


export const config = {
  // Use a negative lookahead to protect everything EXCEPT static files and auth APIs
  // This is safer than listing every single route manually
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};