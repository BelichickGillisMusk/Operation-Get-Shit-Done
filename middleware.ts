import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // bryanoneillgillis.com → serve personal dashboard
  if (hostname.includes('bryanoneillgillis.com') && pathname === '/') {
    return NextResponse.rewrite(new URL('/personal', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
