import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/create-account": true,
  "/log-in": true
};

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const isPublic = publicUrls[pathname];
  if (!session.id && !isPublic) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  if (session.id && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};