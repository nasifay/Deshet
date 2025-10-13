import { Skeleton } from "~/components/ui/skeleton";

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative w-full h-auto lg:h-[90vh] flex items-center justify-start overflow-hidden bg-neutral-900">
      <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      <div className="relative z-10 max-sm:py-20 px-6 md:px-16 lg:px-24 max-w-2xl">
        <Skeleton className="h-12 md:h-16 lg:h-20 w-[400px] max-w-full mb-4" />
        <Skeleton className="h-12 md:h-16 lg:h-20 w-[300px] max-w-full mb-10" />
        <Skeleton className="h-12 md:h-14 w-40 md:w-48 rounded-full" />
      </div>
    </section>
  );
}

// About Section Skeleton
export function AboutSkeleton() {
  return (
    <section className="relative w-full bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col wxga:flex-row items-center justify-center gap-12 wxga:gap-[118px]">
        {/* Left Column */}
        <div className="w-full wxga:w-auto">
          <Skeleton className="h-16 md:h-20 w-64 mb-6" />
          <div className="space-y-3 mb-8 max-w-[620px]">
            <Skeleton className="h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-[90%]" />
            <Skeleton className="h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-[80%]" />
          </div>
          <Skeleton className="h-12 md:h-14 w-40 rounded-full" />
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center relative w-full wxga:w-auto">
          <Skeleton className="w-full wxga:w-[520px] h-[330px] md:h-[380px] lg:h-[400px] rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

// Statistics Section Skeleton
export function StatisticsSkeleton() {
  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16 place-content-start md:place-content-center place-items-start md:place-items-center">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col items-start justify-center gap-2"
            >
              <Skeleton className="h-8 md:h-10 w-20 md:w-24" />
              <Skeleton className="h-6 md:h-8 w-24 md:w-32" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Program Areas Section Skeleton
export function ProgramAreasSkeleton() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
      <div className="relative w-full h-auto aspect-[1595/854] overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-full rounded-2xl" />

        {/* Text Content Skeleton */}
        <div className="absolute bottom-20 left-0 flex items-center z-10">
          <div className="ml-8 md:ml-12 lg:ml-16 space-y-4">
            <Skeleton className="h-10 md:h-14 lg:h-16 w-[250px] md:w-[350px] bg-white/20" />
            <Skeleton className="h-10 md:h-14 lg:h-16 w-[300px] md:w-[400px] bg-white/20" />
            <Skeleton className="h-10 md:h-14 lg:h-16 w-[200px] md:w-[280px] bg-white/20" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="absolute bottom-8 left-8 md:bottom-18 md:left-18 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

// Supporters Section Skeleton
export function SupportersSkeleton() {
  return (
    <section className="bg-white py-12 md:py-16 relative w-full overflow-hidden">
      <div className="mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mx-6 md:mx-20 mb-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-[1px] w-full" />
        </div>

        {/* Logo Rows */}
        <div className="mt-6 flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex gap-8 justify-center items-center overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton
                key={`row1-${item}`}
                className="flex-shrink-0 w-[120px] md:w-[140px] lg:w-[160px] h-[60px]"
              />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-8 justify-center items-center overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton
                key={`row2-${item}`}
                className="flex-shrink-0 w-[100px] wxga:[120px] xl:w-[160px] h-[40px] lg:h-[60px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Achievements Section Skeleton
export function AchievementsSkeleton() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-20 wxga:px-50 xl:60 2xl:px-80">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-4 md:mb-16">
          <Skeleton className="h-16 md:h-20 w-64 mb-6" />
          <div className="space-y-3 max-w-4xl">
            <Skeleton className="h-5 md:h-6 w-full" />
            <Skeleton className="h-5 md:h-6 w-full" />
            <Skeleton className="h-5 md:h-6 w-[80%]" />
          </div>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 wxga:gap-24 mb-2 md:mb-8">
          <Skeleton className="w-auto md:w-[518px] h-[200px] md:h-[255px] rounded-2xl md:rounded-4xl" />
          <Skeleton className="w-auto wxga:w-[518px] h-[200px] md:h-[255px] rounded-2xl md:rounded-4xl" />
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="rounded-2xl h-64" />
          <Skeleton className="rounded-2xl h-64" />
          <Skeleton className="rounded-2xl h-64" />
        </div>
      </div>
    </div>
  );
}

// News Events Section Skeleton
export function NewsEventsSkeleton() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-12 md:h-14 w-64 md:w-80" />
          <Skeleton className="hidden sm:block h-6 w-24" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative">
              <Skeleton className="w-full h-60 md:h-96 rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/20" />
                <Skeleton className="h-3 w-full bg-white/20" />
                <Skeleton className="h-3 w-5/6 bg-white/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4">
          <Skeleton className="h-10 w-32 rounded-full block sm:hidden" />
        </div>
      </div>
    </section>
  );
}

// Volunteer Banner Skeleton
export function VolunteerBannerSkeleton() {
  return (
    <section className="w-full my-20 flex justify-center items-center py-0 px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
      <div className="relative w-full h-64 md:h-[429px] rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-2xl" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 gap-4">
          <Skeleton className="h-8 md:h-10 w-[80%] max-w-2xl bg-white/20" />
          <Skeleton className="h-8 md:h-10 w-[60%] max-w-xl bg-white/20" />

          {/* Buttons */}
          <div className="mt-2 flex items-center gap-4">
            <Skeleton className="h-10 md:h-11 w-40 md:w-48 rounded-full bg-white/20" />
            <Skeleton className="h-10 md:h-11 w-28 md:w-32 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Combined Landing Page Skeleton
export default function LandingPageSkeleton() {
  return (
    <div className="flex w-full relative flex-col mx-auto items-center">
      <HeroSkeleton />
      <AboutSkeleton />
      <StatisticsSkeleton />
      <ProgramAreasSkeleton />
      <SupportersSkeleton />
      <AchievementsSkeleton />
      <NewsEventsSkeleton />
      <VolunteerBannerSkeleton />
    </div>
  );
}
