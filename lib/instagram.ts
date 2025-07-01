interface InstagramMedia {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  thumbnail_url?: string
}

interface InstagramApiResponse {
  data: InstagramMedia[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

interface ProcessedInstagramPost {
  id: string
  username: string
  verified: boolean
  followers: string
  profileImage: string
  postImage: string
  caption: string
  likes: number
  comments: Comment[]
  timestamp: string
  isLiked: boolean
  isBookmarked: boolean
  permalink: string
}

interface Comment {
  id: number
  username: string
  text: string
  timestamp: string
}

export class InstagramService {
  private accessToken: string
  private baseUrl = "https://graph.instagram.com"

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getUserMedia(limit = 10): Promise<InstagramMedia[]> {
    try {
      const fields = "id,media_type,media_url,permalink,caption,timestamp,thumbnail_url"
      const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${this.accessToken}`

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`)
      }

      const data: InstagramApiResponse = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching Instagram media:", error)
      return []
    }
  }

  async getUserProfile() {
    try {
      const fields = "id,username,account_type,media_count"
      const url = `${this.baseUrl}/me?fields=${fields}&access_token=${this.accessToken}`

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching Instagram profile:", error)
      return null
    }
  }

  processMediaForDisplay(media: InstagramMedia[], profile: any): ProcessedInstagramPost[] {
    return media
      .filter((item) => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM")
      .map((item) => ({
        id: item.id,
        username: profile?.username || "villagemarket",
        verified: true,
        followers: `${profile?.media_count || 0} posts`,
        profileImage: "/placeholder.svg?height=40&width=40",
        postImage: item.media_url,
        caption: item.caption || "",
        likes: Math.floor(Math.random() * 200) + 50, // Random likes since API doesn't provide this
        comments: [], // Empty initially, will be populated by user interactions
        timestamp: this.formatTimestamp(item.timestamp),
        isLiked: false,
        isBookmarked: false,
        permalink: item.permalink,
      }))
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "now"
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`
    return `${Math.floor(diffInHours / 168)}w`
  }

  // Method to refresh access token (Instagram tokens expire)
  async refreshAccessToken(): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${this.accessToken}`

      const response = await fetch(url, { method: "GET" })

      if (!response.ok) {
        throw new Error(`Token refresh error: ${response.status}`)
      }

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error("Error refreshing access token:", error)
      return null
    }
  }
}

// Fallback data in case API fails
export const fallbackInstagramPosts: ProcessedInstagramPost[] = [
  {
    id: "fallback-1",
    username: "villagemarket",
    verified: true,
    followers: "2.5K followers",
    profileImage: "/placeholder.svg?height=40&width=40",
    postImage: "/placeholder.svg?height=400&width=400",
    caption:
      "🍎 FRESH ORGANIC APPLES NOW AVAILABLE! Just arrived from our local partner farms. Perfect for snacking, baking, or adding to your morning smoothie. Get yours today! #OrganicApples #LocalFarm #FreshProduce",
    likes: 89,
    comments: [
      { id: 1, username: "sarah_j", text: "These look amazing! Do you deliver?", timestamp: "2h" },
      { id: 2, username: "mike_local", text: "Best apples in town! 🍎", timestamp: "4h" },
    ],
    timestamp: "2h",
    isLiked: false,
    isBookmarked: false,
    permalink: "https://instagram.com/p/example1",
  },
  {
    id: "fallback-2",
    username: "villagemarket",
    verified: true,
    followers: "2.5K followers",
    profileImage: "/placeholder.svg?height=40&width=40",
    postImage: "/placeholder.svg?height=400&width=400",
    caption:
      "🍞 ARTISAN SOURDOUGH BREAD - Baked fresh every morning using traditional methods. The perfect combination of crusty exterior and soft, flavorful interior. Limited quantities available daily! #ArtisanBread #FreshBaked #Sourdough",
    likes: 124,
    comments: [
      { id: 1, username: "bread_lover", text: "Can I reserve a loaf for tomorrow?", timestamp: "1d" },
      { id: 2, username: "local_foodie", text: "This bread is incredible! 🥖", timestamp: "1d" },
    ],
    timestamp: "1d",
    isLiked: false,
    isBookmarked: false,
    permalink: "https://instagram.com/p/example2",
  },
]
