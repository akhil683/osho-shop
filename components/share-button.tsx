"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Share2, MessageCircle, Copy, CheckCircle, Facebook, Twitter, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareButtonProps {
  product: {
    id: number
    name: string
    price: number
    image?: string
    description?: string
  }
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function ShareButton({ product, className = "", size = "default", variant = "outline" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const productUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/product/${product.id}`
  const shareText = `Check out this amazing ${product.name} for $${product.price} at Harmony Hub!`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(productUrl)

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: "text-green-600",
      bgColor: "hover:bg-green-50",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: "text-blue-600",
      bgColor: "hover:bg-blue-50",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "text-sky-600",
      bgColor: "hover:bg-sky-50",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(`Check out ${product.name}`)}&body=${encodedText}%20${encodedUrl}`,
      color: "text-gray-600",
      bgColor: "hover:bg-gray-50",
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Product link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const handleShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Native Web Share API (for mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b">Share this product</div>

        {/* Native Share (Mobile) */}
        {typeof navigator !== "undefined" && navigator.share && (
          <>
            <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4 text-purple-600" />
              <span>Share via device</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Social Media Options */}
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => handleShare(option.url)}
            className={`cursor-pointer ${option.bgColor}`}
          >
            <option.icon className={`mr-2 h-4 w-4 ${option.color}`} />
            <span>Share on {option.name}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Copy Link */}
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer hover:bg-gray-50">
          {copied ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          ) : (
            <Copy className="mr-2 h-4 w-4 text-gray-600" />
          )}
          <span>{copied ? "Link copied!" : "Copy link"}</span>
        </DropdownMenuItem>

        {/* Product Preview */}
        <DropdownMenuSeparator />
        <div className="px-3 py-2 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">🎵</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{product.name}</p>
              <p className="text-purple-600 font-bold">${product.price}</p>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
