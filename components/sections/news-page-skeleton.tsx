import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent } from "~/components/ui/Card";

// Header Section Skeleton
export function NewsHeaderSkeleton() {
  return (
    <div className="flex items-center justify-center gap-8 px-4 py-12">
      <Skeleton className="w-[71px] h-[73px]" />
      <Skeleton className="h-20 md:h-24 w-[400px] md:w-[600px]" />
    </div>
  );
}

// Subtitle Section Skeleton
export function NewsSubtitleSkeleton() {
  return (
    <div className="flex justify-center px-4 mb-12">
      <div className="flex flex-col w-full max-w-[1595px] h-[104px] items-center justify-center gap-[65px] px-0 py-[88px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
        <Skeleton className="h-8 w-[80%] max-w-[905px]" />
      </div>
    </div>
  );
}

// News Events Section Skeleton (Featured section with 3 columns)
export function NewsEventsSectionSkeleton() {
  return (
    <section className="w-full flex justify-center py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 lg:py-[88px] lg:px-[65px]">
      <Card className="w-full max-w-full md:max-w-[1595px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-[65px]">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-[61px] items-start">
            {/* Events Section Skeleton */}
            <div className="flex flex-col items-center gap-5 flex-1">
              <div className="flex flex-col items-start gap-2.5 w-full">
                <Skeleton className="h-8 w-32" />

                <div className="flex flex-col gap-2.5 w-full">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex flex-col gap-2.5">
                      <Skeleton className="w-full max-w-[248px] h-[138px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full max-w-[248px]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Article Section Skeleton */}
            <div className="flex flex-col w-full lg:w-[656px] gap-[13px]">
              <Skeleton className="w-full h-[200px] sm:h-[250px] lg:h-[305px] rounded-2xl" />
              <div className="flex flex-col gap-[13px] px-2.5 py-0 pt-[13px]">
                <Skeleton className="h-8 md:h-10 w-full" />
                <Skeleton className="h-5 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
              </div>
            </div>

            {/* Recent News Section Skeleton */}
            <div className="flex flex-col gap-[26px] flex-1">
              <Skeleton className="h-8 w-48" />

              <div className="flex flex-col gap-0">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 py-2.5 border-b border-[#a19e9d]"
                  >
                    <Skeleton className="w-[80px] h-[70px] sm:w-[100px] sm:h-[85px] lg:w-[113px] lg:h-[97px] rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2 pt-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// Main Content Section Skeleton (Grid of news cards)
export function MainContentSectionSkeleton() {
  return (
    <section className="flex flex-col w-full max-w-[1590px] mx-auto items-start gap-11 relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Card
            key={item}
            className="w-full bg-white rounded-xl shadow-sm border-0 overflow-hidden"
          >
            <CardContent className="flex flex-col p-0">
              <Skeleton className="w-full h-[200px] rounded-t-xl" />

              <div className="p-5 flex flex-col gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-[90%]" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[70%]" />
                </div>

                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Combined News Page Skeleton
export default function NewsPageSkeleton() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <main className="relative">
        <NewsHeaderSkeleton />
        <NewsSubtitleSkeleton />
        <NewsEventsSectionSkeleton />
        <MainContentSectionSkeleton />
      </main>
    </div>
  );
}
