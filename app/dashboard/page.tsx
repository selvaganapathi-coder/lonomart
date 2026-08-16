import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Card, Typography } from "antd";

import { auth } from "@/lib/auth";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import { TypographyText, TypographyTitle,TypographyParagraph} from "../components/antd-typography";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-slate-50 px-6 py-12">
      <Card className="w-full max-w-2xl shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <TypographyText type="secondary">Authenticated workspace</TypographyText>
            <TypographyTitle level={1} className="!mb-2 !mt-2">
              Welcome, {session.user.name}
            </TypographyTitle>
            <TypographyParagraph type="secondary" className="!mb-0">
              {session.user.email}
            </TypographyParagraph>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
          <TypographyTitle level={4} className="!mb-2">
            Authentication foundation ready
          </TypographyTitle>
          <TypographyParagraph type="secondary" className="!mb-0">
            Website management will be introduced in the next Lonomart task.
          </TypographyParagraph>
        </div>
      </Card>
    </main>
  );
}
