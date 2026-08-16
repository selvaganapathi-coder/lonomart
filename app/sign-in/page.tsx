"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { signIn } from "@/lib/auth-client";

interface SignInValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: SignInValues) {
    setError(null);
    setLoading(true);

    try {
      const response = await signIn.email({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (response.error) {
        setError("Invalid email or password.");
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("We could not sign you in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-slate-50 px-6 py-12">
      <Card className="w-full max-w-md shadow-sm">
        <div className="mb-6">
          <Typography.Title level={2} className="!mb-2">
            Sign in to Lonomart
          </Typography.Title>
          <Typography.Paragraph type="secondary" className="!mb-0">
            Continue to your website workspace.
          </Typography.Paragraph>
        </div>

        {error ? <Alert className="mb-5" type="error" showIcon message={error} /> : null}

        <Form<SignInValues> layout="vertical" onFinish={handleSubmit} requiredMark="optional">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Enter a valid email." }]}
          >
            <Input size="large" autoComplete="email" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your password." }]}
          >
            <Input.Password size="large" autoComplete="current-password" placeholder="Your password" />
          </Form.Item>

          <Button block htmlType="submit" type="primary" size="large" loading={loading}>
            Sign in
          </Button>
        </Form>

        <Typography.Paragraph type="secondary" className="!mb-0 !mt-6 text-center">
          New to Lonomart? <Link href="/sign-up">Create an account</Link>
        </Typography.Paragraph>
      </Card>
    </main>
  );
}
