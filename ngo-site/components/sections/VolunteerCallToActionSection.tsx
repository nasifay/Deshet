import React from "react";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const formFields = [
  { id: "name", label: "Name", placeholder: "enter here", type: "input" },
  { id: "gender", label: "Gender", placeholder: "enter here", type: "input" },
  { id: "age", label: "Age", placeholder: "enter here", type: "input" },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "enter here",
    type: "input",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "enter here",
    type: "input",
  },
  { id: "address", label: "Address", placeholder: "enter here", type: "input" },
  {
    id: "message",
    label: "Message",
    placeholder: "Type here",
    type: "textarea",
  },
];

export function VolunteerCallToActionSection() {
  return (
    <section className="flex flex-col w-full items-center gap-[86px] relative">
      <div className="flex w-full items-center justify-center gap-12 lg:gap-[195px] p-8 lg:p-[45px] relative bg-[#4eb778] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] flex-col lg:flex-row translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="inline-flex flex-col items-start justify-center gap-[21px] relative flex-shrink-0">
          <img
            className="relative w-full max-w-[352px] h-auto aspect-[352/337] object-cover"
            alt="Volunteer network"
            src="https://c.animaapp.com/mgdc97zk62g2qg/img/rectangle-928.svg"
          />
        </div>

        <div className="inline-flex flex-col items-start gap-8 lg:gap-[65px] relative flex-shrink-0">
          <h2 className="relative max-w-[537px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-transparent text-3xl lg:text-[55px] tracking-[0] leading-tight lg:leading-[55.5px]">
            <span className="font-black text-white">Join A Network </span>
            <span className="font-light text-white">
              Of People Committed To Equality, Empowerment, And{" "}
            </span>
            <span className="font-medium text-[#ff9700]">
              Sustainable Change.
            </span>
          </h2>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-[18px] p-8 lg:p-[45px] relative rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] [background:url(https://c.animaapp.com/mgdc97zk62g2qg/img/frame-1000002102.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <form className="flex flex-col w-full max-w-[834px] items-start gap-[38px] relative">
          {formFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col items-start gap-[11px] relative self-stretch w-full"
            >
              <Label
                htmlFor={field.id}
                className="relative self-stretch [font-family:'DM_Sans',Helvetica] font-normal text-[#232f16] text-2xl lg:text-[32px] tracking-[0] leading-[41.6px]"
              >
                {field.label}
              </Label>

              {field.type === "input" ? (
                <Input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full h-[86px] px-[11px] py-[13px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-neutral-700 text-xl lg:text-2xl tracking-[0] leading-[35.2px] placeholder:text-neutral-700"
                />
              ) : (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  className="w-full h-44 px-[11px] py-[13px] bg-[#f6f6f6] rounded-[15px] border-0 [font-family:'DM_Sans',Helvetica] font-normal text-neutral-700 text-xl lg:text-2xl tracking-[0] leading-[35.2px] placeholder:text-neutral-700 resize-none"
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="h-auto w-full px-[78px] py-5 bg-[#4eb778] hover:bg-[#45a569] rounded-[25px] transition-colors"
          >
            <span className="[font-family:'Roboto',Helvetica] font-medium text-white text-2xl lg:text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
              Submit
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}