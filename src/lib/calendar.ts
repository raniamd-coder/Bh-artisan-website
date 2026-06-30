import { google } from "googleapis";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

async function getCalendarClient() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return null;

  let credentials: { client_email: string; private_key: string };

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else {
    const keyPath = join(process.cwd(), "google-service-account.json");
    if (!existsSync(keyPath)) {
      console.error("[calendar] Credentials introuvables");
      return null;
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return { calendar: google.calendar({ version: "v3", auth }), calendarId };
}

export async function addCalendarEvent({
  summary,
  description,
  date,
}: {
  summary: string;
  description: string;
  date: string;
}): Promise<string | null> {
  const client = await getCalendarClient();
  if (!client) return null;

  const res = await client.calendar.events.insert({
    calendarId: client.calendarId,
    requestBody: {
      summary,
      description,
      start: { date },
      end: { date },
    },
  });

  return res.data.id ?? null;
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const client = await getCalendarClient();
  if (!client) return;

  await client.calendar.events.delete({
    calendarId: client.calendarId,
    eventId,
  }).catch((err) => console.error("[calendar] delete error", err));
}

