import React from "react";

export function VisionSection() {
  return (
    <section className="relative w-full py-[104px] bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[60px] md:text-[80px] tracking-[0] leading-[60px] md:leading-[80px] mb-8">
            OUR VISION
          </h2>
          
          <div className="bg-[#f8f9fa] rounded-lg p-8 md:p-12 shadow-lg">
            <p className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-[18px] md:text-[20px] tracking-[0] leading-[28px] md:leading-[32px]">
              To create a society where young people are empowered to realize their full potential, 
              contributing to sustainable development and social transformation in Ethiopia and beyond.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#128341] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🎯</span>
              </div>
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#128341] text-[18px] tracking-[0] leading-[24px] mb-2">
                Empowerment
              </h3>
              <p className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[14px] tracking-[0] leading-[20px]">
                Empowering youth through education and skill development
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#128341] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🤝</span>
              </div>
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#128341] text-[18px] tracking-[0] leading-[24px] mb-2">
                Partnership
              </h3>
              <p className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[14px] tracking-[0] leading-[20px]">
                Building strong partnerships for sustainable impact
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#128341] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🌱</span>
              </div>
              <h3 className="[font-family:'Roboto',Helvetica] font-bold text-[#128341] text-[18px] tracking-[0] leading-[24px] mb-2">
                Transformation
              </h3>
              <p className="[font-family:'Roboto',Helvetica] font-medium text-[#666666] text-[14px] tracking-[0] leading-[20px]">
                Driving positive social transformation in communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}