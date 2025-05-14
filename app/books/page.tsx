import Result from "@/components/books/Results";
import SideNav from "@/components/books/SideNav";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; currentPage?: string }>;
}) {
  const { query, currentPage } = await searchParams;
  return (
    <div className="border-t-1 border-gray-200 shadow-sm lg:flex lg:flex-row lg:h-full">
      <div className="flex-1">
        <SideNav />
      </div>
      <div className="flex-[4]">
        <h2>Results</h2>
        <Result query={query} currentPage={currentPage} />
      </div>
    </div>
  );
}
