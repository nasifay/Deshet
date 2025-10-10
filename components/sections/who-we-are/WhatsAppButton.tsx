import React from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber = "" }: WhatsAppButtonProps) {
  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}`
    : "https://wa.me/";

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
