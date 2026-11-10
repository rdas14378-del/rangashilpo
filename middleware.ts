import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Allow access to login page and auth callbacks
    if (path.startsWith('/login') || path.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    // Allow static assets
    if (path.startsWith('/_next') || path.startsWith('/images') || path.includes('.')) {
      return NextResponse.next()
    }

    // All other routes require authentication
    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Allow login page and auth routes without token
        if (path.startsWith('/login') || path.startsWith('/api/auth')) {
          return true
        }

        // Allow static assets
        if (path.startsWith('/_next') || path.startsWith('/images') || path.includes('.')) {
          return true
        }

        // Require token for all other routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$).*)',
  ],
}