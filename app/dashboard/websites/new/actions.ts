"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getStarterTemplate } from "@/lib/templates/catalog";

export type CreateWebsiteState = {
  error?: string;
};

function readText(formData: FormData, field: string, maxLength: number) {
  const value = formData.get(field);
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export async function createWebsite(
  _previousState: CreateWebsiteState,
  formData: FormData,
): Promise<CreateWebsiteState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const businessName = readText(formData, "businessName", 120);
  const category = readText(formData, "category", 80);
  const description = readText(formData, "description", 500);
  const phone = readText(formData, "phone", 40);
  const email = readText(formData, "email", 254);
  const address = readText(formData, "address", 240);
  const whatsappNumber = readText(formData, "whatsappNumber", 40);
  const primaryCtaLabel = readText(formData, "primaryCtaLabel", 40);
  const primaryCtaUrl = readText(formData, "primaryCtaUrl", 500);
  const templateKey = readText(formData, "templateKey", 80);

  if (!businessName) {
    return { error: "Business name is required." };
  }

  if (!category) {
    return { error: "Please select a business category." };
  }

  if (!description) {
    return { error: "Add a short description so the template can start with useful content." };
  }

  const template = getStarterTemplate(templateKey);
  if (!template) {
    return { error: "Please select a valid starter template." };
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Enter a valid business email address." };
  }

  if (primaryCtaUrl && !/^(https?:\/\/|tel:|mailto:|\/)/i.test(primaryCtaUrl)) {
    return { error: "The call-to-action URL must be a web URL, phone link, email link, or site path." };
  }

  const baseSlug = slugify(businessName) || "website";
  let slug = baseSlug;

  const existing = await prisma.website.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
  }

  const website = await prisma.website.create({
    data: {
      userId: session.user.id,
      name: businessName,
      slug,
      templateKey: template.key,
      templateVersion: template.version,
      businessProfile: {
        businessName,
        category,
        description,
        phone,
        email,
        address,
        whatsappNumber,
        primaryCta: {
          label: primaryCtaLabel || "Contact Us",
          url: primaryCtaUrl,
        },
      },
    },
    select: { id: true },
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard/websites/${website.id}/setup`);
}
