import Link from "next/link";

import { renderSection } from "./sections";
import { stringValue } from "./section-content";
import type { RenderableWebsite } from "./types";

export function WebsiteRenderer({ website }: { website: RenderableWebsite }) {
  const profile = website.businessProfile;
  const businessName = stringValue(profile.businessName, website.name);
  const homePage = website.pages.find((page) => page.isHome) ?? website.pages[0];

  if (!homePage) {
    return <div className="p-10 text-center text-sm text-slate-500">This website does not have a page to render yet.</div>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href={`/dashboard/websites/${website.id}/preview`} className="flex min-w-0 items-center gap-3 no-underline">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1a73e8] text-sm font-bold text-white">{businessName.slice(0, 1).toUpperCase()}</span>
            <span className="truncate text-sm font-semibold tracking-tight text-slate-950">{businessName}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Website pages">
            {website.pages.map((page) => (
              <Link key={page.id} href={`/dashboard/websites/${website.id}/preview?page=${encodeURIComponent(page.slug)}`} className="text-sm text-slate-600 no-underline hover:text-slate-950">
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{homePage.sections.map((section) => <div key={section.id}>{renderSection(section)}</div>)}</main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{businessName}</span>
          <span>Website preview · Template v{website.templateVersion}</span>
        </div>
      </footer>
    </div>
  );
}
