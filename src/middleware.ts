export { default } from "next-auth/middleware"

export const config = { matcher: ["/service", "/tour", '/tour-detail', '/tour-purchase'] }