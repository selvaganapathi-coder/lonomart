"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { signUp } from "@/lib/auth-client";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: SignUpValues) {
    setError(null);
    setLoading(true);

    try {
      const response = await signUp.email({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });

      if (response.error) {
        setError("We could not create your account. Check your details and try again.");
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("We could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-slate-50 px-6 py-12">
      <Card className="w-full max-w-md shadow-sm">
        <div className="mb-6">
          <Typography.Title level={2} className="!mb-2">
            Create your Lonomart account
          </Typography.Title>
          <Typography.Paragraph type="secondary" className="!mb-0">
            Start building your professional website in minutes.
          </Typography.Paragraph>
        </div>

        {error ? <Alert className="mb-5" type="error" showIcon message={error} /> : null}

        <Form<SignUpValues> layout="vertical" onFinish={handleSubmit} requiredMark="optional">
          <Form.Item
            label="Full name"
            name="name"
            rules={[{ required: true, whitespace: true, message: "Enter your name." }]}
          >
            <Input size="large" autoComplete="name" placeholder="Your name" />
          </Form.Item>

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
            rules={[
              { required: true, message: "Create a password." },
              { min: 8, message: "Password must contain at least 8 characters." },
              { max: 128, message: "Password must contain at most 128 characters." },
            ]}
          >
            <Input.Password size="large" autoComplete="new-password" placeholder="At least 8 characters" />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm your password." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match."));
                },
              }),
            ]}
          >
            <Input.Password size="large" autoComplete="new-password" placeholder="Repeat your password" />
          </Form.Item>

          <Button block htmlType="submit" type="primary" size="large" loading={loading}>
            Create account
          </Button>
        </Form>

        <Typography.Paragraph type="secondary" className="!mb-0 !mt-6 text-center">
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </Typography.Paragraph>
      </Card>
    </main>
  );
}
