import Image from "next/image";
import Card from "~/components/ui/Card";

export default function NewsCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-40">
        <Image src="/images/news.jpg" alt="News" fill className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500">Sep 12, 2025</p>
        <h4 className="mt-1 font-semibold">Program update headline goes here</h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          Short description of the event or news article showing two lines at most.
        </p>
      </div>
    </Card>
  );
}