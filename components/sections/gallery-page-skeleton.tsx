import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent } from "~/components/ui/Card";

// Gallery Header Skeleton
export function GalleryHeaderSkeleton() {
  return (
    <section className="relative w-full flex flex-col items-center pt-12 sm:pt-[104px] pb-0">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Skeleton className="w-12 sm:w-[71px] h-12 sm:h-[73px]" />
        <Skeleton className="h-12 sm:h-24 w-[200px] sm:w-[400px] mb-6" />
      </div>
    </section>
  );
}

// Gallery Description Skeleton
export function GalleryDescriptionSkeleton() {
  return (
    <section className="relative w-full">
      <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-6 sm:gap-10 relative px-4">
        <Card className="w-full bg-white border-0 rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
          <CardContent className="flex flex-col items-center justify-center gap-8 sm:gap-[65px] px-0 py-2 md:py-12 lg:py-20">
            <div className="max-w-full sm:max-w-[805px] space-y-2">
              <Skeleton className="h-6 sm:h-8 w-full" />
              <Skeleton className="h-6 sm:h-8 w-[90%]" />
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}

// Gallery Category Skeleton
export function GalleryCategorySkeleton() {
  return (
    <article className="flex flex-col items-center gap-8 sm:gap-[55px] relative w-full">
      <Card className="w-full border-0 rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] bg-white relative overflow-hidden">
        <CardContent className="flex flex-col items-start justify-center gap-8 sm:gap-[65px] px-6 sm:px-[65px] py-12 sm:py-[88px] relative">
          <div className="inline-flex flex-col items-start justify-center gap-6 sm:gap-[54px]">
            <div className="inline-flex items-center gap-2 sm:gap-[15px]">
              <Skeleton className="h-8 sm:h-12 w-48 sm:w-64" />
            </div>

            <Skeleton className="w-full max-w-[1456px] h-64 sm:h-80 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

// Recognition Section Skeleton
export function RecognitionSectionSkeleton() {
  return (
    <article className="flex flex-col items-center gap-8 sm:gap-[55px] relative w-full">
      <Card className="w-full bg-white border-0 rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] relative overflow-hidden">
        <CardContent className="flex flex-col items-start justify-center gap-8 sm:gap-[65px] px-6 sm:px-[65px] py-12 sm:py-[88px] relative">
          <div className="inline-flex flex-col items-start justify-center gap-2 sm:gap-[15px]">
            <div className="inline-flex items-center gap-2 sm:gap-[15px]">
              <Skeleton className="h-8 sm:h-12 w-40 sm:w-48" />
            </div>

            <div className="flex flex-col w-full max-w-[1445px] items-start gap-6 sm:gap-[55px]">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-[63px] w-full">
                <Skeleton className="w-full sm:w-[314px] h-64 sm:h-80 rounded-lg" />
                <Skeleton className="w-full sm:w-[314px] h-64 sm:h-80 rounded-lg" />
                <Skeleton className="w-full sm:w-[703px] h-64 sm:h-80 rounded-[31px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

// Combined Gallery Page Skeleton
export default function GalleryPageSkeleton() {
  return (
    <main className="relative">
      <GalleryHeaderSkeleton />
      <GalleryDescriptionSkeleton />
      <section className="relative w-full">
        <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-6 sm:gap-10 relative px-4">
          {/* Render 5 gallery categories */}
          {[1, 2, 3, 4, 5].map((item) => (
            <GalleryCategorySkeleton key={item} />
          ))}
          <RecognitionSectionSkeleton />
        </section>
      </section>
    </main>
  );
}
