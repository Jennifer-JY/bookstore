import { createGuestUser } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await createGuestUser();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
