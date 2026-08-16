import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button, Card, Tag } from "antd";

import { auth } from "@/lib/auth";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import {
  TypographyParagraph,
  TypographyText,
  TypographyTitle,
} from "@/app/components/antd-typography";

function Icon({
  name,
}: {
  name: "grid" | "globe" | "plus" | "arrow" | "spark" | "settings" | "help" | "menu";
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
        <path d="M3.5 12h17M12 3.5c2.2 2.4 3.2 5.2 3.2 8.5s-1 6.1-3.2 8.5c-2.2-2.4-3.2-5.2-3.2-8.5s1-6.1 3.2-8.5Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
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
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
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

  const userName = session.user.name || "there";
  const firstName = userName.split(" ")[0] || "there";
  const userInitials = initials(session.user.name || "User");

  return (
    <main className="min-h-screen flex-1 bg-white text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white">
              L
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight text-slate-900">Lonomart</div>
              <div className="mt-0.5 text-[11px] text-slate-500">Website builder</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6" aria-label="Dashboard navigation">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Workspace</div>
            <div className="flex items-center gap-3 rounded-lg bg-[#e8f0fe] px-3 py-2.5 text-sm font-medium text-[#174ea6]">
              <Icon name="grid" />
              Overview
            </div>
            <div className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600">
              <Icon name="globe" />
              Websites
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">0</span>
            </div>

            <div className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Account</div>
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
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] text-xs font-semibold text-[#174ea6]">
                {userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-slate-800">{userName}</div>
                <div className="truncate text-[11px] text-slate-500">{session.user.email}</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-[#f8fafd]">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <button type="button" aria-label="Open navigation" className="rounded-lg p-2 text-slate-600">
                  <Icon name="menu" />
                </button>
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

          <div className="mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <section className="mb-10 max-w-3xl">
              <TypographyText className="!text-sm !font-medium !text-[#1a73e8]">Your workspace</TypographyText>
              <TypographyTitle level={1} className="!mb-3 !mt-2 !text-3xl !font-normal !tracking-tight !text-slate-900 sm:!text-4xl">
                Welcome, {firstName}
              </TypographyTitle>
              <TypographyParagraph className="!mb-0 !max-w-2xl !text-base !leading-7 !text-slate-600">
                Everything you need to create, customize and publish your next website.
              </TypographyParagraph>
            </section>

            <section className="mb-10 grid gap-4 sm:grid-cols-3">
              <Card bordered={false} className="!rounded-xl !bg-white !shadow-none ring-1 ring-slate-200">
                <TypographyText className="!text-xs !font-medium !text-slate-500">Websites</TypographyText>
                <div className="mt-3 text-3xl font-normal tracking-tight text-slate-900">0</div>
                <div className="mt-1 text-xs text-slate-500">Ready to create</div>
              </Card>
              <Card bordered={false} className="!rounded-xl !bg-white !shadow-none ring-1 ring-slate-200">
                <TypographyText className="!text-xs !font-medium !text-slate-500">Published</TypographyText>
                <div className="mt-3 text-3xl font-normal tracking-tight text-slate-900">0</div>
                <div className="mt-1 text-xs text-slate-500">Nothing live yet</div>
              </Card>
              <Card bordered={false} className="!rounded-xl !bg-white !shadow-none ring-1 ring-slate-200">
                <TypographyText className="!text-xs !font-medium !text-slate-500">Plan</TypographyText>
                <div className="mt-3 text-3xl font-normal tracking-tight text-slate-900">Free</div>
                <div className="mt-1 text-xs text-slate-500">Your starting plan</div>
              </Card>
            </section>

            <section aria-labelledby="websites-heading">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <TypographyTitle id="websites-heading" level={2} className="!mb-1 !mt-0 !text-xl !font-medium !tracking-tight !text-slate-900">
                    My Websites
                  </TypographyTitle>
                  <TypographyParagraph type="secondary" className="!mb-0 !text-sm">
                    Manage your websites and publishing status from here.
                  </TypographyParagraph>
                </div>
                <Button
                  type="primary"
                  disabled
                  icon={<Icon name="plus" />}
                  className="!h-10 !rounded-lg !border-[#1a73e8] !bg-[#1a73e8] !font-medium"
                  title="Website creation is introduced in the next task"
                >
                  Create Website
                </Button>
              </div>

              <Card bordered={false} className="!rounded-xl !bg-white !p-0 !shadow-none ring-1 ring-slate-200">
                <div className="grid min-h-[330px] place-items-center px-6 py-12 text-center">
                  <div className="max-w-[430px]">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                      <Icon name="spark" />
                    </div>
                    <TypographyTitle level={3} className="!mb-2 !mt-0 !text-xl !font-medium !tracking-tight !text-slate-900">
                      Create your first website
                    </TypographyTitle>
                    <TypographyParagraph type="secondary" className="!mb-6 !text-sm !leading-6">
                      Start with a professional template, add your business details, customize the content and publish when you are ready.
                    </TypographyParagraph>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                      Website creation is the next step <Icon name="arrow" />
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
