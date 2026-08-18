import type { ReactNode } from "react";

import { objectArray, objectValue, stringValue } from "./section-content";
import type { JsonObject, RenderableSection } from "./types";

type SectionProps = { content: JsonObject };

function ButtonLink({ label, url, secondary = false }: { label: string; url: string; secondary?: boolean }) {
  if (!label) return null;
  return (
    <a
      href={url || "#"}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium no-underline transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${secondary ? "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50" : "bg-[#1a73e8] text-white shadow-sm hover:bg-[#1765cc]"}`}
    >
      {label}
      <span aria-hidden="true" className="ml-2">→</span>
    </a>
  );
}

function HeroSection({ content }: SectionProps) {
  const button = objectValue(content.primaryButton);
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#174ea6]">{stringValue(content.eyebrow, "Welcome")}</p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">{stringValue(content.title, "Your business")}</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{stringValue(content.description, "A professional website for your business.")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink label={stringValue(button.label, "Contact Us")} url={stringValue(button.url, "/contact")} />
            <ButtonLink label="Explore services" url="/services" secondary />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span>Professional</span>
            <span>Clear</span>
            <span>Built for your customers</span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-slate-100 blur-xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)]">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="h-3 w-24 rounded-full bg-slate-200" />
                <div className="h-8 w-8 rounded-lg bg-blue-50" />
              </div>
              <div className="mt-7 space-y-3">
                <div className="h-5 w-3/4 rounded-full bg-slate-900/90" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="h-24 rounded-2xl bg-blue-50" />
                <div className="h-24 rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ content }: SectionProps) {
  return (
    <section className="bg-[#f8fafd] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a73e8]">About</p>
          <div className="mt-4 h-px w-16 bg-blue-200" />
        </div>
        <div>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">{stringValue(content.title, "About us")}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{stringValue(content.description, "Tell your customers what makes your business different.")}</p>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ content }: SectionProps) {
  const items = objectArray(content.items);
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a73e8]">Services</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">{stringValue(content.title, "What we offer")}</h2>
          </div>
          <span className="text-sm text-slate-500">Designed around your customers</span>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.length ? items.map((item, index) => (
            <article key={`${stringValue(item.title, "service")}-${index}`} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.4)] transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white transition group-hover:bg-[#1a73e8]">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-7 text-xl font-semibold tracking-[-0.02em] text-slate-950">{stringValue(item.title, "Professional service")}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{stringValue(item.description, "A clear description of your service.")}</p>
              <span className="mt-6 inline-flex text-sm font-medium text-slate-500 transition group-hover:text-[#1a73e8]">Learn more <span aria-hidden="true" className="ml-1">→</span></span>
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
    <section className="bg-white px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-12 text-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.6)] sm:px-12 sm:py-16 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">Let’s work together</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{stringValue(content.title, "Ready to get started?")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{stringValue(content.description, "Give customers a clear next step.")}</p>
          </div>
          <a href={stringValue(button.url, "/contact")} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-slate-950 no-underline transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">{stringValue(button.label, "Contact Us")} <span aria-hidden="true" className="ml-2">→</span></a>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: SectionProps) {
  return (
    <section className="bg-[#f8fafd] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a73e8]">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">Let’s talk.</h2>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.35)] sm:p-10">
          <h3 className="text-2xl font-semibold tracking-[-0.025em] text-slate-950">{stringValue(content.title, "Contact us")}</h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{stringValue(content.description, "Make it easy for customers to reach you.")}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p><p className="mt-1 text-sm font-medium text-slate-900">hello@yourbusiness.com</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Response</p><p className="mt-1 text-sm font-medium text-slate-900">We’ll get back to you soon</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FallbackSection({ section }: { section: RenderableSection }) {
  return (
    <section className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">Section <span className="font-medium text-slate-700">{section.type}</span> is not available in this renderer version yet.</div>
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
