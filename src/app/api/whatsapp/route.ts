import { NextResponse } from "next/server";
import { business } from "@/lib/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message") || business.whatsapp.message;
  const number = business.whatsapp.number.replace(/\D/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return NextResponse.redirect(url, 302);
}
