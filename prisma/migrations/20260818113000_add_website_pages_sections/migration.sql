-- CreateTable
CREATE TABLE "website_page" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "isHome" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_section" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "sortOrder" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "website_page_websiteId_slug_key" ON "website_page"("websiteId", "slug");

-- CreateIndex
CREATE INDEX "website_page_websiteId_idx" ON "website_page"("websiteId");
CREATE INDEX "website_page_websiteId_sortOrder_idx" ON "website_page"("websiteId", "sortOrder");
CREATE INDEX "website_section_pageId_idx" ON "website_section"("pageId");
CREATE INDEX "website_section_pageId_sortOrder_idx" ON "website_section"("pageId", "sortOrder");

-- AddForeignKey
ALTER TABLE "website_page" ADD CONSTRAINT "website_page_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "website_section" ADD CONSTRAINT "website_section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "website_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
