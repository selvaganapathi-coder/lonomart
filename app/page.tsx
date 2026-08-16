import Link from "next/link";
import { Button, Card } from "antd";
import {
  TypographyParagraph,
  TypographyTitle,
} from "./components/antd-typography";

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-slate-50 px-6 py-16">
      <Card className="w-full max-w-2xl shadow-sm">
        <TypographyParagraph className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-500">
          Lonomart Foundation
        </TypographyParagraph>

        <TypographyTitle level={1} className="!mb-4">
          Create and publish your website in 3–5 minutes.
        </TypographyTitle>

        <TypographyParagraph className="!mb-6 text-base text-slate-600">
          Create an account, choose a template, customize your website, and publish it.
        </TypographyParagraph>

        <div className="flex flex-wrap gap-3">
          <Link href="/sign-up">
            <Button type="primary" size="large">
              Create account
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="large">Sign in</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
