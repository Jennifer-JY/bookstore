import { CategoryBadge } from "@/components/homepage/CategoryBadge";

export default function Home() {
  return (
    <div className="mb-5 sm:mb-20 p-4 flex flex-row items-center justify-center gap-x-28 mt-24">
      <CategoryBadge
        src="/alien-2-svgrepo-com.svg"
        label="Fiction"
        link="/books?query=fiction"
      />
      <CategoryBadge
        src="/book-and-people-spring-svgrepo-com.svg"
        label="Non-fiction"
        link="/books?query=non-fiction"
      />
      <CategoryBadge
        src="/books-book-svgrepo-com.svg"
        label="Shop All"
        link="/books"
      />
    </div>
  );
}
