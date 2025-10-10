"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, Mail, Heart, Users } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  const quickLinks = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      description: "Return to our homepage",
    },
    {
      href: "/programs",
      label: "Programs",
      icon: Users,
      description: "Explore our initiatives",
    },
    {
      href: "/donate",
      label: "Donate",
      icon: Heart,
      description: "Support our cause",
    },
    {
      href: "/contact-us",
      label: "Contact Us",
      icon: Mail,
      description: "Get in touch with us",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-green-50/30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center space-y-8 py-12 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Tamra for Social Development"
            width={100}
            height={100}
            className="object-contain opacity-80"
          />
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-[#128341] leading-none">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Oops! The page you&apos;re looking for seems to have wandered off.
              Don&apos;t worry, even the best explorers sometimes take a wrong
              turn.
            </p>
          </div>
        </div>

        {/* Decorative Pattern */}
        <div className="flex justify-center items-center gap-2 py-6">
          <div className="w-2 h-2 rounded-full bg-[#ff7a00] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#128341] animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-[#ff7a00] animate-pulse delay-150"></div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ff7a00]/30 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gradient-to-br from-[#ff7a00]/10 to-[#128341]/10 rounded-lg group-hover:from-[#ff7a00]/20 group-hover:to-[#128341]/20 transition-colors">
                  <link.icon className="w-6 h-6 text-[#128341] group-hover:text-[#ff7a00] transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#ff7a00] transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#ff7a00] to-[#ff9700] text-white rounded-lg hover:from-[#ff9700] hover:to-[#ff7a00] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 text-sm text-gray-500">
          <p>
            Need help? Feel free to{" "}
            <Link
              href="/contact-us"
              className="text-[#ff7a00] hover:text-[#128341] font-medium underline underline-offset-2 transition-colors"
            >
              contact our team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
