import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "./AdminDashboard";

export default async function AdminPage() {
  const [bookings, messages] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return <AdminDashboard bookings={bookings} messages={messages} />;
}
