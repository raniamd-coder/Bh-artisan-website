import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addCalendarEvent, deleteCalendarEvent } from "@/lib/calendar";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { action } = await req.json(); // "confirmer" | "annuler"

  if (!["confirmer", "annuler"].includes(action)) {
    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  }

  const status = action === "confirmer" ? "confirmé" : "annulé";

  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  // Calendrier : créer si confirmé, supprimer si annulé
  if (action === "confirmer") {
    const eventId = await addCalendarEvent({
      summary: `RDV — ${booking.name} (${booking.workType})`,
      description: `Téléphone : ${booking.phone}\nEmail : ${booking.email}${booking.message ? `\n\n${booking.message}` : ""}`,
      date: booking.date,
    }).catch((err) => { console.error("[calendar]", err); return null; });

    if (eventId) {
      await prisma.booking.update({ where: { id }, data: { calendarEventId: eventId } });
    }
  } else if (action === "annuler" && booking.calendarEventId) {
    await deleteCalendarEvent(booking.calendarEventId);
    await prisma.booking.update({ where: { id }, data: { calendarEventId: null } });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://bandarhamoud.com";

  // Email au client
  const emailHtml =
    action === "confirmer"
      ? `
        <div style="font-family:sans-serif;max-width:520px;margin:auto">
          <h2 style="color:#2563eb">✅ Votre rendez-vous est confirmé !</h2>
          <p>Bonjour <strong>${booking.name}</strong>,</p>
          <p>Nous avons bien confirmé votre demande de rendez-vous. Voici le récapitulatif :</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#666;width:140px">Date souhaitée</td><td style="padding:8px;font-weight:600">${booking.date}</td></tr>
            <tr style="background:#f9fafb"><td style="padding:8px;color:#666">Type de travaux</td><td style="padding:8px;font-weight:600">${booking.workType}</td></tr>
          </table>
          <p>Nous vous contacterons prochainement pour finaliser les détails.</p>
          <div style="margin:24px 0;display:flex;gap:12px">
            <a href="${baseUrl}/booking/${booking.clientToken}?action=modifier" style="background:#2563eb;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px">📅 Modifier ma date</a>
            <a href="${baseUrl}/booking/${booking.clientToken}?action=annuler" style="background:#dc2626;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px">❌ Annuler mon RDV</a>
          </div>
          <p style="color:#666;font-size:13px">— L'équipe BH Artisan</p>
        </div>`
      : `
        <div style="font-family:sans-serif;max-width:520px;margin:auto">
          <h2 style="color:#dc2626">❌ Votre rendez-vous a été annulé</h2>
          <p>Bonjour <strong>${booking.name}</strong>,</p>
          <p>Nous avons le regret de vous informer que votre demande de rendez-vous du <strong>${booking.date}</strong> a été annulée.</p>
          <p>N'hésitez pas à nous recontacter pour fixer une nouvelle date.</p>
          <p style="color:#666;font-size:13px">— L'équipe BH Artisan</p>
        </div>`;

  await resend.emails
    .send({
      from: "BH Artisan <contact@bandarhamoud.com>",
      to: booking.email,
      subject:
        action === "confirmer"
          ? "✅ Votre rendez-vous est confirmé — BH Artisan"
          : "❌ Votre rendez-vous a été annulé — BH Artisan",
      html: emailHtml,
    })
    .catch((err) => console.error("[email client]", err));

  return NextResponse.json({ success: true, status });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (booking?.calendarEventId) {
    await deleteCalendarEvent(booking.calendarEventId);
  }
  await prisma.booking.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
