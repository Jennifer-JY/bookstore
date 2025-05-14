export type Books = {
  id: string;
  title: string;
  author: string;
  genre: "fiction" | "non-fiction";
  stock: number;
  price: number;
};

export type BookDetails = {
  id: string;
  book_id: string;
  published_date: Date;
  introduction: string;
};
