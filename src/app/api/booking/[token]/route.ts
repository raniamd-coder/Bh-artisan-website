import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteCalendarEvent } from "@/lib/calendar";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const booking = await prisma.booking.findUnique({ where: { clientToken: token } });
  if (!booking) return NextResponse.json({ error: "RDV introuvable" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { action, newDate } = await req.json(); // action: "annuler" | "modifier"

  const booking = await prisma.booking.findUnique({ where: { clientToken: token } });
  if (!booking) return NextResponse.json({ error: "RDV introuvable" }, { status: 404 });
  if (booking.status === "annulé") return NextResponse.json({ error: "RDV déjà annulé" }, { status: 400 });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://bandarhamoud.com";

  if (action === "annuler") {
    // Supprimer l'événement Calendar si existant
    if (booking.calendarEventId) await deleteCalendarEvent(booking.calendarEventId);

    await prisma.booking.update({
      where: { clientToken: token },
      data: { status: "annulé", calendarEventId: null },
    });

    // Notifier Bandar
    await resend.emails.send({
      from: "BH Artisan <contact@bandarhamoud.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `❌ RDV annulé par le client — ${booking.name}`,
      html: `<p><strong>${booking.name}</strong> a annulé son rendez-vous du <strong>${booking.date}</strong>.</p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true, action: "annulé" });
  }

  if (action === "modifier" && newDate) {
    // Supprimer l'ancien événement Calendar
    if (booking.calendarEventId) await deleteCalendarEvent(booking.calendarEventId);

    await prisma.booking.update({
      where: { clientToken: token },
      data: { date: newDate, status: "en_attente", calendarEventId: null },
    });

    // Notifier Bandar
    await resend.emails.send({
      from: "BH Artisan <contact@bandarhamoud.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `📅 RDV modifié par le client — ${booking.name}`,
      html: `<p><strong>${booking.name}</strong> a demandé à déplacer son RDV au <strong>${newDate}</strong>.<br/>Connectez-vous à l'admin pour confirmer : <a href="${baseUrl}/admin">${baseUrl}/admin</a></p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true, action: "modifié", newDate });
  }

  return NextResponse.json({ error: "Action invalide" }, { status: 400 });
}
