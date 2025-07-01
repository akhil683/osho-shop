"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Copy, CheckCircle, Smartphone } from "lucide-react";

export function PaymentSection() {
  const [copied, setCopied] = useState(false);
  const upiId = "oshosaini@paytm";

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UPI ID:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-red-600" />
          <span>Quick Payment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Scan QR code or use UPI ID for instant payments
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
              <Image
                src="https://1.bp.blogspot.com/-dHN4KiD3dsU/XRxU5JRV7DI/AAAAAAAAAz4/u1ynpCMIuKwZMA642dHEoXFVKuHQbJvwgCEwYBhgL/s1600/qr-code.png"
                alt="UPI QR Code"
                width={200}
                height={200}
                className="w-48 h-48"
              />
            </div>
          </div>

          {/* UPI ID */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <QrCode className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">UPI ID</span>
            </div>

            <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                {upiId}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyUpiId}
                className="h-8 w-8 p-0 bg-transparent"
              >
                {copied ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>

            {copied && (
              <p className="text-xs text-green-600 font-medium">
                UPI ID copied to clipboard!
              </p>
            )}
          </div>

          {/* Supported Apps */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-3">
              Supported Payment Apps:
            </p>
            <div className="flex justify-center space-x-2 flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                Google Pay
              </Badge>
              <Badge variant="outline" className="text-xs">
                PhonePe
              </Badge>
              <Badge variant="outline" className="text-xs">
                Paytm
              </Badge>
              <Badge variant="outline" className="text-xs">
                BHIM
              </Badge>
              <Badge variant="outline" className="text-xs">
                Amazon Pay
              </Badge>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> You can also pay directly when placing an
              order or during pickup/delivery
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
