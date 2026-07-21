import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update user's auth session and get authenticated user
  const { supabaseResponse, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  const isAuthRoute = pathname === '/login' || pathname === '/signup' || pathname.startsWith('/auth')
  const isDashboardRoute = pathname.includes('/dashboard')
  const isRootRoute = pathname === '/'

  // Redirect unauthenticated users trying to access root or dashboard to /login
  if (!isAuthRoute && (isDashboardRoute || isRootRoute)) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users trying to access login/signup to dashboard
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
