"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

interface ContactSectionProps {
  whatsappNumber?: string;
  businessName?: string;
}

export function ContactSection({
  whatsappNumber = "918219649129",
  businessName = "Sadhana Music House",
}: ContactSectionProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi ${businessName}! I'm interested in your musical instruments. Could you please help me with more information?`,
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our instruments? Need expert advice? We're
              here to help you find the perfect musical companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* WhatsApp Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick response guaranteed</p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Chat with Us
              </Button>
            </div>

            {/* Phone Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak to our experts</p>
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                onClick={() => window.open(`tel:+${whatsappNumber}`, "_self")}
              >
                Call Now
              </Button>
            </div>

            {/* Email Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Detailed inquiries</p>
              <Button
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                onClick={() =>
                  window.open("mailto:workosho@gmail.com", "_self")
                }
              >
                Send Email
              </Button>
            </div>

            {/* Visit Store */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Store</h3>
              <p className="text-gray-600 mb-4">Try before you buy</p>
              <Button
                variant="outline"
                className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
