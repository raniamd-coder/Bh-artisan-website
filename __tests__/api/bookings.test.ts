/** @jest-environment node */

// Tests unitaires — API /api/bookings
// On mock Prisma et Resend pour ne pas toucher la vraie BDD

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    booking: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

// Mock Resend
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: "mock-email-id" }),
    },
  })),
}));

import { NextRequest } from "next/server";
import { POST, GET } from "@/app/api/bookings/route";
import { prisma } from "@/lib/prisma";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

function makeRequest(body: object): NextRequest {
  return new NextRequest("http://localhost/api/bookings", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/bookings", () => {
  beforeEach(() => jest.clearAllMocks());

  it("retourne 400 si champs obligatoires manquants", async () => {
    const req = makeRequest({ name: "Alice" }); // manque email, phone, date, workType
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Champs obligatoires manquants");
  });

  it("crée une réservation et retourne 200", async () => {
    (mockPrisma.booking.create as jest.Mock).mockResolvedValue({ id: 1 });

    const req = makeRequest({
      name: "Alice Dupont",
      email: "alice@example.com",
      phone: "0612345678",
      date: "2026-07-01",
      workType: "Peinture",
      message: "Bonjour",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.id).toBe(1);
    expect(mockPrisma.booking.create).toHaveBeenCalledTimes(1);
  });

  it("retourne 500 en cas d'erreur Prisma", async () => {
    (mockPrisma.booking.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const req = makeRequest({
      name: "Bob",
      email: "bob@example.com",
      phone: "0600000000",
      date: "2026-07-01",
      workType: "Plâtrerie",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/bookings", () => {
  it("retourne la liste des réservations", async () => {
    const mockBookings = [
      { id: 1, name: "Alice", email: "alice@example.com", status: "en_attente" },
    ];
    (mockPrisma.booking.findMany as jest.Mock).mockResolvedValue(mockBookings);

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveLength(1);
    expect(json[0].name).toBe("Alice");
  });
});
