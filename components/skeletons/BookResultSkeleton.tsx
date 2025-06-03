const emptyBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async function ResultSeleton() {
  return (
    <div>
      <h2 className="text-2xl mb-2">Results:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {emptyBooks.map((b) => {
          return (
            <div
              key={`empty-books-${b}`}
              className="w-30 h-50 border border-gray-400"
            ></div>
          );
        })}
      </div>
    </div>
  );
}
