import { Skeleton } from "~/components/ui/skeleton";

// Volunteer Header Skeleton
export function VolunteerHeaderSkeleton() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-16">
        <Skeleton className="h-10 sm:h-12 md:h-14 w-[300px] sm:w-[400px] mb-12" />
      </main>
    </div>
  );
}

// Volunteer CTA Banner Skeleton
export function VolunteerCTABannerSkeleton() {
  return (
    <div className="w-full max-w-[900px] bg-primary-green/90 rounded-[25px] shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden px-8 py-10 mb-16 relative">
      {/* Left Image */}
      <div className="flex justify-center md:justify-start mb-6 md:mb-0 relative z-10">
        <Skeleton className="w-[200px] h-[150px] rounded-[12px]" />
      </div>

      {/* Right Text */}
      <div className="text-white md:pl-8 text-center md:text-left leading-relaxed relative z-10 space-y-3">
        <Skeleton className="h-6 md:h-7 w-[80%] bg-white/20" />
        <Skeleton className="h-6 md:h-7 w-[90%] bg-white/20" />
        <Skeleton className="h-6 md:h-7 w-[70%] bg-white/20" />
      </div>
    </div>
  );
}

// Volunteer Form Skeleton
export function VolunteerFormSkeleton() {
  return (
    <div className="w-full lg:w-[80vw] bg-white rounded-[20px] border border-[#EAEAEA] shadow-lg relative overflow-hidden">
      <div className="mx-auto flex flex-col gap-6 relative z-10 p-6 md:px-20 lg:px-28 lg:w-2/3 items-center justify-center">
        {/* Form Fields */}
        {[
          { label: "Name", type: "text" },
          { label: "Gender", type: "text" },
          { label: "Age", type: "number" },
          { label: "Phone Number", type: "tel" },
          { label: "Email Address", type: "email" },
          { label: "Address", type: "text" },
        ].map((field, index) => (
          <div key={index} className="flex flex-col w-full gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-[8px]" />
          </div>
        ))}

        {/* Message Field */}
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-24 w-full rounded-[8px]" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-[50px] w-full rounded-[8px]" />
      </div>
    </div>
  );
}

// Combined Volunteer Page Skeleton
export default function VolunteerPageSkeleton() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-16">
        <VolunteerHeaderSkeleton />
        <VolunteerCTABannerSkeleton />
        <VolunteerFormSkeleton />
      </main>
    </div>
  );
}
