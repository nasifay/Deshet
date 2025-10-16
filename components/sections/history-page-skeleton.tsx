import { Skeleton } from "~/components/ui/skeleton";

export function HistoryPageSkeleton() {
  return (
    <div className="bg-white w-full relative flex flex-col pb-12 pb:mb-20 pb:mb-40">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36">
        {/* Title Skeleton */}
        <Skeleton className="h-12 md:h-16 lg:h-20 w-64 md:w-80 lg:w-96" />

        {/* Subtitle Skeleton */}
        <div className="w-full flex flex-col items-center gap-3">
          <Skeleton className="h-6 md:h-8 lg:h-10 w-full max-w-4xl" />
          <Skeleton className="h-6 md:h-8 lg:h-10 w-full max-w-3xl" />
        </div>

        {/* Hero Image Skeleton */}
        <Skeleton className="w-full h-64 md:h-96 lg:h-[500px]" />

        {/* Content Paragraphs Skeleton */}
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-5 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-5 md:h-7 lg:h-8 w-5/6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-5 md:h-7 lg:h-8 w-4/5" />
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <div className="mt-6 sm:mt-14 lg:mt-24 inline-flex flex-col items-center justify-center gap-[50px] w-full px-2 md:px-6 lg:px-20 mb-8 md:mb-20">
        {/* Milestones Title Skeleton */}
        <Skeleton className="h-10 md:h-14 lg:h-24 w-72 md:w-96 lg:w-[500px]" />

        {/* Milestones Image Skeleton */}
        <Skeleton className="w-full h-[40vh] md:h-96 lg:h-[500px]" />
      </div>

      {/* 2025 - TODAY Section */}
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36 mb-6 md:mb-20">
        <div className="flex flex-col items-start justify-center gap-4 md:gap-7 w-full md:px-6">
          {/* Year Title Skeleton */}
          <Skeleton className="h-8 md:h-12 lg:h-16 w-64 md:w-80 lg:w-96" />

          {/* Description Skeleton */}
          <div className="w-full space-y-2">
            <Skeleton className="h-5 md:h-7 lg:h-9 w-full" />
            <Skeleton className="h-5 md:h-7 lg:h-9 w-5/6" />
          </div>
        </div>
      </section>

      {/* Blockquote Section */}
      <div className="w-full px-6 md:px-20 lg:px-36 flex flex-col items-center gap-3">
        <Skeleton className="h-5 md:h-8 lg:h-10 w-full max-w-5xl" />
        <Skeleton className="h-5 md:h-8 lg:h-10 w-full max-w-4xl" />
        <Skeleton className="h-5 md:h-8 lg:h-10 w-full max-w-5xl" />
      </div>
    </div>
  );
}
