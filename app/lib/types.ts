export type Book = {
  id: string;
  title: string;
  author: string;
  genre: "fiction" | "non-fiction";
  stock: number;
  price: number;
  stripe_product_id: string;
  stripe_price_id: string;
};

export type BookDetail = {
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
  stripe_price_id: string;
  published_date: Date;
  introduction: string;
};

export type ItemInCart = {
  book_id: string;
  title: string;
  author: string;
  quantity: number;
  price: number;
};

export type User = {
  email: string;
  password: string;
};

export type UserCart = {
  email: string;
  status: "paid" | "unpaid";
  create_date: Date;
  stripe_session_id?: string;
};

export type CartDetail = {
  cart_id: string;
  book_id: string;
  quantity: number;
};

export type Cart = {
  cartId?: string;
  itemsInCart?: ItemInCart[];
};

export type UserDeliveryInfo = {
  email: string;
  name: string;
  address: string;
  postcode: number;
  phone: string;
};

export type CheckoutInfo = {
  formData: FormData;
  lineItems: string;
  cardId: string;
  email: string;
};

export type StripeLineItemts = {
  price: string; // stripe_price_id
  quantity: number;
};

export type PastOrder = {
  cartId: string;
  createDate: Date;
  items: PastOrderDisplay[];
  totalPrice: number;
};

export type PastOrderDisplay = {
  quantity: number;
  price: number;
  author: string;
  bookId: string;
  title: string;
};
