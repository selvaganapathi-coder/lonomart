import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Card, Tag, Typography } from "antd";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getStarterTemplate } from "@/lib/templates/catalog";

export default async function WebsiteSetupPage({
  params,
}: {
  params: Promise<{ websiteId: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { websiteId } = await params;
  const website = await prisma.website.findFirst({
    where: {
      id: websiteId,
      userId: session.user.id,
    },
  });

  if (!website) {
    notFound();
  }

  const template = getStarterTemplate(website.templateKey);
  const profile = website.businessProfile as {
    businessName?: string;
    category?: string;
    description?: string;
  };

  return (
    <main className="min-h-screen bg-[#f8fafd] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white no-underline">L</Link>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{website.name}</div>
              <div className="text-[11px] text-slate-500">Website workspace</div>
            </div>
          </div>
          <Tag className="!m-0 rounded-full !border-slate-200 !bg-white !px-3 !py-1 !text-xs !text-slate-600">Draft</Tag>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[920px] px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-7">
          <Typography.Text className="!text-sm !font-medium !text-[#1a73e8]">Website created</Typography.Text>
          <Typography.Title level={1} className="!mb-2 !mt-1 !text-3xl !font-normal !tracking-tight sm:!text-4xl">
            {website.name} is ready for the next step
          </Typography.Title>
          <Typography.Paragraph type="secondary" className="!mb-0 !max-w-2xl !text-base !leading-6">
            Your website project is safely stored as a draft. The next Lonomart task will add the actual template rendering and editor experience.
          </Typography.Paragraph>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card bordered={false} className="!rounded-2xl !shadow-none ring-1 ring-slate-200">
            <Typography.Text type="secondary" className="!text-xs">Business</Typography.Text>
            <Typography.Title level={3} className="!mb-1 !mt-2 !text-xl !font-medium">{profile.businessName}</Typography.Title>
            <Typography.Paragraph type="secondary" className="!mb-0 !text-sm">{profile.category}</Typography.Paragraph>
          </Card>

          <Card bordered={false} className="!rounded-2xl !shadow-none ring-1 ring-slate-200">
            <Typography.Text type="secondary" className="!text-xs">Starting point</Typography.Text>
            <Typography.Title level={3} className="!mb-1 !mt-2 !text-xl !font-medium">{template?.name ?? website.templateKey}</Typography.Title>
            <Typography.Paragraph type="secondary" className="!mb-0 !text-sm">Template version {website.templateVersion}</Typography.Paragraph>
          </Card>
        </div>

        <Card bordered={false} className="!mt-4 !rounded-2xl !shadow-none ring-1 ring-slate-200">
          <Typography.Title level={3} className="!mb-2 !mt-0 !text-lg !font-medium">Business description</Typography.Title>
          <Typography.Paragraph className="!mb-0 !text-sm !leading-6">{profile.description}</Typography.Paragraph>
        </Card>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1a73e8] px-6 text-sm font-medium text-white no-underline hover:bg-[#1765cc]">
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
