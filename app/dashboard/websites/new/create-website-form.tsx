"use client";

import { useActionState } from "react";
import { Alert, Button, Card, Input, Typography } from "antd";

import {
  createWebsite,
  type CreateWebsiteState,
} from "@/app/dashboard/websites/new/actions";
import type { StarterTemplate } from "@/lib/templates/catalog";

const initialState: CreateWebsiteState = {};

export function CreateWebsiteForm({
  templates,
}: {
  templates: StarterTemplate[];
}) {
  const [state, formAction, pending] = useActionState(createWebsite, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <Alert
          type="error"
          showIcon
          message={state.error}
          role="alert"
        />
      ) : null}

      <Card bordered={false} className="!rounded-2xl !bg-white !shadow-none ring-1 ring-slate-200">
        <div className="space-y-5 p-6 sm:p-8">
          <div>
            <Typography.Title level={3} className="!mb-1 !mt-0 !text-xl !font-medium">
              Business information
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="!mb-0 !text-sm">
              Keep this short. Lonomart uses these details to create your first useful website draft.
            </Typography.Paragraph>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Business name <span className="text-[#1a73e8]">*</span></span>
              <Input name="businessName" size="large" maxLength={120} placeholder="e.g. Green Leaf Clinic" required aria-required="true" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Business category <span className="text-[#1a73e8]">*</span></span>
              <select
                name="category"
                required
                defaultValue=""
                aria-required="true"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/15"
              >
                <option value="" disabled>Select a category</option>
                <option value="Local Business">Local Business</option>
                <option value="Consultant">Consultant</option>
                <option value="Agency">Agency</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Clinic">Clinic</option>
                <option value="Salon">Salon</option>
                <option value="Tuition Center">Tuition Center</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Personal Brand">Personal Brand</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Business email</span>
              <Input name="email" type="email" size="large" maxLength={254} placeholder="hello@example.com" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Short description <span className="text-[#1a73e8]">*</span></span>
              <Input.TextArea name="description" rows={3} maxLength={500} showCount placeholder="What does your business do and who do you help?" required aria-required="true" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Phone</span>
              <Input name="phone" size="large" maxLength={40} placeholder="+91 98765 43210" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">WhatsApp number</span>
              <Input name="whatsappNumber" size="large" maxLength={40} placeholder="+91 98765 43210" />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Address</span>
              <Input name="address" size="large" maxLength={240} placeholder="Business address" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Primary CTA label</span>
              <Input name="primaryCtaLabel" size="large" maxLength={40} placeholder="Contact Us" />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">Primary CTA URL</span>
              <Input name="primaryCtaUrl" size="large" maxLength={500} placeholder="https://example.com/contact" />
            </label>
          </div>
        </div>
      </Card>

      <Card bordered={false} className="!rounded-2xl !bg-white !shadow-none ring-1 ring-slate-200">
        <div className="space-y-5 p-6 sm:p-8">
          <div>
            <Typography.Title level={3} className="!mb-1 !mt-0 !text-xl !font-medium">
              Choose a starting point
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="!mb-0 !text-sm">
              Your selection is stored with a version so future template changes do not silently alter this website.
            </Typography.Paragraph>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {templates.map((template, index) => (
              <label key={template.key} className="cursor-pointer">
                <input
                  type="radio"
                  name="templateKey"
                  value={template.key}
                  defaultChecked={index === 0}
                  className="peer sr-only"
                />
                <div className="h-full rounded-xl border border-slate-200 bg-white p-4 transition peer-checked:border-[#1a73e8] peer-checked:bg-[#f8fafd] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1a73e8]/25 hover:border-slate-300">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900">{template.name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">v{template.version}</span>
                  </div>
                  <div className="mb-2 text-xs font-medium text-[#1a73e8]">{template.category}</div>
                  <p className="m-0 text-sm leading-5 text-slate-600">{template.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Typography.Text type="secondary" className="!text-xs">
          You can change website content after creation.
        </Typography.Text>
        <Button type="primary" htmlType="submit" size="large" loading={pending} className="!h-11 !rounded-lg !bg-[#1a73e8] !px-7">
          {pending ? "Creating website…" : "Create website"}
        </Button>
      </div>
    </form>
  );
}
