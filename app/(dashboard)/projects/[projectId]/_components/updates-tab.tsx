import type { RefObject } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import type { CommentItem, UpdateItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatRelativeTime, getInitials } from "./utils";

type UpdatesTabProps = {
  updates: UpdateItem[];
  activeUpdateId: string | null;
  selectedUpdate: UpdateItem | null;
  comments: CommentItem[];
  commentsLoading: boolean;
  updateCommentText: string;
  commentInputRef: RefObject<HTMLInputElement | null>;
  isSendingComment: boolean;
  onUpdateCommentTextChange: (value: string) => void;
  onSelectUpdate: (updateId: string) => void;
  onLike: (updateId: string) => void;
  onDeleteUpdate: (update: UpdateItem) => void;
  onSendComment: () => void;
};

export function UpdatesTab({
  updates,
  activeUpdateId,
  selectedUpdate,
  comments,
  commentsLoading,
  updateCommentText,
  commentInputRef,
  isSendingComment,
  onUpdateCommentTextChange,
  onSelectUpdate,
  onLike,
  onDeleteUpdate,
  onSendComment,
}: UpdatesTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-3">
        {updates.length === 0 ? (
          <Card className="border-[#8a6500]/25 bg-[#f4ece0]/80 p-4">
            <p className="text-body-16 text-[#6a5f49]">No updates yet.</p>
          </Card>
        ) : (
          updates.map((update) => {
            const previewImage = update.images?.[0]?.url;
            const uploaderName = update.uploadedBy?.name || "Unknown User";
            const uploaderRole = String(update.uploadedBy?.role || "site_manager")
              .replace("-", " ")
              .toUpperCase();
            const avatarUrl = update.uploadedBy?.avatar?.url;
            const likeCount = Number(update.stats?.likeCount ?? 0);

            return (
              <Card
                key={update._id}
                className={`cursor-pointer border p-3 transition ${
                  activeUpdateId === update._id
                    ? "border-[#8a6500]/45 bg-[#e8dcc5]"
                    : "border-[#8a6500]/25 bg-[#f4ece0]/85 hover:bg-[#ece1cb]"
                }`}
              >
                <div className="flex gap-3">
                  <div className="h-24 w-24 overflow-hidden rounded-md border border-[#8a6500]/25 bg-[#ebe2d2]">
                    {previewImage ? (
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${previewImage})` }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-[#6a5f49]">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="text-body-16 flex-1 leading-relaxed text-[#2f2615]">
                    {update.description || "-"}
                  </p>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    {avatarUrl ? (
                      <div
                        className="h-9 w-9 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${avatarUrl})` }}
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8ccb4] text-xs font-semibold text-[#5a430a]">
                        {getInitials(uploaderName)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-[#3d331f]">
                        {uploaderName}
                      </p>
                      <p className="text-[10px] tracking-wide text-[#756952]">
                        {uploaderRole} | {formatRelativeTime(update.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-xs text-[#6a5f49] transition hover:text-[#3d331f]"
                      onClick={() => onLike(update._id)}
                    >
                      {likeCount} Like
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#8a6500]/35 text-[#7a5c0a] transition hover:border-[#8a6500]/60 hover:text-[#6b4f02]"
                      onClick={() => onDeleteUpdate(update)}
                      aria-label="Delete project update"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs text-[#8a6500] transition hover:text-[#6b4f02]"
                      onClick={() => {
                        onSelectUpdate(update._id);
                        commentInputRef.current?.focus();
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Comment
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <Card className="flex flex-col border-[#8a6500]/25 bg-[#f4ece0]/85 p-3">
        <div className="mb-3 border-b border-[#8a6500]/25 pb-2">
          <p className="text-sm font-semibold text-[#3d331f]">
            {selectedUpdate ? "Update Comments" : "Select an update"}
          </p>
          {selectedUpdate ? (
            <p className="text-xs text-[#756952]">
              {Number(selectedUpdate.stats?.commentCount ?? comments.length)} comments
            </p>
          ) : null}
        </div>
        <div className="max-h-[430px] flex-1 space-y-3 overflow-y-auto pr-1">
          {!selectedUpdate ? (
            <div className="rounded-lg border border-[#8a6500]/25 bg-[#f8f3e8] p-3 text-sm text-[#6a5f49]">
              Click an update card to view comments.
            </div>
          ) : commentsLoading ? (
            <div className="rounded-lg border border-[#8a6500]/25 bg-[#f8f3e8] p-3 text-sm text-[#6a5f49]">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="rounded-lg border border-[#8a6500]/25 bg-[#f8f3e8] p-3 text-sm text-[#6a5f49]">
              No comments yet.
            </div>
          ) : (
            comments.map((comment) => {
              const commenterName = comment.user?.name || "Unknown";
              const commenterRole = String(comment.user?.role || "")
                .replace("-", " ")
                .toUpperCase();
              const commenterAvatar = comment.user?.avatar?.url;

              return (
                <div key={comment._id} className="flex items-start gap-2">
                  {commenterAvatar ? (
                    <div
                      className="mt-1 h-8 w-8 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${commenterAvatar})` }}
                    />
                  ) : (
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#d8ccb4] text-[10px] font-semibold text-[#5a430a]">
                      {getInitials(commenterName)}
                    </div>
                  )}
                  <div className="flex-1 rounded-md border border-[#8a6500]/15 bg-[#f8f3e8] p-3 text-[#2f2615]">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold">{commenterName}</p>
                      <p className="text-[10px] text-[#7a6e58]">
                        {formatRelativeTime(comment.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-[#4f4638]">{comment.comment || "-"}</p>
                    {commenterRole ? (
                      <p className="mt-1 text-[10px] text-[#7a6e58]">
                        {commenterRole}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 flex gap-2 border-t border-[#8a6500]/25 pt-3">
          <Input
            ref={commentInputRef}
            id="update-comment-input"
            value={updateCommentText}
            onChange={(event) => onUpdateCommentTextChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSendComment();
              }
            }}
            placeholder="Start typing..."
            className="h-11"
          />
          <Button
            size="icon"
            className="h-11 w-11 bg-[#8a6500] text-white hover:bg-[#735500]"
            onClick={onSendComment}
            disabled={
              !activeUpdateId || isSendingComment || !updateCommentText.trim()
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
