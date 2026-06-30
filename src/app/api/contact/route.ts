import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const msg = await prisma.message.create({
      data: { name, email, message },
    });

    // Email notification
    await resend.emails.send({
      from: "BH Artisan <contact@bandarhamoud.com>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Nouveau message — ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br/>${message}</p>
        <hr/>
        <p style="color:#666;font-size:12px">Reçu le ${new Date().toLocaleString("fr-FR")}</p>
      `,
    });

    return NextResponse.json({ success: true, id: msg.id });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("[/api/contact GET]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
