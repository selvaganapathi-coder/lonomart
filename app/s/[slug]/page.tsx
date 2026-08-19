import type { Metadata } from "next";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { WebsiteRenderer } from "@/lib/website-renderer/website-renderer";
import type { JsonObject, RenderableWebsite } from "@/lib/website-renderer/types";

async function getPublishedWebsite(slug: string) {
  return prisma.websitePublication.findFirst({
    where: { website: { slug, status: "PUBLISHED" } },
    include: { website: { select: { id: true, name: true, slug: true, templateKey: true, templateVersion: true } } },
  });
}

function snapshotToWebsite(publication: NonNullable<Awaited<ReturnType<typeof getPublishedWebsite>>>): RenderableWebsite {
  const snapshot = publication.snapshot as unknown as JsonObject;
  return snapshot as unknown as RenderableWebsite;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublishedWebsite(slug);
  if (!publication) return {};

  const website = snapshotToWebsite(publication);
  const homePage = website.pages.find((page) => page.isHome) ?? website.pages[0];
  return {
    title: homePage?.title ? `${homePage.title} | ${website.name}` : website.name,
    description: homePage?.description ?? undefined,
  };
}

export default async function PublishedWebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = await getPublishedWebsite(slug);
  if (!publication) notFound();

  const website = snapshotToWebsite(publication);
  return <WebsiteRenderer website={website} />;
}
