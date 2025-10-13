"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";
import ContactUsSkeleton from "~/components/sections/contact-us-skeleton";

interface PageData {
  title?: string;
  subtitle?: string;
  headerText?: string;
  subHeaderText?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactUs() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/public/pages/contact-us");
      const data = await response.json();

      if (data.success) {
        setPageData(data.data);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate form submission - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <ContactUsSkeleton />;
  }

  return (
    <div className="bg-white w-full relative min-h-screen px-6  md:px-12 lg:px-20 2xl:px-28">
      {/* Page Title */}
      <div className="mb-6 md:mb-20">
        <h1 className="text-4xl md:text-[55px] font-black text-[#388E3C] tracking-tight text-center">
          {pageData?.title || "CONTACT US"}
        </h1>
        <p className="mx-2 md:mx-6 mt-2 w-full rounded-3xl py-2  text-center text-base md:text-lg font-medium text-gray-600 leading-relaxed tracking-wide md:shadow-sm">
          {pageData?.subtitle ||
            "Get in touch and be part of our journey of transformation."}
        </p>
      </div>

      {/* Main Content Section */}
      <div className="w-full md:px-4 pb-16">
        {/* Contact Information and Form Section */}
        <div className="relative  rounded-3xl md:shadow-lg overflow-hidden mb-8">
          <div className="absolute inset-0  bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-5" />

          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-16  md:px-8 lg:px-14 lg:p-16">
            {/* Left Side - Contact Information */}
            <div className="flex flex-col gap-8 md:gap-16 lg:w-1/2">
              <div className="flex flex-col gap-6 max-w-md">
                <div>
                  <h4 className="font-roboto pt-4 font-light text-xl sm:text-2xl md:text-4xl leading-[1.01] tracking-[0px] capitalize text-[#333333] mb-2 md:mb-4">
                    {pageData?.headerText ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: pageData.headerText,
                        }}
                      />
                    ) : (
                      <>
                        <span className="font-black">Let&apos;s Explore</span>{" "}
                        how we can work together for a better future
                      </>
                    )}
                  </h4>
                  <p className="text-black font-roboto font-light text-sm md:text-base lg:text-2xl leading-[1.01] tracking-[0px] capitalize">
                    {pageData?.subHeaderText ||
                      "Together, we can turn challenges into opportunities, let's talk."}
                  </p>
                </div>

                <div className="flex flex-col text-primary-green gap-4 mt-2 font-roboto font-normal text-lg md:text-[24px] leading-[1.01] tracking-[0px] capitalize">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    <span>{pageData?.phone || "+251 911 121314"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    <span>{pageData?.email || "hello@tsd.com"}</span>
                  </div>
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
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="enter here"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-60"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="block text-[#333333] text-base font-normal "
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="enter here"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-60"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="phone"
                        className="block text-[#333333] text-base font-normal"
                      >
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="enter here"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full h-11 bg-white rounded-xl border-none px-4 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] placeholder:text-sm disabled:opacity-60"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="message"
                        className="block text-[#333333] text-base font-normal"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Type your message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white rounded-xl border-none px-4 py-3 text-[#333333] text-sm focus:outline-none focus:ring-1 focus:ring-[#4EB778] resize-none placeholder:text-sm disabled:opacity-60"
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
                      className="w-[110px] h-10 bg-[#4EB778] text-white font-normal text-base rounded-lg hover:bg-[#3fa76a] transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
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
                src={
                  pageData?.mapUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7578!3d9.0192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c1a4e69197%3A0x8c5b5b5b5b5b5b5b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map - Addis Ababa, Ethiopia"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
