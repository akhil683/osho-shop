"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Instagram,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface InstagramPost {
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

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>("")
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchInstagramPosts()
  }, [])

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/instagram", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error("Failed to fetch Instagram posts")
      }

      const result = await response.json()
      setPosts(result.data)
      setDataSource(result.source)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Instagram posts")
      console.error("Error fetching Instagram posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handleComment = (postId: string) => {
    const commentText = newComments[postId]?.trim()
    if (!commentText) return

    const newComment: Comment = {
      id: Date.now(),
      username: "you",
      text: commentText,
      timestamp: "now",
    }

    setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post)))

    setNewComments({ ...newComments, [postId]: "" })
  }

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments({ ...newComments, [postId]: value })
  }

  const truncateCaption = (caption: string, maxLength = 150) => {
    if (caption.length <= maxLength) return caption
    return caption.substring(0, maxLength) + "..."
  }

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Instagram className="h-8 w-8 text-red-600" />
              <h3 className="text-2xl font-bold">Follow Us on Instagram</h3>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-red-600" />
            <span className="ml-2 text-lg">Loading Instagram posts...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Instagram className="h-8 w-8 text-red-600" />
            <h3 className="text-2xl font-bold">Follow Us on Instagram</h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest products and interact with our posts!
          </p>

          {/* Data source indicator */}
          {dataSource && (
            <div className="mt-4">
              {dataSource === "instagram-api" ? (
                <Alert className="max-w-md mx-auto border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">Live posts from Instagram</AlertDescription>
                </Alert>
              ) : (
                <Alert className="max-w-md mx-auto border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700">
                    Showing sample posts (Instagram API not configured)
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8">
            <Alert className="max-w-2xl mx-auto border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
                <Button variant="outline" size="sm" onClick={fetchInstagramPosts} className="ml-2 bg-transparent">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border border-gray-200">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Image
                    src={post.profileImage || "/placeholder.svg"}
                    alt={post.username}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-sm">{post.username}</span>
                      {post.verified && <CheckCircle className="h-4 w-4 text-blue-500 fill-current" />}
                    </div>
                    <span className="text-xs text-gray-500">{post.followers}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Link href={`https://instagram.com/${post.username}`} target="_blank">
                      View profile
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative">
                <Image
                  src={post.postImage || "/placeholder.svg"}
                  alt="Instagram post"
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-6 w-6 ${post.isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                      <MessageCircle className="h-6 w-6 text-gray-700" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                      <Share className="h-6 w-6 text-gray-700" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent"
                    onClick={() => handleBookmark(post.id)}
                  >
                    <Bookmark
                      className={`h-6 w-6 ${post.isBookmarked ? "fill-gray-700 text-gray-700" : "text-gray-700"}`}
                    />
                  </Button>
                </div>

                {/* Likes Count */}
                <div className="mb-2">
                  <span className="font-semibold text-sm">{post.likes} likes</span>
                </div>

                {/* Caption */}
                <div className="mb-3">
                  <span className="text-sm">
                    <span className="font-semibold mr-2">{post.username}</span>
                    {truncateCaption(post.caption)}
                  </span>
                </div>

                {/* View more on Instagram */}
                <div className="mb-3">
                  <Link href={post.permalink} target="_blank" className="text-sm text-blue-500 hover:text-blue-600">
                    View more on Instagram
                  </Link>
                </div>

                {/* Comments */}
                <div className="space-y-2 mb-3">
                  {post.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="text-sm">
                      <span className="font-semibold mr-2">{comment.username}</span>
                      <span>{comment.text}</span>
                      <span className="text-gray-500 ml-2 text-xs">{comment.timestamp}</span>
                    </div>
                  ))}
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-500 mb-3 uppercase">{post.timestamp}</div>

                {/* Add Comment */}
                <div className="flex items-center space-x-2 pt-3 border-t">
                  <Input
                    placeholder="Add a comment..."
                    value={newComments[post.id] || ""}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    className="flex-1 border-none p-0 focus-visible:ring-0 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleComment(post.id)
                      }
                    }}
                  />
                  {newComments[post.id]?.trim() && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleComment(post.id)}
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto font-semibold"
                    >
                      Post
                    </Button>
                  )}
                  <Instagram className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-4">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="https://instagram.com/villagemarket" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                Follow @villagemarket for more
              </Link>
            </Button>
            <Button variant="outline" onClick={fetchInstagramPosts}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Posts
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
