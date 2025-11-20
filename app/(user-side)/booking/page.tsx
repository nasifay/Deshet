"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import { useTranslation } from "~/lib/i18n/hooks";

interface PageData {
  title?: string;
  slug?: string;
  content?: string;
  sections?: Array<{
    type: string;
    data: Record<string, unknown>;
    order: number;
  }>;
}

interface BookingFormData {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  healthConcern: string;
  requestCallback: boolean;
}

export default function BookingPage() {
  const { t } = useTranslation();
  
  // Service types using translations
  const serviceTypes = [
    t("booking.form.services.traditionalConsultation"),
    t("booking.form.services.herbalMedicine"),
    t("booking.form.services.detoxTherapy"),
    t("booking.form.services.diagnosticTechniques"),
    t("booking.form.services.healingTreatments"),
    t("booking.form.services.generalConsultation"),
  ];

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    serviceType: "",
    healthConcern: "",
    requestCallback: false,
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
      const response = await fetch("/api/public/pages/booking");
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/public/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: t("booking.form.success"),
        });
        setFormData({
          name: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          serviceType: "",
          healthConcern: "",
          requestCallback: false,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || t("booking.form.error"),
        });
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      setSubmitStatus({
        type: "error",
        message: t("booking.form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* BOOK APPOINTMENT Header */}
      <div className="flex flex-col items-center justify-center pt-10 pb-6 lg:pt-16 lg:pb-8 gap-2">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2E8B57] tracking-wide">
          {t("booking.title").toUpperCase()}
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          {t("booking.subtitle")}
        </p>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center gap-10 sm:gap-12 lg:gap-16 px-4 pb-16">
        {/* Green Hero Banner */}
        <div className="w-full max-w-6xl bg-primary-green/90 rounded-[20px] shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-50" />

          {/* Content */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                {t("booking.heroTitle")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed">
                {t("booking.heroDescription")}{" "}
                <span className="text-[#D4EDDA] font-medium">
                  {t("booking.heroPriority")}
                </span>
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0 w-full sm:w-auto flex justify-center">
              <div className="w-full h-auto max-w-[200px] max-h-[200px] sm:max-w-[250px] sm:max-h-[250px] lg:w-80 lg:h-80 flex items-center justify-center bg-white/10 rounded-lg">
                <Stethoscope className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-white icon-medical" />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="w-full max-w-4xl">
          <Card className="bg-white rounded-[20px] premium-shadow border-0">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2E8B57] mb-6 text-center">
                {t("booking.formTitle")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="block text-[#333333] text-base font-medium"
                  >
                    {t("booking.form.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("booking.form.placeholder.name")}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white rounded-xl border border-gray-300 px-4 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="block text-[#333333] text-base font-medium"
                  >
                    {t("booking.form.phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t("booking.form.placeholder.phone")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white rounded-xl border border-gray-300 px-4 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="preferredDate"
                      className="block text-[#333333] text-base font-medium flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 icon-medical" />
                      {t("booking.form.preferredDate")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      min={today}
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white rounded-xl border border-gray-300 px-4 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="preferredTime"
                      className="block text-[#333333] text-base font-medium flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 icon-medical" />
                      {t("booking.form.preferredTime")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="preferredTime"
                      name="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white rounded-xl border border-gray-300 px-4 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="serviceType"
                    className="block text-[#333333] text-base font-medium"
                  >
                    {t("booking.form.serviceType")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white rounded-xl border border-gray-300 px-4 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">{t("booking.form.placeholder.selectService")}</option>
                    {serviceTypes.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Health Concern Description */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="healthConcern"
                    className="block text-[#333333] text-base font-medium"
                  >
                    {t("booking.form.healthConcern")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="healthConcern"
                    name="healthConcern"
                    rows={5}
                    placeholder={t("booking.form.placeholder.healthConcern")}
                    value={formData.healthConcern}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white rounded-xl border border-gray-300 px-4 py-3 text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#128341] focus:border-transparent resize-none placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Call-back Option */}
                <div className="flex items-center gap-3">
                  <input
                    id="requestCallback"
                    name="requestCallback"
                    type="checkbox"
                    checked={formData.requestCallback}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-[#128341] border-gray-300 rounded focus:ring-2 focus:ring-[#128341] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor="requestCallback"
                    className="text-[#333333] text-sm font-medium cursor-pointer"
                  >
                    {t("booking.form.callback")}
                  </label>
                </div>

                {/* Submit Status */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
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
                  className="w-full h-12 bg-[#128341] text-white font-semibold text-base rounded-xl hover:bg-[#0e6a32] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? t("booking.form.submitting") : t("booking.form.submit")}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
