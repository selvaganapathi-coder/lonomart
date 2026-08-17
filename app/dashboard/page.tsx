import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Card, Tag } from "antd";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import {
  TypographyParagraph,
  TypographyText,
  TypographyTitle,
} from "@/app/components/antd-typography";

function Icon({
  name,
}: {
  name: "grid" | "globe" | "arrow" | "spark" | "settings" | "help";
}) {
  const paths = {
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.2 2.4 3.2 5.2 3.2 8.5s-1 6.1-3.2 8.5c-2.2-2.4-3.2-5.2-3.2-8.5S9.8 5.9 12 3.5Z" />
      </>
    ),
    arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
    spark: (
      <>
        <path d="m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.8 1.4-1.8 3.1-2.1-.8a7.7 7.7 0 0 1-1.7 1l-.3 2.2h-3.6l-.3-2.2a7.7 7.7 0 0 1-1.7-1l-2.1.8-1.8-3.1 1.8-1.4.1-.1a8 8 0 0 1 0-2l-.1-.1-1.8-1.4 1.8-3.1 2.1.8a7.7 7.7 0 0 1 1.7-1l.3-2.2h3.6l.3 2.2a7.7 7.7 0 0 1 1.7 1l2.1-.8 1.8 3.1-1.8 1.4-.1.1a8 8 0 0 1 0 2Z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.8 9.4a2.5 2.5 0 1 1 4.2 1.8c-.9.8-2 1.2-2 2.7M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      {paths[name]}
    </svg>
  );
}

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const [websites, publishedCount] = await Promise.all([
    prisma.website.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 12,
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        templateKey: true,
        updatedAt: true,
      },
    }),
    prisma.website.count({
      where: {
        userId: session.user.id,
        status: "PUBLISHED",
      },
    }),
  ]);

  const userName = session.user.name || "there";
  const firstName = userName.split(" ")[0] || "there";
  const userInitials = initials(session.user.name || "User");

  return (
    <main className="min-h-screen flex-1 bg-[#f8fafd] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[232px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white">L</div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight text-slate-900">Lonomart</div>
              <div className="mt-0.5 text-[11px] text-slate-500">Website builder</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-5" aria-label="Dashboard navigation">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Workspace</div>
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-[#e8f0fe] px-3 py-2.5 text-sm font-medium text-[#174ea6] no-underline">
              <Icon name="grid" />
              Overview
            </Link>
            <Link href="/dashboard#websites" className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 no-underline hover:bg-slate-50">
              <Icon name="globe" />
              Websites
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{websites.length}</span>
            </Link>

            <div className="mb-2 mt-7 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Account</div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600">
              <Icon name="settings" />
              Settings
            </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600">
              <Icon name="help" />
              Help & support
            </div>
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] text-xs font-semibold text-[#174ea6]">{userInitials}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-slate-800">{userName}</div>
                <div className="truncate text-[11px] text-slate-500">{session.user.email}</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a73e8] text-xs font-bold text-white">L</div>
                <span className="text-sm font-semibold tracking-tight">Lonomart</span>
              </div>
              <div className="hidden text-sm text-slate-500 lg:block">Overview</div>
              <div className="ml-auto flex items-center gap-3">
                <Tag className="!m-0 hidden rounded-full !border-slate-200 !bg-white !px-3 !py-1 !text-xs !text-slate-600 sm:block">Free plan</Tag>
                <SignOutButton />
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
            <section className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <TypographyText className="!text-sm !font-medium !text-[#1a73e8]">Your workspace</TypographyText>
                <TypographyTitle level={1} className="!mb-2 !mt-1 !text-3xl !font-normal !tracking-tight !text-slate-900 sm:!text-4xl">
                  Welcome, {firstName}
                </TypographyTitle>
                <TypographyParagraph className="!mb-0 !max-w-2xl !text-base !leading-6 !text-slate-600">
                  Everything you need to create, customize and publish your next website.
                </TypographyParagraph>
              </div>
              <Link href="/dashboard/websites/new" className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#1a73e8] px-5 text-sm font-medium text-white no-underline hover:bg-[#1765cc]">
                Create website
              </Link>
            </section>

            <section className="mb-7 grid gap-3 sm:grid-cols-3">
              <Card bordered={false} className="!rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200">
                <div className="px-5 py-4">
                  <TypographyText className="!text-xs !font-medium !text-slate-500">Websites</TypographyText>
                  <div className="mt-2 text-2xl font-normal tracking-tight text-slate-900">{websites.length}</div>
                  <div className="mt-0.5 text-xs text-slate-500">Your website projects</div>
                </div>
              </Card>
              <Card bordered={false} className="!rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200">
                <div className="px-5 py-4">
                  <TypographyText className="!text-xs !font-medium !text-slate-500">Published</TypographyText>
                  <div className="mt-2 text-2xl font-normal tracking-tight text-slate-900">{publishedCount}</div>
                  <div className="mt-0.5 text-xs text-slate-500">Websites currently live</div>
                </div>
              </Card>
              <Card bordered={false} className="!rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200">
                <div className="px-5 py-4">
                  <TypographyText className="!text-xs !font-medium !text-slate-500">Plan</TypographyText>
                  <div className="mt-2 text-2xl font-normal tracking-tight text-slate-900">Free</div>
                  <div className="mt-0.5 text-xs text-slate-500">Your starting plan</div>
                </div>
              </Card>
            </section>

            <section id="websites" aria-labelledby="websites-heading">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <TypographyTitle id="websites-heading" level={2} className="!mb-1 !mt-0 !text-xl !font-medium !tracking-tight !text-slate-900">My Websites</TypographyTitle>
                  <TypographyParagraph type="secondary" className="!mb-0 !text-sm">Manage your websites and publishing status from here.</TypographyParagraph>
                </div>
                {websites.length > 0 ? (
                  <Link href="/dashboard/websites/new" className="text-sm font-medium text-[#1a73e8] no-underline hover:underline">Create another website</Link>
                ) : null}
              </div>

              {websites.length === 0 ? (
                <Card bordered={false} className="!rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200">
                  <div className="grid min-h-[245px] place-items-center px-6 py-8 text-center">
                    <div className="max-w-[430px]">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]"><Icon name="spark" /></div>
                      <TypographyTitle level={3} className="!mb-1.5 !mt-0 !text-xl !font-medium !tracking-tight !text-slate-900">Create your first website</TypographyTitle>
                      <TypographyParagraph type="secondary" className="!mb-4 !text-sm !leading-6">Start with a professional template, add your business details, customize the content and publish when you are ready.</TypographyParagraph>
                      <Link href="/dashboard/websites/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1a73e8] px-5 text-sm font-medium text-white no-underline hover:bg-[#1765cc)">Create website</Link>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {websites.map((website) => (
                    <Link key={website.id} href={`/dashboard/websites/${website.id}/setup`} className="no-underline">
                      <Card bordered={false} className="!h-full !rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-slate-300">
                        <div className="p-5">
                          <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f0fe] text-sm font-semibold text-[#174ea6]">{website.name.slice(0, 1).toUpperCase()}</div>
                            <Tag className="!m-0 rounded-full !border-slate-200 !bg-white !px-2.5 !py-0.5 !text-[10px] !text-slate-500">{website.status.toLowerCase()}</Tag>
                          </div>
                          <TypographyTitle level={3} className="!mb-1 !mt-0 !text-lg !font-medium !tracking-tight">{website.name}</TypographyTitle>
                          <TypographyParagraph type="secondary" className="!mb-4 !truncate !text-xs">{website.slug}.lonomart.com</TypographyParagraph>
                          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                            <span>{website.templateKey.replaceAll("-", " ")}</span>
                            <span>Updated {website.updatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
