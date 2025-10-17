"use client";

import React, { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({
  phoneNumber: propPhoneNumber,
}: WhatsAppButtonProps) {
  const [phoneNumber, setPhoneNumber] = useState(propPhoneNumber || "");

  useEffect(() => {
    // If no phone number prop is provided, fetch from API
    if (!propPhoneNumber) {
      fetchWhatsAppNumber();
    }
  }, [propPhoneNumber]);

  const fetchWhatsAppNumber = async () => {
    try {
      const response = await fetch("/api/public/footer");
      const result = await response.json();

      if (result.success && result.data.whatsappNumber) {
        setPhoneNumber(result.data.whatsappNumber);
      }
    } catch (error) {
      console.error("Error fetching WhatsApp number:", error);
    }
  };

  // Don't render if no phone number is available
  if (!phoneNumber) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <aside className="fixed bottom-8 right-8 size-12  md:size-[80px] z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full h-full cursor-pointer hover:scale-110 transition-transform"
      >
        <img
          className="w-[70px] h-auto object-cover"
          alt="Whatsapp"
          src="https://c.animaapp.com/mg8i4bgw8CQdb4/img/whatsapp-1.png"
        />
      </a>
    </aside>
  );
}
