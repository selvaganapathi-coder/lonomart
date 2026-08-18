import type { ReactNode } from "react";

import { objectArray, objectValue, stringValue } from "./section-content";
import type { JsonObject, RenderableSection } from "./types";

type SectionProps = { content: JsonObject };

function ButtonLink({ label, url }: { label: string; url: string }) {
  if (!label) return null;
  return (
    <a href={url || "#"} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1a73e8] px-5 text-sm font-medium text-white no-underline transition hover:bg-[#1765cc]">
      {label}
    </a>
  );
}

function HeroSection({ content }: SectionProps) {
  const button = objectValue(content.primaryButton);
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#1a73e8]">{stringValue(content.eyebrow, "Welcome")}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-6xl">{stringValue(content.title, "Your business")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{stringValue(content.description, "A professional website for your business.")}</p>
          <div className="mt-8"><ButtonLink label={stringValue(button.label, "Contact Us")} url={stringValue(button.url, "/contact")} /></div>
        </div>
        <div className="hidden rounded-3xl bg-[#f8fafd] p-8 ring-1 ring-slate-200 lg:block">
          <div className="aspect-[4/3] rounded-2xl bg-white ring-1 ring-slate-200" />
        </div>
      </div>
    </section>
  );
}

function AboutSection({ content }: SectionProps) {
  return (
    <section className="bg-[#f8fafd] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">About</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-4xl">{stringValue(content.title, "About us")}</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">{stringValue(content.description, "Tell your customers what makes your business different.")}</p>
      </div>
    </section>
  );
}

function ServicesSection({ content }: SectionProps) {
  const items = objectArray(content.items);
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-4xl">{stringValue(content.title, "What we offer")}</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.length ? items.map((item, index) => (
            <article key={`${stringValue(item.title, "service")}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f0fe] text-sm font-semibold text-[#174ea6]">{index + 1}</div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{stringValue(item.title, "Professional service")}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{stringValue(item.description, "A clear description of your service.")}</p>
            </article>
          )) : (
            <p className="text-sm text-slate-500">Services will appear here.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ content }: SectionProps) {
  const button = objectValue(content.button);
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 px-7 py-12 text-white sm:px-12 sm:py-16">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{stringValue(content.title, "Ready to get started?")}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{stringValue(content.description, "Give customers a clear next step.")}</p>
        <div className="mt-7">
          <a href={stringValue(button.url, "/contact")} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-slate-950 no-underline hover:bg-slate-100">{stringValue(button.label, "Contact Us")}</a>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: SectionProps) {
  return (
    <section className="bg-[#f8fafd] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-7 ring-1 ring-slate-200 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a73e8]">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-slate-950">{stringValue(content.title, "Contact us")}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{stringValue(content.description, "Make it easy for customers to reach you.")}</p>
      </div>
    </section>
  );
}

function FallbackSection({ section }: { section: RenderableSection }) {
  return (
    <section className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        Section <span className="font-medium text-slate-700">{section.type}</span> is not available in this renderer version yet.
      </div>
    </section>
  );
}

export function renderSection(section: RenderableSection): ReactNode {
  if (!section.visible) return null;
  const props = { content: section.content };
  switch (section.type) {
    case "hero": return <HeroSection {...props} />;
    case "about": return <AboutSection {...props} />;
    case "services": return <ServicesSection {...props} />;
    case "cta": return <CtaSection {...props} />;
    case "contact": return <ContactSection {...props} />;
    default: return <FallbackSection section={section} />;
  }
}
