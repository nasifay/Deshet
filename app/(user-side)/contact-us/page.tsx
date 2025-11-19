"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";
import { useTranslation } from "~/lib/i18n/hooks";

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
}

// Country codes with flags
const countryCodes = [
  // 1-digit codes
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "+7", country: "KZ", flag: "🇰🇿", name: "Kazakhstan" },
  // 2-digit codes
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+30", country: "GR", flag: "🇬🇷", name: "Greece" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgium" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+36", country: "HU", flag: "🇭🇺", name: "Hungary" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+40", country: "RO", flag: "🇷🇴", name: "Romania" },
  { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
  { code: "+43", country: "AT", flag: "🇦🇹", name: "Austria" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  // African countries
  { code: "+211", country: "SS", flag: "🇸🇸", name: "South Sudan" },
  { code: "+212", country: "MA", flag: "🇲🇦", name: "Morocco" },
  { code: "+213", country: "DZ", flag: "🇩🇿", name: "Algeria" },
  { code: "+216", country: "TN", flag: "🇹🇳", name: "Tunisia" },
  { code: "+218", country: "LY", flag: "🇱🇾", name: "Libya" },
  { code: "+233", country: "GH", flag: "🇬🇭", name: "Ghana" },
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "+249", country: "SD", flag: "🇸🇩", name: "Sudan" },
  { code: "+250", country: "RW", flag: "🇷🇼", name: "Rwanda" },
  { code: "+251", country: "ET", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+252", country: "SO", flag: "🇸🇴", name: "Somalia" },
  { code: "+253", country: "DJ", flag: "🇩🇯", name: "Djibouti" },
  { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
  { code: "+255", country: "TZ", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", country: "UG", flag: "🇺🇬", name: "Uganda" },
];

export default function ContactUs() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+251",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [mapConfig, setMapConfig] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
  } | null>(null);
  const [mapSrc, setMapSrc] = useState<string>(
    "https://www.google.com/maps?q=9.0192,38.7578&z=13&output=embed"
  );

  useEffect(() => {
    let isMounted = true;
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/public/contact/config", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success && data?.data && isMounted) {
          const { latitude, longitude, zoom } = data.data;
          setMapConfig({ latitude, longitude, zoom });
          setMapSrc(
            `https://www.google.com/maps?q=${latitude},${longitude}&z=${
              zoom || 13
            }&output=embed`
          );
        }
      } catch (e) {
        // silently fall back to default
      }
    };
    loadConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, name, value } = e.target;
    const fieldName = id || name;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Combine country code and phone number
      const fullPhone = `${formData.countryCode}${formData.phone}`;

      const response = await fetch("/api/public/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: t("contact.form.success"),
        });
        setFormData({
          name: "",
          email: "",
          countryCode: "+251",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || t("contact.form.error"),
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: t("contact.form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full relative min-h-screen px-6  md:px-12 lg:px-20 2xl:px-28">
      {/* Page Title */}
      <div className="mb-6 md:mb-20">
        <h1 className="text-4xl md:text-[55px] font-black text-[#388E3C] tracking-tight text-center">
          {t("contact.title").toUpperCase()}
        </h1>
        <p className="mx-2 md:mx-6 mt-2 w-full rounded-3xl py-2  text-center text-base md:text-lg font-medium text-gray-600 leading-relaxed tracking-wide md:shadow-sm">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* Main Content Section */}
      <div className="w-full md:px-4 pb-16">
        {/* Contact Information and Form Section */}
        <div className="relative  rounded-3xl md:shadow-lg overflow-hidden mb-8">
          <div className="absolute inset-0  bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-[0.05]" />

          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-16  md:px-8 lg:px-14 lg:p-16">
            {/* Left Side - Contact Information */}
            <div className="flex flex-col gap-8 md:gap-16 lg:w-1/2">
              <div className="flex flex-col gap-6 max-w-md">
                <div>
                  <h4 className="font-roboto pt-4 font-light text-xl sm:text-2xl md:text-4xl leading-[1.01] tracking-[0px] capitalize text-[#333333] mb-2 md:mb-4">
                    <span className="font-black">{t("contact.letsExplore")}</span> {t("contact.workTogether")}
                  </h4>
                  <p className="text-black font-roboto font-light text-sm md:text-base lg:text-2xl leading-[1.01] tracking-[0px] capitalize">
                    {t("contact.together")}
                  </p>
                </div>

                <div className="flex flex-col text-primary-green gap-4 mt-2 font-roboto font-normal text-lg md:text-[24px] leading-[1.01] tracking-[0px] capitalize">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    <span>+251 XXX XXX XXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    <span>info@deshetmed.com</span>
                  </div>
                </div>

                 {/* Working Hours Section */}
                 <div className="flex flex-col gap-3 mt-4">
                   <div className="flex items-center gap-2">
                     <Clock className="w-5 h-5 text-primary-green" />
                     <h5 className="font-roboto font-semibold text-lg md:text-xl text-[#333333]">
                       {t("contact.info.workingHours")}
                     </h5>
                   </div>
                   <div className="flex flex-col gap-2 text-[#666666] font-roboto font-normal text-sm md:text-base ml-7">
                     <div className="flex justify-between">
                       <span>{t("contact.info.mondayFriday")}</span>
                       <span>8:00 AM - 6:00 PM</span>
                     </div>
                     <div className="flex justify-between">
                       <span>{t("contact.info.saturday")}</span>
                       <span>9:00 AM - 4:00 PM</span>
                     </div>
                     <div className="flex justify-between">
                       <span>{t("contact.info.sunday")}</span>
                       <span>{t("contact.info.closed")}</span>
                     </div>
                   </div>
                 </div>

                 {/* Address Section */}
                 <div className="flex flex-col gap-2 mt-4">
                   <div className="flex items-center gap-2">
                     <MapPin className="w-5 h-5 text-primary-green" />
                     <h5 className="font-roboto font-semibold text-lg md:text-xl text-[#333333]">
                       {t("contact.info.address")}
                     </h5>
                   </div>
                   <p className="text-[#666666] font-roboto font-normal text-sm md:text-base leading-relaxed ml-7">
                     {t("contact.info.addressDetails")}
                     <br />
                     {t("contact.info.addressNote")}
                   </p>
                 </div>
              </div>{" "}
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:w-1/2 w-full">
              <Card className="bg-[#E7E7E7] md:rounded-3xl md:shadow-md border-0">
                <CardContent className="pt-4 md:p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="name"
                        className="block text-[#333333] text-base font-normal"
                      >
                        {t("contact.form.name")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder={t("contact.form.enterHere")}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-[0.6]"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="block text-[#333333] text-base font-normal "
                      >
                        {t("contact.form.email")}
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder={t("contact.form.enterHere")}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-[0.6]"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                      <label className="block text-[#333333] text-base font-normal">
                        {t("contact.form.phone")}
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-[110px] h-11 bg-white rounded-xl border-none px-2 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-[0.6]"
                        >
                          <option value="">{t("contact.form.phoneCode")}</option>
                          {countryCodes.map((country, index) => (
                            <option
                              key={`${country.code}-${country.country}-${index}`}
                              value={country.code}
                            >
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <input
                          id="phone"
                          type="tel"
                          placeholder={t("contact.form.enterHere")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="flex-1 h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-[0.6]"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="message"
                        className="block text-[#333333] text-base font-normal"
                      >
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder={t("contact.form.typeMessage")}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white rounded-xl border-none px-4 py-3 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] resize-none placeholder:text-sm disabled:opacity-[0.6]"
                      ></textarea>
                    </div>

                    {/* Submit Status */}
                    {submitStatus.type && (
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          submitStatus.type === "success"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-[110px] h-10 bg-[#4EB778] text-white font-normal text-base rounded-lg hover:bg-[#3fa76a] transition-all duration-200 mt-2 disabled:opacity-[0.6] disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className=" rounded-2xl overflow-hidden md:px-6 lg:px-14">
          <div className="lg:p-4">
            <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
