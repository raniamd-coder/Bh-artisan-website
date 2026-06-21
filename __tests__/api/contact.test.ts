/** @jest-environment node */

// Tests unitaires — API /api/contact

jest.mock("@/lib/prisma", () => ({
  prisma: {
    message: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: "mock-email-id" }),
    },
  })),
}));

import { NextRequest } from "next/server";
import { POST, GET } from "@/app/api/contact/route";
import { prisma } from "@/lib/prisma";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

function makeRequest(body: object): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => jest.clearAllMocks());

  it("retourne 400 si name, email ou message manquant", async () => {
    const req = makeRequest({ name: "Alice", email: "alice@example.com" }); // pas de message
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Champs obligatoires manquants");
  });

  it("crée un message et retourne 200", async () => {
    (mockPrisma.message.create as jest.Mock).mockResolvedValue({ id: 42 });

    const req = makeRequest({
      name: "Alice",
      email: "alice@example.com",
      message: "Bonjour, je souhaite un devis.",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.id).toBe(42);
  });

  it("retourne 500 en cas d'erreur Prisma", async () => {
    (mockPrisma.message.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const req = makeRequest({
      name: "Bob",
      email: "bob@example.com",
      message: "Test",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/contact", () => {
  it("retourne la liste des messages", async () => {
    (mockPrisma.message.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: "Alice", email: "a@a.com", message: "Bonjour" },
    ]);

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveLength(1);
  });
});
