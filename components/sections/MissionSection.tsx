import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

const coreValues = [
  {
    title: "VOLUNTEERISM",
    description: "Serving Youth In Health, Jobs, Leadership, And Environment.",
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/asset-1-9.png",
    iconWidth: "w-[148px]",
    iconHeight: "h-[171px]",
    separator:
      "https://c.animaapp.com/mgclt9blEcJSeI/img/frame-1000002153-4.svg",
    gap: "gap-20",
  },
  {
    title: "PEOPLE \nCENTEREDNESS",
    description: "Putting People At The Heart Of Everything We Do.",
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/gemini-generated-image-5bmphv5bmphv5bmp-photoroom-1.png",
    iconWidth: "w-[203px]",
    iconHeight: "h-[175px]",
    separator:
      "https://c.animaapp.com/mgclt9blEcJSeI/img/frame-1000002153-2.svg",
    gap: "gap-[58px]",
  },
  {
    title: "STEWARDSHIP",
    description: "Managing Resources Responsibly For Lasting Impact.",
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/gemini-generated-image-gh6fohgh6fohgh6f-photoroom-1.png",
    iconWidth: "w-[175px]",
    iconHeight: "h-[129px]",
    separator:
      "https://c.animaapp.com/mgclt9blEcJSeI/img/frame-1000002153-1.svg",
    gap: "gap-[95px]",
  },
  {
    title: "DIVERSITY & \nINCLUSIVENESS",
    description: "Valuing And Embracing Every Voice And Perspective.",
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/gemini-generated-image-azqh4sazqh4sazqh-photoroom-1.png",
    iconWidth: "w-[175px]",
    iconHeight: "h-[127px]",
    separator: "https://c.animaapp.com/mgclt9blEcJSeI/img/frame-1000002153.svg",
    gap: "gap-[82px]",
  },
  {
    title: "TRANSPARENCY & \nACCOUNTABILITY",
    description: "Acting With Openness And Integrity In All Actions.",
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/gemini-generated-image-5i1yck5i1yck5i1y-photoroom-1.png",
    iconWidth: "w-[175px]",
    iconHeight: "h-[162px]",
    separator:
      "https://c.animaapp.com/mgclt9blEcJSeI/img/frame-1000002153-3.svg",
    gap: "gap-[64.5px]",
  },
];

const leadershipTeam = [
  {
    name: "SELAMAWIT GETACHEW",
    title: "Executive Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-910.svg",
  },
  {
    name: "DAWIT\nMEKONNEN",
    title: "Finance & Administration Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-912.svg",
  },
  {
    name: "MERON\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914-3.svg",
  },
  {
    name: "MERON\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914.svg",
  },
  {
    name: "DANIEL\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914-1.svg",
  },
  {
    name: "SELAMAWIT GETACHEW",
    title: "Executive Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-910.svg",
  },
  {
    name: "DAWIT\nMEKONNEN",
    title: "Finance & Administration Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-912.svg",
  },
  {
    name: "MERON\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914-3.svg",
  },
  {
    name: "MERON\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914.svg",
  },
  {
    name: "DANIEL\nABEBE",
    title: "Program Director",
    image: "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-914-1.svg",
  },
];

const targetGroups = [
  {
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/group-1000002163.png",
    title: "Adolescents and Youth",
    iconWidth: "w-[47.5px]",
    iconHeight: "h-[71px]",
  },
  {
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/group-1000002165.png",
    title: "Girls and Women",
    iconWidth: "w-[42.5px]",
    iconHeight: "h-[55px]",
  },
  {
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/group-18.png",
    title: "Opinion Leaders",
    iconWidth: "w-[59.06px]",
    iconHeight: "h-[43.59px]",
  },
  {
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/group-17.png",
    title: "Service Providers",
    iconWidth: "w-[58.78px]",
    iconHeight: "h-[39.63px]",
  },
  {
    icon: "https://c.animaapp.com/mgclt9blEcJSeI/img/group-19.png",
    title: "Vulnerable and Most at risk population",
    iconWidth: "w-[60px]",
    iconHeight: "h-[54.23px]",
  },
];

const operationRegions = [
  "ADDIS ABABA",
  "SIDAMA REGION",
  "OROMIA REGION",
  "SOUTH ETHIOPIA REGION",
  "CENTRAL ETHIOPIA REGION",
];

const programs = [
  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-19.png",
  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-20.png",
  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-21.png",
  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-25.png",
  "https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-26.png",
];

