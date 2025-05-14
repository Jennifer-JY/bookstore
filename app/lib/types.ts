export type Book = {
  id: string;
  title: string;
  author: string;
  genre: "fiction" | "non-fiction";
  stock: number;
  price: number;
};

export type BookDetail = {
  id: string;
  book_id: string;
  published_date: Date;
  introduction: string;
};
