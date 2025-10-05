import React from "react";

const topLinks = [
  { text: "TERMS CONDITIONS", hasIcon: true },
  { text: "PRIVACY POLICY", hasIcon: false },
];

const keyFunders = ["NCA", "YNSD", "CRVPF", "PEPFAR", "Sonke Gender Justice"];

const networksAndMemberships = [
  "CCRDA",
  "CORHA",
  "PHE Ethiopia",
  "Men Engage Ethiopia",
  "Ubuntu Youth Peace Alliance",
  "Ethiopian Civil Societies Council",
];

const navigationLinks = ["Home", "About", "Contact", "News", "Donate"];

export default function Footer() {
  return (
    <footer className="w-full mt-[139px] px-4">
      <div className="max-w-[1550px] mx-auto flex flex-col gap-2.5">
        <div className="w-full border-t border-[#4eb778] pt-[50px] pb-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
            {topLinks.map((link, index) => (
              <React.Fragment key={index}>
                <button className="[font-family:'Roboto',Helvetica] font-medium text-[#808080] text-[17.8px] tracking-[0] leading-[25px] whitespace-nowrap hover:text-[#4eb778] transition-colors">
                  {link.text}
                </button>
                {link.hasIcon && (
                  <img
                    className="w-[18px] h-[18px] self-center"
                    alt="Separator"
                    src="https://c.animaapp.com/mgdrgf40cGS3Zf/img/image-1.png"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 items-start">
            <img
              className="w-[68px] h-[72px] object-cover"
              alt="Organization Logo"
              src="https://c.animaapp.com/mgdrgf40cGS3Zf/img/asset-1-4.png"
            />

            <div className="flex flex-col gap-[22px] flex-1 min-w-[300px]">
              <p className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[12.1px] tracking-[0] leading-[18.8px]">
                ©Tamra for Social Development Organization.com
              </p>
              <div className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[12.1px] tracking-[0] leading-[18.8px]">
                A legally registered local NGO.
                <br />
                Location: Friendship Business Center, 7th Floor, Bole, Addis
                Ababa, Ethiopia
                <br />
                Customer Feedback: TSD@ngo.com
              </div>
            </div>

            <div className="flex flex-col gap-1 min-w-[166px]">
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#128341] text-[12.4px] tracking-[0] leading-[18.8px]">
                Key Funders
              </h3>
              {keyFunders.map((funder, index) => (
                <p
                  key={index}
                  className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[12.4px] tracking-[0] leading-[18.8px]"
                >
                  {funder}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-1 min-w-[200px]">
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#128341] text-[12.4px] tracking-[0] leading-[18.8px]">
                Networks & Memberships
              </h3>
              {networksAndMemberships.map((network, index) => (
                <p
                  key={index}
                  className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[12.4px] tracking-[0] leading-[18.8px]"
                >
                  {network}
                </p>
              ))}
            </div>

            <img
              className="w-[283px] h-[43px] ml-auto"
              alt="Social Media Links"
              src="https://c.animaapp.com/mgdrgf40cGS3Zf/img/frame-1000002216.svg"
            />
          </div>
        </div>

        <nav className="w-full max-w-[351px]">
          <div className="flex items-center gap-8 p-2.5">
            {navigationLinks.map((link, index) => (
              <button
                key={index}
                className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[12.6px] tracking-[0] leading-[18.8px] whitespace-nowrap hover:text-[#4eb778] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}