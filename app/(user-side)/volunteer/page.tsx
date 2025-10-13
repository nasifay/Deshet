"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import VolunteerPageSkeleton from "~/components/sections/volunteer-page-skeleton";

interface PageData {
  title?: string;
  subtitle?: string;
  headerText?: string;
  bannerImage?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  location: string;
  motivation: string;
}

const FormField = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] disabled:opacity-60"
    />
  </div>
);

const MessageField = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full rounded-[8px] bg-white border border-[#E5E5E5] px-4 py-3 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] resize-none disabled:opacity-60"
    ></textarea>
  </div>
);

export default function VolunteerPage() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    motivation: "",
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
      const response = await fetch("/api/public/pages/volunteer");
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/volunteer/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: parseInt(formData.age) || 0,
          gender: formData.gender,
          location: formData.location,
          motivation: formData.motivation,
          availability: "Flexible", // Default value
          referenceSource: "Website", // Default value
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
          location: "",
          motivation: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
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
    return <VolunteerPageSkeleton />;
  }

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-16">
        {/* Title */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#2E8B57] uppercase mb-12 tracking-wide text-center">
          {pageData?.title || "JOIN AS A VOLUNTEER"}
        </h1>

        {/* Green CTA Banner */}
        <div className="w-full max-w-[900px] bg-primary-green/90 rounded-[25px] shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden px-8 py-10 mb-16 relative">
          {/* Green Container Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-50" />

          {/* Left Image */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 relative z-10">
            <Image
              src={
                pageData?.bannerImage ||
                "https://c.animaapp.com/mgdc97zk62g2qg/img/rectangle-928.svg"
              }
              alt="Volunteering"
              className="w-[200px] h-[150px] object-cover rounded-[12px]"
              width={200}
              height={150}
            />
          </div>

          {/* Right Text */}
          <div className="text-white md:pl-8 text-center md:text-left leading-relaxed relative z-10">
            <p className="text-[24px] md:text-[28px] font-bold">
              {pageData?.headerText ? (
                <span
                  dangerouslySetInnerHTML={{ __html: pageData.headerText }}
                />
              ) : (
                <>
                  Join A Network Of{" "}
                  <span className="font-normal">People Committed To </span>
                  <br />
                  Equality, Empowerment, And{" "}
                  <span className="text-[#FBB040] font-bold">
                    Sustainable Change.
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="w-full lg:w-[80vw] bg-white rounded-[20px] border border-[#EAEAEA] shadow-lg relative overflow-hidden">
          {/* Form Container Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-5" />
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-6 relative z-10 p-6 md:px-20 lg:px-28 lg:w-2/3 items-center justify-center"
          >
            <FormField
              label="Name"
              placeholder="enter here"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Gender"
              placeholder="enter here"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Age"
              placeholder="enter here"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Phone Number"
              placeholder="enter here"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Email Address"
              placeholder="enter here"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <FormField
              label="Address"
              placeholder="enter here"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
            <MessageField
              label="Message"
              placeholder="Type here"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />

            {/* Submit Status */}
            {submitStatus.type && (
              <div
                className={`w-full p-4 rounded-lg text-sm ${
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
              className="w-full h-[50px] bg-[#4EB778] hover:bg-[#3fa76a] transition-all duration-200 text-white font-medium text-[16px] rounded-[8px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
