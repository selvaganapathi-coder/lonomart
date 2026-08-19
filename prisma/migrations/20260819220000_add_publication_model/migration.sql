ALTER TABLE "website" ADD COLUMN "draftRevision" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "website_publication" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "publishedDraftRevision" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_publication_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "website_publication_websiteId_key" ON "website_publication"("websiteId");
CREATE INDEX "website_publication_publishedAt_idx" ON "website_publication"("publishedAt");

ALTER TABLE "website_publication" ADD CONSTRAINT "website_publication_websiteId_fkey"
  FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
