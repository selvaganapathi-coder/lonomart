CREATE TABLE "website_asset" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "etag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_asset_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "website_asset_objectKey_key" ON "website_asset"("objectKey");
CREATE INDEX "website_asset_websiteId_createdAt_idx" ON "website_asset"("websiteId", "createdAt");

ALTER TABLE "website_asset" ADD CONSTRAINT "website_asset_websiteId_fkey"
  FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
