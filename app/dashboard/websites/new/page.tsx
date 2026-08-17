import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Typography } from "antd";

import { CreateWebsiteForm } from "@/app/dashboard/websites/new/create-website-form";
import { auth } from "@/lib/auth";
import { starterTemplates } from "@/lib/templates/catalog";

export default async function NewWebsitePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-[#f8fafd] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white no-underline">
              L
            </Link>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900">Create website</div>
              <div className="text-[11px] text-slate-500">Lonomart workspace</div>
            </div>
          </div>
          <Link href="/dashboard" className="text-sm text-slate-500 no-underline hover:text-slate-900">
            Back to dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[920px] px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-7 max-w-2xl">
          <Typography.Text className="!text-sm !font-medium !text-[#1a73e8]">Quick setup</Typography.Text>
          <Typography.Title level={1} className="!mb-2 !mt-1 !text-3xl !font-normal !tracking-tight sm:!text-4xl">
            Create your first website
          </Typography.Title>
          <Typography.Paragraph type="secondary" className="!mb-0 !text-base !leading-6">
            Tell us the essentials, choose a professional starting point, and Lonomart will create your website workspace.
          </Typography.Paragraph>
        </section>

        <CreateWebsiteForm templates={starterTemplates} />
      </div>
    </main>
  );
}
