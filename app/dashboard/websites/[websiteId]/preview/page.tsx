import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { WebsiteRenderer } from "@/lib/website-renderer/website-renderer";
import type { JsonObject, RenderableWebsite } from "@/lib/website-renderer/types";

export default async function WebsitePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ websiteId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { websiteId } = await params;
  const { page } = await searchParams;
  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId: session.user.id },
    include: {
      pages: {
        orderBy: { sortOrder: "asc" },
        include: { sections: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!website) notFound();

  const renderableWebsite: RenderableWebsite = {
    id: website.id,
    name: website.name,
    slug: website.slug,
    templateKey: website.templateKey,
    templateVersion: website.templateVersion,
    businessProfile: website.businessProfile as unknown as JsonObject,
    pages: website.pages.map((websitePage) => ({
      id: websitePage.id,
      slug: websitePage.slug,
      title: websitePage.title,
      description: websitePage.description,
      sortOrder: websitePage.sortOrder,
      isHome: websitePage.isHome,
      sections: websitePage.sections.map((section) => ({
        id: section.id,
        type: section.type,
        version: section.version,
        sortOrder: section.sortOrder,
        visible: section.visible,
        content: section.content as unknown as JsonObject,
      })),
    })),
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={`/dashboard/websites/${website.id}/setup`} className="text-sm font-medium text-slate-600 no-underline hover:text-slate-950">← Back</Link>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="truncate text-sm font-semibold text-slate-900">{website.name}</span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">Draft preview</span>
          </div>
          <span className="hidden text-xs text-slate-500 sm:block">Template v{website.templateVersion}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] p-3 sm:p-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <WebsiteRenderer website={renderableWebsite} pageSlug={page} />
        </div>
      </div>
    </main>
  );
}
