import { ConvexHttpClient } from "convex/browser"

export const getConvexClient = () => {
    //return http convex client
    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
}