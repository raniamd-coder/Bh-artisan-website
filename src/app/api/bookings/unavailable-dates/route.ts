import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ["confirmé", "en_attente"] } },
    select: { date: true },
  });

  const dates = bookings.map((b) => b.date);
  return NextResponse.json(dates);
}
