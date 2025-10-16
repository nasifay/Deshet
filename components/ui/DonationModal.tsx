"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Card, CardContent } from "./Card";

const bankAccounts = [
  {
    name: "Commercial Bank Of Ethiopia",
    accountNumber: "10001112131415",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0.png",
    copyIcon: "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174.png",
  },
  {
    name: "Telebirr",
    accountNumber: "123456789",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-1.png",
  },
  {
    name: "Bank Of Abyssinia",
    accountNumber: "50001112131415",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0-1.png",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-2.png",
  },
  {
    name: "Awash Bank",
    accountNumber: "30001112131415",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-3.png",
  },
];

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const copyToClipboard = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  if (!isOpen) return null;

  const scrollbarStyles = `
    .modal-scroll::-webkit-scrollbar {
      width: 8px;
    }
    .modal-scroll::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 20px;
    }
    .modal-scroll::-webkit-scrollbar-thumb {
      background: #4eb778;
      border-radius: 20px;
    }
    .modal-scroll::-webkit-scrollbar-thumb:hover {
      background: #128341;
    }
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <div className="relative w-[95vw] h-[95vh] overflow-y-auto bg-white shadow-2xl rounded-t-[46px] rounded-b-none modal-scroll">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-4 md:p-8">
          {/* Header */}
          <Card className="w-full bg-[#4eb778] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 mb-8">
            <CardContent className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-[195px] p-4 md:p-[45px]">
              <div className="flex flex-col items-start gap-[65px]">
                <h2 className="w-full max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-white text-2xl md:text-[55px] tracking-[0] leading-tight md:leading-[55.5px]">
                  <span className="font-black">Your Support </span>
                  <span className="font-light">Creates Lasting Change</span>
                </h2>

                <p className="w-full max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-transparent text-lg md:text-2xl tracking-[0] leading-5 md:leading-6">
                  <span className="font-light text-white leading-5 md:leading-[27.8px]">
                    Empowering Youth, Uplifting Women, Protecting The
                    Vulnerable, And Strengthening Leaders.
                    <br />
                  </span>
                  <span className="font-medium text-[#ff9700] leading-5 md:leading-[27.8px]">
                    Your Donation Makes It Possible.
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start justify-center">
                <img
                  className="w-full max-w-[200px] md:max-w-[352px] h-auto object-cover"
                  alt="Community support"
                  src="https://c.animaapp.com/mgdan87o3WuVjr/img/rectangle-928.svg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank Accounts */}
          <div className="space-y-6">
            {bankAccounts.map((bank, index) => (
              <Card
                key={index}
                className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0"
              >
                <CardContent className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-[18px] p-4 md:p-[45px]">
                  <div className="flex flex-col w-full items-center gap-[18px]">
                    <div className="flex w-full items-center gap-[49px]">
                      <img
                        className="h-[59px] lg:h-[89px] w-auto object-contain"
                        alt={`${bank.name} logo`}
                        src={bank.logo}
                      />
                      <h3 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#020202] text-xl md:text-3xl lg:text-5xl tracking-[0] leading-tight md:leading-[48.5px]">
                        {bank.name}
                      </h3>
                    </div>

                    <div className="flex w-full items-center">
                      <p className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-light text-[#020202] text-xl md:text-3xl lg:text-5xl tracking-[0] leading-tight md:leading-[48.5px]">
                        {bank.accountNumber}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-[17px] px-0 py-2 h-auto hover:bg-transparent"
                    onClick={() => copyToClipboard(bank.accountNumber)}
                  >
                    <img
                      className="w-[50px] h-[50px]"
                      alt="Copy icon"
                      src={bank.copyIcon}
                    />
                    <span className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-light text-[#020202] text-lg md:text-2xl tracking-[0] leading-tight md:leading-[27.8px]">
                      {copiedAccount === bank.accountNumber
                        ? "Copied!"
                        : "Copy"}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Button
              onClick={onClose}
              className="bg-[#4eb778] hover:bg-[#45a56b] text-white px-8 py-3 rounded-[46px]"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
