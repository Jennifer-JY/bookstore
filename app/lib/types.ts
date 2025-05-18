export type Book = {
  id: string;
  title: string;
  author: string;
  genre: "fiction" | "non-fiction";
  stock: number;
  price: number;
  strip_product_id: string;
  strip_price_id: string;
};

export type BookDetail = {
  id: string;
  book_id: string;
  published_date: Date;
  introduction: string;
};

export type BookData = {
  title: string;
  author: string;
  genre: "fiction" | "non-fiction";
  stock: number;
  price: number;
  strip_price_id: string;
  published_date: Date;
  introduction: string;
};

export type ItemInCart = {
  book_id: string;
  title: string;
  author: string;
  quantity: number;
  price: number;
  strip_price_id: string;
};