export function MissionSection() {
  return (
    <section className="flex flex-col w-full items-center gap-[87px] relative">
      <Card className="w-[1595px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[65px] px-0 py-[88px]">
          <p className="max-w-[993px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
            Working hand in hand with communities for a brighter future.
          </p>
        </CardContent>
      </Card>

      <div className="relative w-[1595px] h-[744px] bg-[url(https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-921.svg)] bg-[100%_100%] rounded-[46px] translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:400ms]" />

      <section className="flex w-full items-center gap-[245px] px-[148px] py-[130px] relative [background:url(https://c.animaapp.com/mgclt9blEcJSeI/img/tamra-pattern-2.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(18,131,65,1)_0%,rgba(18,131,65,1)_100%)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <p className="w-[896px] [font-family:'Roboto',Helvetica] font-normal text-white text-2xl text-justify tracking-[0.80px] leading-[34.8px]">
          Tamra For Social Development Organization (tsd) Is An Ethiopian Civil
          Society Organization Founded In 1998 By Ten Visionary Youths As An
          Anti-aids Club At Shashemene High School. It Was Re-registered As A
          Local Cso By The Authority For Civil Society Organizations (acso) On
          June 7, 2019, With Registration No. 0184. Tsd Focuses On Youth
          Empowerment, Peacebuilding, Sexual And Reproductive Health, Gender
          Development, And Climate Justice. Operating Across Addis Ababa,
          Oromia, Sidama, South Ethiopia, And Central Ethiopia Regions, It
          Coordinates Efforts Through Regional Offices In Shashemene And
          Wolayita Sodo, As Well As Project Coordination Offices In Towns Like
          Hawassa.
        </p>

        <div className="relative w-[453px] h-[436px]">
          <img
            className="absolute top-0 left-[99px] w-[354px] h-[377px]"
            alt="Rectangle"
            src="https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-929.png"
          />
          <img
            className="absolute top-[59px] left-0 w-[354px] h-[377px] rounded-[26px] object-cover"
            alt="Rectangle"
            src="https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-930.png"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
        <div className="flex flex-col w-full items-center justify-center gap-2.5 px-[206px] py-32">
          <div className="inline-flex flex-col items-center justify-center gap-[49px]">
            <article className="flex items-start gap-[155px] w-full">
              <img
                className="w-[273.75px] h-[271.55px]"
                alt="Vision icon"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/mask-group.png"
              />
              <div className="flex flex-col w-[703px] items-start justify-center gap-[39px]">
                <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#ff9700] text-[70px] tracking-[0] leading-[70.7px]">
                  VISION
                </h2>
                <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-[40px] text-justify tracking-[0] leading-[42.4px]">
                  &quot;tsd Envisioned A Developed Ethiopia With Empowered Youth
                  And Women&quot;.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-[155px] w-full">
              <img
                className="w-[278.5px] h-[278.5px]"
                alt="Mission icon"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/mask-group-1.png"
              />
              <div className="flex flex-col w-[703px] items-start justify-center gap-[39px]">
                <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#ff9700] text-[70px] tracking-[0] leading-[70.7px]">
                  MISSION
                </h2>
                <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-[40px] text-justify tracking-[0] leading-[42.4px]">
                  Tsd Strives To Realize The Human Right Of Youth And Women
                  Through Evidence-based Advocacy And <br />
                  empowerment Works.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[82px] px-[85px] py-[88px]">
          <h2 className="w-full max-w-[1369px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
            CORE VALUES
          </h2>

          <div className="relative w-full max-w-[1376px] h-[696.74px] rounded-[46px]">
            <div className="absolute w-[98.05%] h-[100.04%] top-0 left-0 bg-[#d9d9d9] rounded-[46px]">
              <img
                className="absolute w-[20.03%] h-[99.93%] top-0 left-[79.97%]"
                alt="Union"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/union-2.svg"
              />
              <img
                className="w-[22.01%] h-[99.93%] left-[59.99%] absolute top-0"
                alt="Union"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/union-1.svg"
              />
              <img
                className="w-[22.01%] h-[99.93%] left-[39.99%] absolute top-0"
                alt="Union"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/union-1.svg"
              />
              <img
                className="w-[22.01%] h-[99.93%] left-[20.00%] absolute top-0"
                alt="Union"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/union-1.svg"
              />
            </div>

            <img
              className="w-[21.58%] h-[99.96%] left-0 absolute top-0"
              alt="Union"
              src="https://c.animaapp.com/mgclt9blEcJSeI/img/union.svg"
            />

            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`flex flex-col w-[16.21%] items-center ${
                  value.gap
                } absolute h-[69.04%] top-[15.50%] left-[${
                  index * 19.63 + (index === 0 ? 0 : 1.29)
                }%]`}
                style={{ left: `${index * 19.63 + (index === 0 ? 0 : 1.29)}%` }}
              >
                <h3 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-[28px] text-center tracking-[0] leading-[28.3px] whitespace-pre-line">
                  {value.title}
                </h3>
                <img
                  className={`${value.iconWidth} ${value.iconHeight} object-cover`}
                  alt={value.title}
                  src={value.icon}
                />
                <div className="flex flex-col items-center gap-[54px] w-full">
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-xl text-center tracking-[0] leading-[21.2px]">
                    {value.description}
                  </p>
                  <img alt="Separator" src={value.separator} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="inline-flex flex-col items-center gap-[87px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]">
        <h2 className="w-full max-w-[1349px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
          OUR LEADERSHIP
        </h2>

        <div className="relative w-full max-w-[1351px] h-[646px] overflow-hidden">
          <div className="inline-flex items-start gap-[39px]">
            {leadershipTeam.map((member, index) => (
              <Card
                key={index}
                className="w-[424.02px] h-[646px] bg-[#b1efca] rounded-[46px] flex-shrink-0"
              >
                <CardContent className="p-0 relative h-full">
                  <img
                    className="w-full h-[495px] object-cover rounded-t-[46px]"
                    alt={member.name}
                    src={member.image}
                  />
                  <div className="flex flex-col w-[247px] items-start gap-2 absolute top-[519px] left-6">
                    <h3 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-[28px] tracking-[0] leading-[28.3px] whitespace-pre-line">
                      {member.name}
                    </h3>
                    <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-xl tracking-[0] leading-[21.2px]">
                      {member.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[65px] p-[45px]">
          <h2 className="w-full max-w-[1343px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
            TARGET GROUP
          </h2>

          <div className="flex flex-col w-full max-w-[1369px] items-start gap-2.5 p-2.5">
            <img
              className="w-full h-[413px] object-cover"
              alt="Young millennials"
              src="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
            />
          </div>

          <div className="w-full max-w-[1350px]">
            <div className="inline-flex items-start justify-center gap-[169px]">
              <div className="flex flex-col w-[630px] items-start gap-12">
                {targetGroups.slice(0, 3).map((group, index) => (
                  <div key={index} className="flex items-start gap-5 w-full">
                    <img
                      className={`${group.iconWidth} ${group.iconHeight}`}
                      alt={group.title}
                      src={group.icon}
                    />
                    <div className="flex-1">
                      <p className="[font-family:'Roboto',Helvetica] font-normal text-primary-text text-4xl tracking-[0] leading-[57.6px]">
                        {group.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col w-[551px] items-start gap-12">
                {targetGroups.slice(3).map((group, index) => (
                  <div key={index} className="flex items-start gap-5 w-full">
                    <img
                      className={`${group.iconWidth} ${group.iconHeight}`}
                      alt={group.title}
                      src={group.icon}
                    />
                    <div className="flex-1">
                      <p className="[font-family:'Roboto',Helvetica] font-normal text-primary-text text-4xl tracking-[0] leading-[57.6px]">
                        {group.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="inline-flex flex-col items-center gap-[41px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
        <h2 className="w-full max-w-[1343px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
          CURRENT OPERATION REGIONS
        </h2>

        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-full h-[849px] bg-white rounded-[46px] overflow-hidden relative">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                className="absolute w-[115.39%] h-[115.36%]"
                alt="Ethiopia map layer"
                src="https://c.animaapp.com/mgclt9blEcJSeI/img/layer-1.png"
              />
              <div className="inline-flex items-center gap-[232px] relative z-10">
                <div className="inline-flex flex-col items-start gap-[37px]">
                  {operationRegions.map((region, index) => (
                    <h3
                      key={index}
                      className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-4xl tracking-[0] leading-[36.4px] whitespace-nowrap"
                    >
                      {region}
                    </h3>
                  ))}
                </div>
                <img
                  className="w-[695px] h-[539px]"
                  alt="Ethiopia regions map"
                  src="https://c.animaapp.com/mgclt9blEcJSeI/img/group-1000002172.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[65px] px-[65px] py-[88px]">
          <h2 className="w-full max-w-[1343px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
            OUR PROGRAMS
          </h2>

          <div className="w-full max-w-[1350px]">
            <div className="inline-flex items-center justify-center gap-[63px]">
              {programs.map((program, index) => (
                <img
                  key={index}
                  className="w-[210px] h-[556px] rounded-[31px] object-cover"
                  alt={`Program ${index + 1}`}
                  src={program}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
