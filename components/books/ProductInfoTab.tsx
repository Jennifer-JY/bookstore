import { BookData } from "@/app/lib/types";

export function ProductInfoTab({ bookDetail }: { bookDetail: BookData }) {
  return (
    <section className="mt-9">
      <h4 className="text-3xl mb-6">Introduction</h4>
      {bookDetail.introduction}
    </section>
  );
}
