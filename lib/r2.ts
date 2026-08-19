import { getCloudflareContext } from "@opennextjs/cloudflare";

type R2Object = {
  body: ReadableStream<Uint8Array>;
  httpEtag?: string;
  httpMetadata?: { contentType?: string };
};

type R2BucketLike = {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<{ etag?: string }>;
  get(key: string): Promise<R2Object | null>;
  delete(key: string): Promise<void>;
};

type CloudflareBindings = {
  LONOMART_ASSETS?: R2BucketLike;
};

export function getAssetBucket() {
  const { env } = getCloudflareContext();
  const bucket = (env as unknown as CloudflareBindings).LONOMART_ASSETS;

  if (!bucket) {
    throw new Error("LONOMART_ASSETS R2 binding is not configured.");
  }

  return bucket;
}
