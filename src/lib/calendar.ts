import { google } from "googleapis";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function addCalendarEvent({
  summary,
  description,
  date,
}: {
  summary: string;
  description: string;
  date: string; // format YYYY-MM-DD
}) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return;

  let credentials: { client_email: string; private_key: string };

  // Vercel : lire depuis variable d'environnement
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else {
    // Local / Docker : lire depuis fichier
    const keyPath = join(process.cwd(), "google-service-account.json");
    if (!existsSync(keyPath)) {
      console.error("[calendar] Credentials introuvables");
      return;
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      start: { date }, // all-day event
      end: { date },
    },
  });
}
