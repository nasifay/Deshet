import React from "react";
import Button from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

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

export default function DonatePage() {
  return (
    <section className="flex flex-col w-full items-center gap-[86px] py-12 px-4">
      <Card className="w-full max-w-[1595px] bg-[#4eb778] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <CardContent className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[195px] p-[45px]">
          <div className="flex flex-col items-start gap-[65px]">
            <h2 className="w-full max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-white text-[55px] tracking-[0] leading-[55.5px]">
              <span className="font-black">Your Support </span>
              <span className="font-light">Creates Lasting Change</span>
            </h2>

            <p className="w-full max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-transparent text-2xl tracking-[0] leading-6">
              <span className="font-light text-white leading-[27.8px]">
                Empowering Youth, Uplifting Women, Protecting The Vulnerable,
                And Strengthening Leaders.
                <br />
              </span>
              <span className="font-medium text-[#ff9700] leading-[27.8px]">
                Your Donation Makes It Possible.
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start justify-center">
            <img
              className="w-full max-w-[352px] h-auto object-cover"
              alt="Community support"
              src="https://c.animaapp.com/mgdan87o3WuVjr/img/rectangle-928.svg"
            />
          </div>
        </CardContent>
      </Card>

      {bankAccounts.map((bank, index) => (
        <Card
          key={index}
          className="w-full max-w-[1595px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-0"
          style={
            {
              "--animation-delay": `${(index + 1) * 200}ms`,
            } as React.CSSProperties
          }
        >
          <CardContent className="flex flex-col lg:flex-row items-center justify-between gap-[18px] p-[45px]">
            <div className="flex flex-col w-full items-center gap-[18px]">
              <div className="flex w-full items-center gap-[49px]">
                <img
                  className="h-[59px] lg:h-[89px] w-auto object-contain"
                  alt={`${bank.name} logo`}
                  src={bank.logo}
                />
                <h3 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#020202] text-3xl lg:text-5xl tracking-[0] leading-[48.5px]">
                  {bank.name}
                </h3>
              </div>

              <div className="flex w-full items-center">
                <p className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-light text-[#020202] text-3xl lg:text-5xl tracking-[0] leading-[48.5px]">
                  {bank.accountNumber}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="flex flex-col items-center gap-[17px] px-0 py-2 h-auto hover:bg-transparent"
            >
              <img
                className="w-[50px] h-[50px]"
                alt="Copy icon"
                src={bank.copyIcon}
              />
              <span className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-light text-[#020202] text-2xl tracking-[0] leading-[27.8px]">
                Copy
              </span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}