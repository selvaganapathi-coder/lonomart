import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(_request: Request, { params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId } = await params;

  try {
    const publication = await prisma.$transaction(async (tx) => {
      const website = await tx.website.findFirst({
        where: { id: websiteId, userId: session.user.id },
        include: {
          pages: {
            orderBy: { sortOrder: "asc" },
            include: { sections: { orderBy: { sortOrder: "asc" } } },
          },
        },
      });
      if (!website) return null;

      const existing = await tx.websitePublication.findUnique({ where: { websiteId } });
      const version = existing ? existing.version + 1 : 1;
      const snapshot = {
        website: {
          id: website.id,
          name: website.name,
          slug: website.slug,
          templateKey: website.templateKey,
          templateVersion: website.templateVersion,
          businessProfile: website.businessProfile,
        },
        pages: website.pages.map((page) => ({
          id: page.id,
          slug: page.slug,
          title: page.title,
          description: page.description,
          sortOrder: page.sortOrder,
          isHome: page.isHome,
          sections: page.sections.map((section) => ({
            id: section.id,
            type: section.type,
            version: section.version,
            sortOrder: section.sortOrder,
            visible: section.visible,
            content: section.content,
            revision: section.revision,
          })),
        })),
      } as Prisma.InputJsonValue;

      const result = await tx.websitePublication.upsert({
        where: { websiteId },
        create: { websiteId, version, publishedDraftRevision: website.draftRevision, snapshot },
        update: { version, publishedDraftRevision: website.draftRevision, snapshot, publishedAt: new Date() },
        select: { version: true, publishedDraftRevision: true, publishedAt: true },
      });

      await tx.website.update({ where: { id: websiteId }, data: { status: "PUBLISHED" } });
      return result;
    });

    if (!publication) return NextResponse.json({ error: "Website not found" }, { status: 404 });
    return NextResponse.json({ ok: true, publication });
  } catch (error) {
    console.error("Website publish failed", error);
    return NextResponse.json({ error: "Unable to publish website" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId } = await params;
  const result = await prisma.$transaction(async (tx) => {
    const website = await tx.website.findFirst({ where: { id: websiteId, userId: session.user.id }, select: { id: true } });
    if (!website) return false;
    await tx.websitePublication.deleteMany({ where: { websiteId } });
    await tx.website.update({ where: { id: websiteId }, data: { status: "DRAFT" } });
    return true;
  });

  if (!result) return NextResponse.json({ error: "Website not found" }, { status: 404 });
  return NextResponse.json({ ok: true, status: "DRAFT" });
}
