import { MailIcon, PhoneIcon } from "lucide-react";
import React from "react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

export function MapSection() {
  return (
    <section className="flex flex-col w-full items-center gap-[116px] px-4">
      <Card className="w-full max-w-[1595px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <CardContent className="flex items-center justify-center px-0 py-[88px]">
          <p className="max-w-[905px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
            Get in touch and be part of our journey of transformation.
          </p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-[1595px] shadow-[0px_4px_26.5px_#0000000d] rounded-[46px] overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <CardContent className="relative p-0">
          <div className="absolute inset-0 bg-white rounded-[46px] bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-[50%_50%]" />

          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-[165px] px-4 lg:px-[166px] py-[63px]">
            <div className="flex flex-col items-start gap-[74px]">
              <div className="flex flex-col items-start gap-5">
                <h2 className="max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] text-[55px] tracking-[0] leading-[55.5px]">
                  <span className="font-black text-[#020202]">
                    Let's Explore{" "}
                  </span>
                  <span className="font-light text-[#020202]">
                    How We Can Work Together For A Better Future.
                  </span>
                </h2>

                <p className="max-w-[374px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-light text-[#020202] text-2xl tracking-[0] leading-[24.2px]">
                  Together, we can turn challenges into opportunities,
                  let's talk.
                </p>
              </div>

              <div className="flex flex-col items-start gap-6">
                <div className="flex items-end gap-[15px]">
                  <PhoneIcon className="w-[35px] h-[33px] text-[#020202]" />
                  <span className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#020202] text-2xl tracking-[0] leading-[24.2px] whitespace-nowrap">
                    +251 911 121314
                  </span>
                </div>

                <div className="flex items-end gap-[15px]">
                  <MailIcon className="w-[35px] h-7 text-[#020202]" />
                  <span className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#020202] text-2xl tracking-[0] leading-[24.2px] whitespace-nowrap">
                    hello@tsd.com
                  </span>
                </div>
              </div>
            </div>

            <Card className="w-full max-w-[561px] bg-[#d9d9d9] rounded-[48px] border-0">
              <CardContent className="flex flex-col items-center gap-2.5 px-8 py-14">
                <form className="flex flex-col w-full max-w-[487px] items-start gap-5">
                  <div className="flex flex-col items-start gap-[11px] w-full">
                    <label
                      htmlFor="name"
                      className="[font-family:'DM_Sans',Helvetica] font-normal text-[#232f16] text-2xl tracking-[0] leading-[31.2px]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="enter here"
                      className="h-[45px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-[#8c8c8c] text-lg tracking-[0] leading-[26.4px] px-3"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-[11px] w-full">
                    <label
                      htmlFor="email"
                      className="[font-family:'DM_Sans',Helvetica] font-normal text-[#232f16] text-2xl tracking-[0] leading-[31.2px]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="enter here"
                      className="h-[45px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-[#8c8c8c] text-lg tracking-[0] leading-[26.4px] px-3"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-[11px] w-full">
                    <label
                      htmlFor="phone"
                      className="[font-family:'DM_Sans',Helvetica] font-normal text-[#232f16] text-2xl tracking-[0] leading-[31.2px]"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="enter here"
                      className="h-[45px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-[#8c8c8c] text-lg tracking-[0] leading-[26.4px] px-3"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-[11px] w-full">
                    <label
                      htmlFor="message"
                      className="[font-family:'DM_Sans',Helvetica] font-normal text-[#232f16] text-2xl tracking-[0] leading-[31.2px]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Type your message"
                      className="h-[109px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-[#8c8c8c] text-lg tracking-[0] leading-[26.4px] px-3 py-2 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-[149px] h-[49px] bg-[#4eb778] hover:bg-[#45a56b] rounded-[60px] [font-family:'Roboto',Helvetica] font-medium text-white text-2xl tracking-[0] leading-[normal] transition-colors"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <img
        className="w-full max-w-[1243px] h-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
        alt="Map showing location in Addis Ababa"
        src="https://c.animaapp.com/mgcmausvNL2kHo/img/group-15.png"
      />
    </section>
  );
}