-- CreateTable
CREATE TABLE "action_cards" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "action_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_logs" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,
    "action_card_id" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL DEFAULT 1,
    "recorded_minute" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "action_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "action_logs_child_id_idx" ON "action_logs"("child_id");

-- CreateIndex
CREATE INDEX "action_logs_session_id_idx" ON "action_logs"("session_id");

-- CreateIndex
CREATE INDEX "action_logs_recorded_minute_idx" ON "action_logs"("recorded_minute");

-- CreateIndex
CREATE UNIQUE INDEX "action_logs_session_id_child_id_action_card_id_recorded_min_key" ON "action_logs"("session_id", "child_id", "action_card_id", "recorded_minute");

-- AddForeignKey
ALTER TABLE "action_logs" ADD CONSTRAINT "action_logs_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_logs" ADD CONSTRAINT "action_logs_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_logs" ADD CONSTRAINT "action_logs_action_card_id_fkey" FOREIGN KEY ("action_card_id") REFERENCES "action_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
