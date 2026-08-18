import Link from "next/link";

import { renderSection } from "./sections";
import { stringValue } from "./section-content";
import type { RenderableWebsite } from "./types";

export function WebsiteRenderer({ website, pageSlug }: { website: RenderableWebsite; pageSlug?: string }) {
  const profile = website.businessProfile;
  const businessName = stringValue(profile.businessName, website.name);
  const selectedPage = pageSlug ? website.pages.find((page) => page.slug === pageSlug) : undefined;
  const currentPage = selectedPage ?? website.pages.find((page) => page.isHome) ?? website.pages[0];

  if (!currentPage) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-slate-50 px-6 text-center">
        <div>
          <p className="text-sm font-medium text-slate-500">Nothing to preview yet</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Add a page to your website</h1>
        </div>
      </div>
    );
  }

  const pageHref = (slug: string) => `/dashboard/websites/${website.id}/preview?page=${encodeURIComponent(slug)}`;

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-blue-100 selection:text-blue-950">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href={pageHref(currentPage.slug)} className="flex min-w-0 items-center gap-3 no-underline">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm">
              {businessName.slice(0, 1).toUpperCase()}
            </span>
            <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-slate-950">{businessName}</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/70 p-1 md:flex" aria-label="Website pages">
            {website.pages.map((page) => {
              const active = page.id === currentPage.id;
              return (
                <Link
                  key={page.id}
                  href={pageHref(page.slug)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm no-underline transition ${active ? "bg-white font-medium text-slate-950 shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:bg-white/80 hover:text-slate-950"}`}
                >
                  {page.title}
                </Link>
              );
            })}
          </nav>

          <details className="relative md:hidden">
            <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-300 hover:text-slate-950 [&::-webkit-details-marker]:hidden">
              <span>{currentPage.title}</span>
              <span aria-hidden="true" className="text-xs text-slate-400">⌄</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 ring-1 ring-black/5">
              <nav aria-label="Website pages mobile">
                {website.pages.map((page) => (
                  <Link
                    key={page.id}
                    href={pageHref(page.slug)}
                    className={`block rounded-xl px-3.5 py-3 text-sm no-underline transition ${page.id === currentPage.id ? "bg-slate-100 font-medium text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </header>

      <main>{currentPage.sections.map((section) => <div key={section.id}>{renderSection(section)}</div>)}</main>

      <footer className="border-t border-slate-200 bg-slate-950 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-950">{businessName.slice(0, 1).toUpperCase()}</span>
                <span className="text-sm font-semibold">{businessName}</span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">A professional website created with Lonomart.</p>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Footer pages">
              {website.pages.map((page) => <Link key={page.id} href={pageHref(page.slug)} className="text-slate-300 no-underline hover:text-white">{page.title}</Link>)}
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} {businessName}. All rights reserved.</span>
            <span>Preview · Template v{website.templateVersion}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
