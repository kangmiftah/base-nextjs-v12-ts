import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import appconfig from "./app.config";
import {getLogger} from "./_modules/helpers/logger";

export function middleware(req: NextRequest): NextResponse | Response {
   const { pathname } = req.nextUrl;
   const logger = getLogger("app");
   const hostname: string | null = req?.headers?.get("host");
   const subdomainadmin: string =
   appconfig.SUB_DOMAIN_ADMIN.toLocaleLowerCase();
   if (pathname.startsWith("/api"))  console.log(`${req.method} : ${req.nextUrl}`, {body : req.body} )
   if (hostname) {
      const subdomain: Array<string> = hostname?.split(".");
      const url: NextURL = req.nextUrl.clone();
      let pathname_ = url.pathname;
      if (subdomain[0].toLocaleLowerCase() === subdomainadmin) {
         if (
            pathname.startsWith("/static") || // exclude static files
            pathname.startsWith("/files") || // exclude static files _next
            pathname.startsWith("/_next") || // exclude static files _next
            pathname.includes(".") // exclude all files in the public folder
         ) {
            return NextResponse.next();
         }
         if (pathname_ === "/") {
            req.nextUrl.pathname = "/dashboard";
            return NextResponse.redirect(req.nextUrl);
         }
         
         req.nextUrl.pathname = `/admin${pathname_}`;
         if (pathname_.startsWith("/api")) {
            pathname_ = pathname_.replace("/api", "");
            req.nextUrl.pathname = `/api/admin${pathname_}`;
         }
         return NextResponse.rewrite(req.nextUrl);
      }
   }
   if (pathname.startsWith("/admin")) {
      req.nextUrl.pathname = `not-found`;
      return NextResponse.rewrite(req.nextUrl);
   }

   return NextResponse.next();
}
