import React from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber = "" }: WhatsAppButtonProps) {
  return (
    <aside className="fixed top-[1212px] right-[30px] w-[87px] h-[87px] z-40">
      <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
        <img
          className="absolute h-[80.25%] top-[9.88%] left-[calc(50.00%_-_35px)] w-[70px] object-cover hover:scale-110 transition-transform"
          alt="Whatsapp"
          src="https://c.animaapp.com/mgclt9blEcJSeI/img/whatsapp-1.png"
        />
      </a>
    </aside>
  );
}
