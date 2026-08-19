ALTER TABLE "website_section" ADD COLUMN "revision" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "website_section_revision" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "revision" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "website_section_revision_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "website_section_revision_sectionId_revision_key" ON "website_section_revision"("sectionId", "revision");
CREATE INDEX "website_section_revision_websiteId_createdAt_idx" ON "website_section_revision"("websiteId", "createdAt");
CREATE INDEX "website_section_revision_sectionId_createdAt_idx" ON "website_section_revision"("sectionId", "createdAt");

ALTER TABLE "website_section_revision" ADD CONSTRAINT "website_section_revision_websiteId_fkey"
  FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "website_section_revision" ADD CONSTRAINT "website_section_revision_sectionId_fkey"
  FOREIGN KEY ("sectionId") REFERENCES "website_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
