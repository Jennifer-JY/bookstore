import { sql } from "../lib/data";

async function listbooks() {
  const data = await sql`
    SELECT * FROM books
  `;

  return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    return Response.json(await listbooks());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
