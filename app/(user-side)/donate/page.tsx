import React from "react";
import Image from "next/image";

const bankAccounts = [
  {
    name: "Commercial Bank Of Ethiopia",
    accountNumber: "1000102030405",
    swiftCode: "CBETETAA",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0.png",
    copyIcon: "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174.png",
  },
  {
    name: "Tele Birr",
    number: "+251 91111111",
    id: "1122334455",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-1.png",
  },
  {
    name: "Bank Of Abyssinia",
    accountNumber: "1000102030405",
    swiftCode: "ABYSETAAXXX",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/image0-1.png",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-2.png",
  },
  {
    name: "Awash Bank",
    accountNumber: "1000102030405",
    swiftCode: "AWINETAAXXX",
    logo: "https://c.animaapp.com/mgdan87o3WuVjr/img/commercial-bank-of-ethiopia-logo-1.svg",
    copyIcon:
      "https://c.animaapp.com/mgdan87o3WuVjr/img/group-1000002174-3.png",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* DONATE Header */}
      <div className="flex justify-center pt-10 pb-6 lg:pt-16 lg:pb-8">
        {/* Adjusted padding and font size for mobile/tablet */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2E8B57] tracking-wide">
          DONATE
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center gap-10 sm:gap-12 lg:gap-16 px-4 pb-16">
        {/* Green Hero Banner */}
        <div className="w-full max-w-6xl bg-primary-green/90 rounded-[20px] shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-50" />

          {/* Adjusted to stack content vertically on mobile/tablet (flex-col) and reduce padding */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              {/* Reduced font size for mobile/tablet */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                Your Support Creates Lasting Change
              </h2>
              {/* Reduced font size and adjusted line height for mobile/tablet */}
              <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed">
                Empowering Youth, Uplifting Women, Protecting The Vulnerable,
                And Strengthening Leaders.{" "}
                <span className="text-[#D4EDDA] font-medium">
                  Your Donation Makes It Possible.
                </span>
              </p>
            </div>

            {/* Right Image */}
            {/* Added responsive classes to make the image smaller and responsive on mobile/tablet */}
            <div className="flex-shrink-0 w-full sm:w-auto flex justify-center">
              <Image
                className="w-full h-auto max-w-[200px] max-h-[200px] sm:max-w-[250px] sm:max-h-[250px] lg:w-80 lg:h-80 object-cover rounded-lg"
                alt="Community support"
                src="https://c.animaapp.com/mgdan87o3WuVjr/img/rectangle-928.svg"
                width={320}
                height={320}
              />
            </div>
          </div>
        </div>

        {/* BANK OPTIONS Header */}
        <div className="flex justify-center mt-4">
          {/* Adjusted font size for mobile/tablet */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2E8B57] tracking-wide">
            BANK OPTIONS
          </h2>
        </div>

        {/* Bank Options Grid */}
        <div className="w-full max-w-6xl bg-[#F8F8F8] rounded-[20px] shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-5" />

          {/* Reduced padding for mobile/tablet */}
          <div className="relative p-6 sm:p-8 lg:p-12">
            {/* Default grid-cols-1 for mobile, md:grid-cols-2 for tablet/desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {bankAccounts.map((bank, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Image
                      // Reduced logo size on mobile
                      className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
                      alt={`${bank.name} logo`}
                      src={bank.logo}
                      width={64}
                      height={64}
                    />

                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[#333333]">
                        {bank.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#666666]">
                        Tamra ForSocial Development Organization
                      </p>
                      {bank.accountNumber && (
                        <p className="text-xs sm:text-sm text-[#666666]">
                          Account Number: {bank.accountNumber}
                        </p>
                      )}
                      {bank.number && (
                        <p className="text-xs sm:text-sm text-[#666666]">
                          Number: {bank.number}
                        </p>
                      )}
                      {bank.id && (
                        <p className="text-xs sm:text-sm text-[#666666]">
                          ID: {bank.id}
                        </p>
                      )}
                      {bank.swiftCode && (
                        <p className="text-xs sm:text-sm text-[#666666]">
                          Swift Code: {bank.swiftCode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reduced space-y for mobile/tablet */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
