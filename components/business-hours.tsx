import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, Phone, Sunrise, Sunset } from "lucide-react"

const businessHours = [
  { day: "Monday", hours: "8:00 AM - 6:00 PM", isToday: false, isOpen: true },
  { day: "Tuesday", hours: "8:00 AM - 6:00 PM", isToday: false, isOpen: true },
  { day: "Wednesday", hours: "8:00 AM - 6:00 PM", isToday: true, isOpen: true },
  { day: "Thursday", hours: "8:00 AM - 6:00 PM", isToday: false, isOpen: true },
  { day: "Friday", hours: "8:00 AM - 7:00 PM", isToday: false, isOpen: true },
  { day: "Saturday", hours: "9:00 AM - 5:00 PM", isToday: false, isOpen: true },
]

export function BusinessHours() {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const isOpen = true // You can implement actual logic to check if shop is open
  const todaySchedule = businessHours.find((schedule) => schedule.isToday)

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-red-50 border-red-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Clock className="h-6 w-6" />
            </div>
            <span>Business Hours</span>
          </CardTitle>
          <div className="text-right">
            <div className="text-sm opacity-90">{currentDate}</div>
            <div className="text-lg font-semibold">{currentTime}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        {/* Current Status */}
        <div className="relative">
          <div
            className={`p-6 rounded-2xl border-2 ${
              isOpen
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`relative p-3 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}>
                  {isOpen ? <Sunrise className="h-6 w-6 text-white" /> : <Sunset className="h-6 w-6 text-white" />}
                  <div
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse ${
                      isOpen ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isOpen ? "text-green-800" : "text-red-800"}`}>
                    {isOpen ? "We're Open!" : "Currently Closed"}
                  </h3>
                  <p className={`text-sm ${isOpen ? "text-green-600" : "text-red-600"}`}>
                    {todaySchedule ? `Today: ${todaySchedule.hours}` : "Check hours below"}
                  </p>
                </div>
              </div>
              <Badge
                variant={isOpen ? "default" : "secondary"}
                className={`px-4 py-2 text-sm font-semibold ${
                  isOpen ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isOpen ? "OPEN" : "CLOSED"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-red-600" />
            <span>Weekly Schedule</span>
          </h4>

          <div className="grid gap-3">
            {businessHours.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex justify-between items-center p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
                  schedule.isToday
                    ? "bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-200 shadow-md"
                    : "bg-white border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {schedule.isToday && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <Calendar className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                  <span className={`font-semibold text-lg ${schedule.isToday ? "text-red-800" : "text-gray-700"}`}>
                    {schedule.day}
                  </span>
                  {schedule.isToday && (
                    <Badge variant="outline" className="text-xs bg-red-100 text-red-700 border-red-300">
                      TODAY
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <span className={`font-medium text-lg ${schedule.isToday ? "text-red-700" : "text-gray-600"}`}>
                    {schedule.hours}
                  </span>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <div className={`w-2 h-2 rounded-full ${schedule.isOpen ? "bg-green-400" : "bg-gray-300"}`}></div>
                    <span className="text-xs text-gray-500">{schedule.isOpen ? "Open" : "Closed"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sunday Notice */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-300 rounded-lg">
              <Sunset className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Sunday</h4>
              <p className="text-gray-600">Closed - Family Day</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Call Ahead</p>
                <p className="text-xs text-blue-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Visit Us</p>
                <p className="text-xs text-purple-600">123 Main Street</p>
              </div>
            </div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 font-medium">⚠️ Holiday Hours May Vary</p>
            <p className="text-xs text-yellow-600 mt-1">Please call ahead during holidays to confirm our hours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
