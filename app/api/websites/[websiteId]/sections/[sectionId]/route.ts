import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";

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

  const expectedRevision = body.revision;
  if (typeof expectedRevision !== "number" || !Number.isInteger(expectedRevision) || expectedRevision < 0) {
    return NextResponse.json({ error: "Revision is required" }, { status: 400 });
  }

  const content = body.content as Prisma.InputJsonValue;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const section = await tx.websiteSection.findFirst({
        where: { id: sectionId, revision: expectedRevision, page: { websiteId, website: { userId: session.user.id } } },
        select: { id: true, revision: true },
      });
      if (!section) return null;

      const nextRevision = section.revision + 1;
      await tx.websiteSection.update({ where: { id: section.id }, data: { content, revision: nextRevision } });
      await tx.websiteSectionRevision.create({
        data: { id: crypto.randomUUID(), websiteId, sectionId: section.id, revision: nextRevision, content },
      });
      return nextRevision;
    });

    if (result === null) return NextResponse.json({ error: "Revision conflict", code: "REVISION_CONFLICT" }, { status: 409 });
    return NextResponse.json({ ok: true, revision: result });
  } catch (error) {
    console.error("Section save failed", error);
    return NextResponse.json({ error: "Unable to save section" }, { status: 500 });
  }
}
