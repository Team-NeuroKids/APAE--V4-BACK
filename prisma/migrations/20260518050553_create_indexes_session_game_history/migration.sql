-- CreateIndex
CREATE INDEX "game_histories_child_id_idx" ON "game_histories"("child_id");

-- CreateIndex
CREATE INDEX "game_histories_session_id_idx" ON "game_histories"("session_id");

-- CreateIndex
CREATE INDEX "game_histories_game_id_idx" ON "game_histories"("game_id");

-- CreateIndex
CREATE INDEX "game_histories_created_at_idx" ON "game_histories"("created_at");

-- CreateIndex
CREATE INDEX "sessions_child_id_idx" ON "sessions"("child_id");

-- CreateIndex
CREATE INDEX "sessions_opened_by_id_idx" ON "sessions"("opened_by_id");
