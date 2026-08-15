const steps = ["Choose", "Customize", "Preview", "Publish"];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <section className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-blue-950/30 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
          Lonomart
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Create and publish a professional website in 3–5 minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This foundation page anchors the product principle before business
              features are introduced: move quickly from a selected starting
              point to customization, preview, and publication.
            </p>
          </div>
          <ol className="grid gap-3 rounded-2xl bg-white p-4 text-slate-950">
            {steps.map((step, index) => (
              <li
                className="flex items-center gap-4 rounded-xl border border-slate-200 px-4 py-3"
                key={step}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-lg font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          Foundation only: authentication, dashboards, templates, editing,
          publishing, ecommerce, AI, and custom domains are intentionally not
          implemented in this task.
        </p>
      </section>
    </main>
  );
}
