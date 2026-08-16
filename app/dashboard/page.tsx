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

function Icon({ name }: { name: "grid" | "globe" | "plus" | "arrow" | "spark" | "settings" | "help" }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
    spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm7 14 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.8 1.4-1.8 3.1-2.1-.8a7.7 7.7 0 0 1-1.7 1l-.3 2.2h-3.6l-.3-2.2a7.7 7.7 0 0 1-1.7-1l-2.1.8-1.8-3.1 1.8-1.4.1-.1a8 8 0 0 1 0-2l-.1-.1-1.8-1.4 1.8-3.1 2.1.8a7.7 7.7 0 0 1 1.7-1l.3-2.2h3.6l.3 2.2a7.7 7.7 0 0 1 1.7 1l2.1-.8 1.8 3.1-1.8 1.4-.1.1a8 8 0 0 1 0 2Z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.7 9a2.5 2.5 0 1 1 4.3 1.8c-.9.8-2 1.2-2 2.7M12 17h.01" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      {paths[name]}
    </svg>
  );
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const userName = session.user.name || "there";
  const userInitials = initials(session.user.name || "User");

  return (
    <main className="min-h-full flex-1 bg-[#f7f8fa] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200/80 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">L</div>
            <div>
              <div className="text-[15px] font-bold tracking-tight text-slate-950">Lonomart</div>
              <div className="text-[11px] font-medium text-slate-400">Website builder</div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6" aria-label="Dashboard navigation">
            <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Workspace</div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-950">
              <Icon name="grid" />
              Overview
            </div>
            <div className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500">
              <Icon name="globe" />
              Websites
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400">0</span>
            </div>

            <div className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Account</div>
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500">
              <Icon name="settings" />
              Settings
            </div>
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500">
              <Icon name="help" />
              Help & support
            </div>
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{userInitials}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800">{userName}</div>
                <div className="truncate text-[11px] text-slate-400">{session.user.email}</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">L</div>
                <span className="text-sm font-bold tracking-tight">Lonomart</span>
              </div>
              <div className="hidden text-sm font-medium text-slate-500 lg:block">Overview</div>
              <div className="ml-auto flex items-center gap-3">
                <Tag className="!m-0 hidden rounded-full !border-slate-200 !bg-slate-50 !px-3 !py-1 text-xs sm:block">Free plan</Tag>
                <SignOutButton />
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <section className="relative mb-8 overflow-hidden rounded-2xl bg-slate-950 px-6 py-7 text-white shadow-sm sm:px-8 sm:py-9">
              <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="absolute -bottom-32 right-28 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Workspace ready
                </div>
                <TypographyTitle level={1} className="!mb-2 !mt-0 !text-3xl !font-bold !tracking-tight !text-white sm:!text-4xl">
                  Good to see you, {userName.split(" ")[0]}.
                </TypographyTitle>
                <TypographyParagraph className="!mb-0 !text-sm !leading-6 !text-slate-300 sm:!text-base">
                  Build your next website from a professional starting point and manage everything from one workspace.
                </TypographyParagraph>
              </div>
            </section>

            <section className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card bordered={false} className="!rounded-2xl !shadow-sm ring-1 ring-slate-200/70">
                <TypographyText className="!text-xs !font-semibold !uppercase !tracking-wider !text-slate-400">Websites</TypographyText>
                <div className="mt-3 text-3xl font-bold tracking-tight text-slate-950">0</div>
                <div className="mt-1 text-xs text-slate-400">No websites created</div>
              </Card>
              <Card bordered={false} className="!rounded-2xl !shadow-sm ring-1 ring-slate-200/70">
                <TypographyText className="!text-xs !font-semibold !uppercase !tracking-wider !text-slate-400">Published</TypographyText>
                <div className="mt-3 text-3xl font-bold tracking-tight text-slate-950">0</div>
                <div className="mt-1 text-xs text-slate-400">Nothing live yet</div>
              </Card>
              <Card bordered={false} className="!rounded-2xl !shadow-sm ring-1 ring-slate-200/70">
                <TypographyText className="!text-xs !font-semibold !uppercase !tracking-wider !text-slate-400">Plan</TypographyText>
                <div className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Free</div>
                <div className="mt-1 text-xs text-slate-400">Ready for your first site</div>
              </Card>
            </section>

            <section aria-labelledby="websites-heading">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <TypographyTitle id="websites-heading" level={2} className="!mb-1 !mt-0 !text-xl !font-bold !tracking-tight">
                    My Websites
                  </TypographyTitle>
                  <TypographyParagraph type="secondary" className="!mb-0 !text-sm">
                    Your sites, projects and publishing status will appear here.
                  </TypographyParagraph>
                </div>
                <Button disabled icon={<Icon name="plus" />} className="!h-10 !rounded-xl !font-semibold" title="Website creation is introduced in the next task">
                  Create Website
                </Button>
              </div>

              <Card bordered={false} className="!overflow-hidden !rounded-2xl !p-0 !shadow-sm ring-1 ring-slate-200/70">
                <div className="grid min-h-[360px] place-items-center px-6 py-12 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
                      <Icon name="spark" />
                    </div>
                    <TypographyTitle level={3} className="!mb-2 !mt-0 !text-xl !font-bold !tracking-tight">
                      Your workspace is ready
                    </TypographyTitle>
                    <TypographyParagraph type="secondary" className="!mb-6 !text-sm !leading-6">
                      Start with a professional template, customize your content, and publish when you are ready. Website creation will be enabled in the next Lonomart task.
                    </TypographyParagraph>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
                      Coming next <Icon name="arrow" />
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
