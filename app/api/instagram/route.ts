import { NextResponse } from "next/server"
import { InstagramService, fallbackInstagramPosts } from "@/lib/instagram"

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      console.warn("Instagram access token not found, using fallback data")
      return NextResponse.json({
        success: true,
        data: fallbackInstagramPosts,
        source: "fallback",
      })
    }

    const instagramService = new InstagramService(accessToken)

    // Fetch user profile and media
    const [profile, media] = await Promise.all([
      instagramService.getUserProfile(),
      instagramService.getUserMedia(6), // Fetch 6 recent posts
    ])

    if (!media || media.length === 0) {
      console.warn("No Instagram media found, using fallback data")
      return NextResponse.json({
        success: true,
        data: fallbackInstagramPosts,
        source: "fallback",
      })
    }

    // Process media for display
    const processedPosts = instagramService.processMediaForDisplay(media, profile)

    return NextResponse.json({
      success: true,
      data: processedPosts,
      source: "instagram-api",
      profile: profile,
    })
  } catch (error) {
    console.error("Instagram API error:", error)

    // Return fallback data on error
    return NextResponse.json({
      success: true,
      data: fallbackInstagramPosts,
      source: "fallback-error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
