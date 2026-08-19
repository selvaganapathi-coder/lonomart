import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getAssetBucket } from "@/lib/r2";

async function getOwnedAsset(websiteId: string, assetId: string, userId: string) {
  return prisma.websiteAsset.findFirst({
    where: { id: assetId, websiteId, website: { userId } },
    select: { id: true, objectKey: true, contentType: true, filename: true, size: true },
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ websiteId: string; assetId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId, assetId } = await params;
  const asset = await getOwnedAsset(websiteId, assetId, session.user.id);
  if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const object = await getAssetBucket().get(asset.objectKey);
    if (!object) return NextResponse.json({ error: "Asset object not found" }, { status: 404 });

    return new Response(object.body, {
      headers: {
        "content-type": object.httpMetadata?.contentType ?? asset.contentType,
        "content-length": String(asset.size),
        "cache-control": "private, max-age=3600",
        etag: object.httpEtag ?? "",
        "content-disposition": `inline; filename="${asset.filename.replace(/"/g, "")}"`,
      },
    });
  } catch (error) {
    console.error("R2 asset read failed", error);
    return NextResponse.json({ error: "Asset storage is unavailable." }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ websiteId: string; assetId: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { websiteId, assetId } = await params;
  const asset = await getOwnedAsset(websiteId, assetId, session.user.id);
  if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await getAssetBucket().delete(asset.objectKey);
    await prisma.websiteAsset.delete({ where: { id: asset.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("R2 asset delete failed", error);
    return NextResponse.json({ error: "Unable to delete asset." }, { status: 503 });
  }
}
