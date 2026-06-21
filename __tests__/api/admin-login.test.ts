/** @jest-environment node */

// Tests unitaires — API /api/admin/login

// Mock jose pour éviter les problèmes ESM
jest.mock("jose", () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mock.jwt.token"),
  })),
}));

import { NextRequest } from "next/server";
import { POST } from "@/app/api/admin/login/route";

// On fixe ADMIN_PASSWORD pour les tests
process.env.ADMIN_PASSWORD = "testpassword123";

function makeRequest(body: object): NextRequest {
  return new NextRequest("http://localhost/api/admin/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/admin/login", () => {
  it("retourne 401 si mot de passe incorrect", async () => {
    const req = makeRequest({ password: "mauvais_mdp" });
    const res = await POST(req);
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Mot de passe incorrect");
  });

  it("retourne 200 et set le cookie si mot de passe correct", async () => {
    const req = makeRequest({ password: "testpassword123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    // Vérifier que le cookie admin_token est défini
    const cookieHeader = res.headers.get("set-cookie");
    expect(cookieHeader).toContain("admin_token");
    expect(cookieHeader).toContain("HttpOnly");
  });
});
