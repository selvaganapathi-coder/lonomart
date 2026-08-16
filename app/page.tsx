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
          The Lonomart application foundation is ready for the next vertical
          slice: account and authentication.
        </TypographyParagraph>

        <Button type="primary" size="large">
          Get started
        </Button>
      </Card>
    </main>
  );
}