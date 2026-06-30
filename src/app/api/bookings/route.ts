import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, workType, message } = body;

    if (!name || !email || !phone || !date || !workType) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: { name, email, phone, date, workType, message: message ?? null },
    });

    // Email notification
    await resend.emails.send({
      from: "PSS Bâtiment <contact@bandarhamoud.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Nouvelle réservation — ${name}`,
      html: `
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Date souhaitée :</strong> ${date}</p>
        <p><strong>Type de travaux :</strong> ${workType}</p>
        ${message ? `<p><strong>Message :</strong> ${message}</p>` : ""}
        <hr/>
        <p style="color:#666;font-size:12px">Reçu le ${new Date().toLocaleString("fr-FR")}</p>
      `,
    });

    return NextResponse.json({ success: true, id: booking.id });
  } catch (error) {
    console.error("[/api/bookings]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("[/api/bookings GET]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
