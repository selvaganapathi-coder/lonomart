import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getAssetBucket } from "@/lib/r2";

const MAX_ASSET_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeFilename(filename: string) {
  const normalized = filename.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-");
  return normalized.replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 100) || "asset";
}

async function getOwnedWebsite(websiteId: string, userId: string) {
  return prisma.website.findFirst({ where: { id: websiteId, userId }, select: { id: true } });
}

export async function GET(_request: Request, { params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId } = await params;
  const website = await getOwnedWebsite(websiteId, session.user.id);
  if (!website) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const assets = await prisma.websiteAsset.findMany({
    where: { websiteId },
    orderBy: { createdAt: "desc" },
    select: { id: true, filename: true, contentType: true, size: true, createdAt: true },
  });

  return NextResponse.json({ assets });
}

export async function POST(request: Request, { params }: { params: Promise<{ websiteId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId } = await params;
  const website = await getOwnedWebsite(websiteId, session.user.id);
  if (!website) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const formData = await request.formData();
  const value = formData.get("file");
  if (!(value instanceof File)) return NextResponse.json({ error: "File is required." }, { status: 400 });
  if (!ALLOWED_TYPES.has(value.type)) return NextResponse.json({ error: "Only JPEG, PNG and WebP images are supported." }, { status: 415 });
  if (value.size === 0 || value.size > MAX_ASSET_SIZE) return NextResponse.json({ error: "Image size must be between 1 byte and 10 MB." }, { status: 413 });

  const assetId = crypto.randomUUID();
  const filename = safeFilename(value.name);
  const objectKey = `users/${session.user.id}/websites/${websiteId}/assets/${assetId}/${filename}`;

  const asset = await prisma.websiteAsset.create({
    data: { id: assetId, websiteId, objectKey, filename, contentType: value.type, size: value.size },
  });

  try {
    const bucket = getAssetBucket();
    const uploaded = await bucket.put(objectKey, await value.arrayBuffer(), { httpMetadata: { contentType: value.type } });
    const saved = await prisma.websiteAsset.update({
      where: { id: asset.id },
      data: { etag: uploaded.etag },
      select: { id: true, filename: true, contentType: true, size: true, createdAt: true },
    });
    return NextResponse.json({ asset: saved }, { status: 201 });
  } catch (error) {
    await prisma.websiteAsset.delete({ where: { id: asset.id } }).catch(() => undefined);
    console.error("R2 asset upload failed", error);
    return NextResponse.json({ error: "Asset storage is unavailable." }, { status: 503 });
  }
}
