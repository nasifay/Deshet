import { Skeleton } from "~/components/ui/skeleton";

export default function ContactUsSkeleton() {
  return (
    <div className="bg-white w-full relative min-h-screen px-6 md:px-12 lg:px-20 2xl:px-28">
      {/* Page Title Skeleton */}
      <div className="mb-6 md:mb-20">
        <div className="flex justify-center">
          <Skeleton className="h-10 md:h-16 w-64 md:w-80 mb-2" />
        </div>
        <div className="flex justify-center mt-4">
          <Skeleton className="h-6 md:h-8 w-[80%] md:w-[600px] rounded-3xl" />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full md:px-4 pb-16">
        {/* Contact Information and Form Section */}
        <div className="relative rounded-3xl md:shadow-lg overflow-hidden mb-8">
          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-16 md:px-8 lg:px-14 lg:p-16">
            {/* Left Side - Contact Information Skeleton */}
            <div className="flex flex-col gap-8 md:gap-16 lg:w-1/2">
              <div className="flex flex-col gap-6 max-w-md">
                {/* Header text skeleton */}
                <div>
                  <div className="space-y-2 md:space-y-3 mb-4">
                    <Skeleton className="h-6 md:h-8 lg:h-10 w-full" />
                    <Skeleton className="h-6 md:h-8 lg:h-10 w-[90%]" />
                    <Skeleton className="h-6 md:h-8 lg:h-10 w-[70%]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 md:h-6 w-full" />
                    <Skeleton className="h-5 md:h-6 w-[85%]" />
                  </div>
                </div>

                {/* Contact details skeleton */}
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-6 md:h-7 w-40 md:w-48" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-6 md:h-7 w-48 md:w-56" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form Skeleton */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#E7E7E7] rounded-3xl p-6 md:p-8 md:shadow-md">
                <div className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-16 mb-1" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-16 mb-1" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-28 w-full rounded-xl" />
                  </div>

                  {/* Submit Button */}
                  <Skeleton className="h-10 w-28 rounded-lg mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div className="rounded-2xl overflow-hidden md:px-6 lg:px-14">
          <div className="lg:p-4">
            <Skeleton className="w-full h-64 md:h-96 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
