-- CreateTable
CREATE TABLE "Vibe" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'user',
    "user_id" TEXT NOT NULL DEFAULT 'default',
    "category" TEXT NOT NULL DEFAULT 'personality_influence',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vibe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vibe_user_id_is_active_idx" ON "Vibe"("user_id", "is_active");

-- CreateIndex
CREATE INDEX "Vibe_category_is_active_idx" ON "Vibe"("category", "is_active");

-- CreateIndex
CREATE INDEX "Vibe_created_at_idx" ON "Vibe"("created_at");
