// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { apiAuthPrefix, authRoutes, publicRoutes } from './routes';
import { User } from './lib/types';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow API auth routes
  if (pathname.startsWith(apiAuthPrefix)) {
    return null;
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return null;
  }

  // Get user data from cookies
  const tokenCookie = req.cookies.get('token');
  const userCookie = req.cookies.get('user');

  const isLoggedIn = !!tokenCookie && !!userCookie;
  const userData: User | null = userCookie
    ? parseUserCookie(userCookie.value)
    : null;

  // Handle auth routes FIRST (sign-in, sign-up, etc.)
  if (authRoutes.includes(pathname) || pathname.startsWith('/onboarding/')) {
    if (isLoggedIn && userData) {
      // Get user role
      const userRole = userData?.roles?.[0]?.name;

      if (!userRole) {
        // If logged in but no role, stay on auth page or redirect to error
        return null;
      }

      // Redirect based on user role after login
      const redirectPath = getUserRoleRedirect(userRole);
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
    // Not logged in, allow access to auth routes
    return null;
  }

  // From here on, we're dealing with protected routes
  // Redirect to sign-in if not logged in
  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${pathname}`, req.url),
    );
  }

  // Get user role for protected route checks
  const userRole = userData?.roles?.[0]?.name;

  // If logged in but no role, redirect to sign-in
  if (!userRole) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Role-based route protection
  // If user tries to access /company but is not a company user
  if (pathname.startsWith('/company') && userRole !== 'employer') {
    return NextResponse.redirect(new URL('/talent/dashboard', req.url));
  }

  // If user tries to access /talent but is not a talent user
  if (pathname.startsWith('/talent') && userRole !== 'talent') {
    return NextResponse.redirect(new URL('/company/dashboard', req.url));
  }

  return null;
}

function isPublicRoute(pathname: string): boolean {
  if (publicRoutes.includes(pathname)) {
    return true;
  }

  return false;
}

function parseUserCookie(cookieValue: string): User | null {
  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
}

function getUserRoleRedirect(role: string): string {
  switch (role) {
    case 'employer':
      return '/company/dashboard';
    case 'talent':
      return '/talent/dashboard';
    default:
      return '/sign-in';
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
