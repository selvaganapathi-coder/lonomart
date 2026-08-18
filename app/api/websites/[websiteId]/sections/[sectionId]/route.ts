import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ websiteId: string; sectionId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId, sectionId } = await params;
  const body: unknown = await request.json().catch(() => null);
  if (!isRecord(body) || !isRecord(body.content)) return NextResponse.json({ error: "Invalid content" }, { status: 400 });

  const section = await prisma.websiteSection.findFirst({
    where: { id: sectionId, page: { websiteId, website: { userId: session.user.id } } },
    select: { id: true },
  });
  if (!section) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.websiteSection.update({ where: { id: section.id }, data: { content: body.content } });
  return NextResponse.json({ ok: true });
}
