import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Instagram, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function InstagramSetupPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Instagram Integration Setup</h1>
          <p className="text-muted-foreground">
            Follow these steps to connect your Instagram account and display real posts on your website.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                <span>Create Facebook App</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Instagram Basic Display API requires a Facebook App.</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Go to{" "}
                  <Link
                    href="https://developers.facebook.com"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Facebook Developers
                  </Link>
                </li>
                <li>Click "Create App" and select "Consumer" type</li>
                <li>Add "Instagram Basic Display" product to your app</li>
                <li>Configure Instagram Basic Display settings</li>
              </ol>
              <Button asChild variant="outline">
                <Link href="https://developers.facebook.com" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Facebook Developers
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                <span>Configure Instagram Basic Display</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Set up the Instagram Basic Display product in your Facebook app.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Required Settings:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <strong>Valid OAuth Redirect URIs:</strong> https://yourdomain.com/auth/instagram/callback
                  </li>
                  <li>
                    <strong>Deauthorize Callback URL:</strong> https://yourdomain.com/auth/instagram/deauthorize
                  </li>
                  <li>
                    <strong>Data Deletion Request URL:</strong> https://yourdomain.com/auth/instagram/delete
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                <span>Get Access Token</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Generate a long-lived access token for your Instagram account.</p>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You'll need to go through the OAuth flow to get an access token. This involves:
                  <br />
                  1. Getting authorization from Instagram
                  <br />
                  2. Exchanging the code for a short-lived token
                  <br />
                  3. Converting it to a long-lived token (60 days)
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Authorization URL Format:</h4>
                <code className="text-xs bg-white p-2 rounded border block">
                  https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                <span>Add Environment Variables</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Add your Instagram access token to your environment variables.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Add to your .env.local file:</h4>
                <code className="text-sm bg-white p-2 rounded border block">
                  INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
                </code>
              </div>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Once you add the access token, your website will automatically fetch real Instagram posts!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  5
                </span>
                <span>Token Refresh (Important)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Instagram access tokens expire every 60 days and need to be refreshed.</p>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Set up a cron job or scheduled task to refresh your token before it expires. The API includes a
                  refresh method you can use.
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Refresh URL:</h4>
                <code className="text-xs bg-white p-2 rounded border block">
                  GET
                  https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_TOKEN
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Instagram className="h-5 w-5 text-red-600" />
                <span>Current Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Instagram API is not currently configured. The website is showing sample posts. Complete the setup
                  above to display real Instagram posts.
                </AlertDescription>
              </Alert>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/">View Website</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
