import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Card, Tag } from "antd";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getStarterTemplate } from "@/lib/templates/catalog";
import { TypographyParagraph, TypographyText, TypographyTitle } from "@/app/components/antd-typography";

export default async function WebsiteSetupPage({ params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { websiteId } = await params;
  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId: session.user.id },
    include: {
      pages: {
        orderBy: { sortOrder: "asc" },
        include: {
          sections: {
            orderBy: { sortOrder: "asc" },
            select: { id: true, type: true, version: true, visible: true },
          },
        },
      },
    },
  });
  if (!website) notFound();

  const template = getStarterTemplate(website.templateKey);
  const profile = website.businessProfile as { businessName?: string; category?: string; description?: string };

  return (
    <main className="min-h-screen bg-[#f8fafd] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white no-underline">L</Link>
            <div className="leading-tight"><div className="text-sm font-semibold tracking-tight">{website.name}</div><div className="text-[11px] text-slate-500">Website workspace</div></div>
          </div>
          <Tag className="!m-0 rounded-full !border-slate-200 !bg-white !px-3 !py-1 !text-xs !text-slate-600">Draft</Tag>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[920px] px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-7">
          <TypographyText className="!text-sm !font-medium !text-[#1a73e8]">Website structure ready</TypographyText>
          <TypographyTitle level={1} className="!mb-2 !mt-1 !text-3xl !font-normal !tracking-tight sm:!text-4xl">{website.name} has a versioned starting structure</TypographyTitle>
          <TypographyParagraph type="secondary" className="!mb-0 !max-w-2xl !text-base !leading-6">The selected template has been instantiated into pages and structured sections. The editor will modify this data in a later task.</TypographyParagraph>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card bordered={false} className="!rounded-2xl !shadow-none ring-1 ring-slate-200">
            <TypographyText type="secondary" className="!text-xs">Business</TypographyText>
            <TypographyTitle level={3} className="!mb-1 !mt-2 !text-xl !font-medium">{profile.businessName}</TypographyTitle>
            <TypographyParagraph type="secondary" className="!mb-0 !text-sm">{profile.category}</TypographyParagraph>
          </Card>
          <Card bordered={false} className="!rounded-2xl !shadow-none ring-1 ring-slate-200">
            <TypographyText type="secondary" className="!text-xs">Template</TypographyText>
            <TypographyTitle level={3} className="!mb-1 !mt-2 !text-xl !font-medium">{template?.name ?? website.templateKey}</TypographyTitle>
            <TypographyParagraph type="secondary" className="!mb-0 !text-sm">Version {website.templateVersion} · {website.pages.length} pages</TypographyParagraph>
          </Card>
        </div>

        <Card bordered={false} className="!mt-4 !rounded-2xl !shadow-none ring-1 ring-slate-200">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <TypographyTitle level={3} className="!mb-1 !mt-0 !text-lg !font-medium">Page structure</TypographyTitle>
              <TypographyParagraph type="secondary" className="!mb-0 !text-sm">Pages and sections are stored as independent structured records.</TypographyParagraph>
            </div>
            <TypographyText type="secondary" className="text-xs">{website.pages.reduce((count, page) => count + page.sections.length, 0)} sections</TypographyText>
          </div>

          <div className="divide-y divide-slate-100">
            {website.pages.map((page) => (
              <div key={page.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <TypographyText className="!font-medium">{page.title}</TypographyText>
                      {page.isHome && <Tag className="!m-0 !rounded-full !border-[#d2e3fc] !bg-[#e8f0fe] !text-[10px] !text-[#174ea6]">Home</Tag>}
                    </div>
                    <TypographyText type="secondary" className="text-xs">/{page.slug}</TypographyText>
                  </div>
                  <TypographyText type="secondary" className="shrink-0 text-xs">{page.sections.length} sections</TypographyText>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.sections.map((section) => (
                    <span key={section.id} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                      {section.type} · v{section.version}{!section.visible ? " · hidden" : ""}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card bordered={false} className="!mt-4 !rounded-2xl !shadow-none ring-1 ring-slate-200">
          <TypographyTitle level={3} className="!mb-2 !mt-0 !text-lg !font-medium">Business description</TypographyTitle>
          <TypographyParagraph className="!mb-0 !text-sm !leading-6">{profile.description}</TypographyParagraph>
        </Card>

        <div className="mt-6"><Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1a73e8] px-6 text-sm font-medium text-white no-underline hover:bg-[#1765cc]">Back to dashboard</Link></div>
      </div>
    </main>
  );
}
