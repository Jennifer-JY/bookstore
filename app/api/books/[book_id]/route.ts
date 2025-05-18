import { getBookById } from "@/app/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ book_id: string }> }
) {
  const { book_id } = await params;
  const book = await getBookById(book_id);
  if (!book) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }
  return Response.json(book);
}
