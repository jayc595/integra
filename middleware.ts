import { authMiddleware } from "@clerk/nextjs/server";
export default authMiddleware({
  debug: true
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};