"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroImage from "../public/images/osho-hero-image.jpg";

export function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 md:py-20 py-10 overflow-hidden min-h-screen flex items-center"
    >
      {/* Main Content - No parallax, stays in normal flow */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <div
                className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm"
                style={{
                  transform: `translateY(${scrollY * -0.1}px)`,
                }}
              >
                🎵 Premium Musical Instruments
              </div>
              <h1
                className="text-3xl lg:text-6xl font-bold leading-tight"
                style={{
                  transform: `translateY(${scrollY * -0.05}px)`,
                }}
              >
                Welcome to
                <span className="block text-yellow-300 mt-2">
                  Sadhana Music House
                </span>
              </h1>
              <p
                className="md:text-xl text-sm text-purple-100 leading-relaxed max-w-lg"
                style={{
                  transform: `translateY(${scrollY * -0.03}px)`,
                }}
              >
                Discover the world's finest musical instruments and audio
                equipment. From beginner-friendly options to professional-grade
                gear, we have everything you need to create beautiful music.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                transform: `translateY(${scrollY * -0.02}px)`,
              }}
            >
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 text-lg"
              >
                <Link href={"/products"}>Shop Instruments</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg bg-transparent"
              >
                <Link href={"/products"}>Browse Brands</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="flex items-center space-x-8 pt-8 border-t border-white/20"
              style={{
                transform: `translateY(${scrollY * -0.01}px)`,
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-purple-200">Instruments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-purple-200">Top Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5★</div>
                <div className="text-sm text-purple-200">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Instrument Showcase with Parallax */}
          <div className="relative">
            {/* Main Featured Instrument */}
            <div className="relative z-10">
              <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src={heroImage}
                  alt="Featured Guitar"
                  width={400}
                  height={400}
                  className="w-full h-72 object-cover rounded-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Gibson Les Paul Standard
                  </h3>
                  <p className="text-purple-600 font-bold text-xl">₹2,499.99</p>
                </div>
              </div>
            </div>

            {/* Floating Instrument Cards with Different Parallax Speeds */}
            <div className="absolute -top-4 -left-4 z-5">
              <div className="bg-white p-3 rounded-xl shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-24 h-24 bg-purple-100 rounded-lg flex items-center justify-center text-3xl">
                  🎹
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">Keyboards</p>
                  <p className="text-purple-600 font-bold text-sm">From $299</p>
                </div>
              </div>
            </div>

            <div className="max-md:hidden absolute -bottom-8 -right-4 z-5">
              <div className="bg-white p-3 rounded-xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-24 h-24 bg-purple-100 rounded-lg flex items-center justify-center text-3xl">
                  🥁
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">Drum Kits</p>
                  <p className="text-purple-600 font-bold text-sm">From $699</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements with Parallax */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
            <div
              className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300 rounded-full opacity-30 blur-xl"
              style={{
                transform: `translateY(${scrollY * -0.2}px) scale(${1 + scrollY * 0.0003})`,
              }}
            ></div>
          </div>
        </div>

        {/* Trust Indicators with Parallax */}
        {/* <div className="mt-20 pt-12 border-t border-white/20"> */}
        {/*   <div className="text-center mb-8"> */}
        {/*     <p className="text-purple-200 font-medium"> */}
        {/*       Trusted by musicians worldwide */}
        {/*     </p> */}
        {/*   </div> */}
        {/*   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"> */}
        {/*     {[ */}
        {/*       { icon: "🎸", text: "Premium Guitars" }, */}
        {/*       { icon: "🎹", text: "Pro Keyboards" }, */}
        {/*       { icon: "🥁", text: "Quality Drums" }, */}
        {/*       { icon: "🎤", text: "Studio Audio" }, */}
        {/*     ].map((item, index) => ( */}
        {/*       <div key={index} className="text-center text-white"> */}
        {/*         <div className="bg-white/10 rounded-lg p-4 mb-2 backdrop-blur-sm"> */}
        {/*           <span className="text-2xl">{item.icon}</span> */}
        {/*         </div> */}
        {/*         <p className="text-sm font-medium">{item.text}</p> */}
        {/*       </div> */}
        {/*     ))} */}
        {/*   </div> */}
        {/* </div> */}
      </div>

      {/* Floating Musical Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-10 text-2xl"
            style={{
              top: `${15 + i * 12}%`,
              left: `${8 + i * 11}%`,
              transform: `translateY(${scrollY * (-0.1 - i * 0.03)}px) translateX(${scrollY * (0.02 + i * 0.01)}px)`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {i % 2 === 0 ? "♪" : "♫"}
          </div>
        ))}
      </div>
    </section>
  );
}
