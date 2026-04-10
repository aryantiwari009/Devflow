// middleware.ts
import { auth } from "@/auth"

// We use 'export default' here. 
// Next.js recognizes 'default' as the middleware function.
export default auth((req) => {
  // Logic like redirects goes here
  // req.auth contains your session
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}