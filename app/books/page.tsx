import Result from "@/components/books/Results";
import SideNav from "@/components/books/SideNav";
import ResultSeleton from "@/components/skeletons/booksSkeleton";
import { Suspense } from "react";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;

  return (
    <div className="border-t-1 border-gray-200 shadow-sm lg:flex lg:flex-row lg:h-full lg:gap-3">
      <div className="flex-1">
        <SideNav />
      </div>
      <div className="flex-[4]">
        <Suspense fallback={<ResultSeleton />}>
          <Result query={query} page={page} />
        </Suspense>
      </div>
    </div>
  );
}
