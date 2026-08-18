import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AssetLibrary } from "./asset-library";

export default async function WebsiteAssetsPage({ params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { websiteId } = await params;
  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId: session.user.id },
    select: { id: true, name: true },
  });
  if (!website) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={`/dashboard/websites/${website.id}/edit`} className="text-sm font-medium text-slate-500 no-underline hover:text-slate-950">← Editor</Link>
            <span className="h-5 w-px bg-slate-200" />
            <span className="truncate text-sm font-semibold">{website.name}</span>
          </div>
          <Link href={`/dashboard/websites/${website.id}/preview`} className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 no-underline shadow-sm hover:bg-slate-50">Preview</Link>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-7">
          <p className="text-sm font-medium text-blue-600">Website assets</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Asset library</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Upload and manage the images used by this website. Files are isolated to this website and stored in Cloudflare R2.</p>
        </div>
        <AssetLibrary websiteId={website.id} />
      </div>
    </main>
  );
}
