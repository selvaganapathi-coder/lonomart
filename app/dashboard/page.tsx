import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button, Card } from "antd";

import { auth } from "@/lib/auth";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import {
  TypographyParagraph,
  TypographyText,
  TypographyTitle,
} from "@/app/components/antd-typography";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-full flex-1 flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <TypographyText className="text-base font-semibold text-slate-900">
              Lonomart
            </TypographyText>
            <TypographyParagraph className="!mb-0 text-xs text-slate-500">
              Website management
            </TypographyParagraph>
          </div>
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-12">
        <section className="mb-10">
          <TypographyText type="secondary">Dashboard</TypographyText>
          <TypographyTitle level={1} className="!mb-2 !mt-2">
            Welcome, {session.user.name}
          </TypographyTitle>
          <TypographyParagraph type="secondary" className="!mb-0 max-w-2xl text-base">
            Create and manage your professional websites from one place.
          </TypographyParagraph>
        </section>

        <section aria-labelledby="my-websites-heading">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <TypographyTitle
                id="my-websites-heading"
                level={3}
                className="!mb-1 !mt-0"
              >
                My Websites
              </TypographyTitle>
              <TypographyParagraph type="secondary" className="!mb-0">
                Your websites will appear here.
              </TypographyParagraph>
            </div>
            <Button type="primary" disabled title="Website creation is the next Lonomart task">
              Create Website
            </Button>
          </div>

          <Card className="shadow-sm">
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                +
              </div>
              <TypographyTitle level={4} className="!mb-2 !mt-0">
                No websites yet
              </TypographyTitle>
              <TypographyParagraph
                type="secondary"
                className="!mb-0 max-w-md"
              >
                Your first website will be created from a professional template
                and ready for you to customize in minutes.
              </TypographyParagraph>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
