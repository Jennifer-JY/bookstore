const emptyBooks = Array.from({ length: 10 });

export default async function ResultSkeleton() {
  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Results:</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {emptyBooks.map((_, i) => (
          <div key={`empty-book-${i}`} className="space-y-2">
            {/* Cover placeholder */}
            <div className="aspect-[2/3] w-full rounded-xl bg-gray-200 animate-pulse dark:bg-gray-300" />

            {/* Text lines placeholder */}
            <div className="h-3 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-300" />
            <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse dark:bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
