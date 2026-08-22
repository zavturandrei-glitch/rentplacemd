import type { StoredThumbnail } from "@/lib/tiktokThumbnail";

export type TikTokThumbnailBackfillVideo = {
  id: string;
  videoUrl: string;
  thumbnailUrl: string | null;
};

export type TikTokThumbnailBackfillDependencies = {
  download: (videoUrl: string) => Promise<StoredThumbnail>;
  createPermanentUrl: (videoId: string) => string;
  storeSuccess: (input: {
    video: TikTokThumbnailBackfillVideo;
    image: StoredThumbnail;
    permanentUrl: string;
  }) => Promise<void>;
  storeFailure: (input: {
    video: TikTokThumbnailBackfillVideo;
    message: string;
  }) => Promise<void>;
};

const temporaryTikTokThumbnailPattern = /(tiktokcdn|muscdn|byteoversea|ibytedtos)/i;

export function needsTikTokThumbnailBackfill(thumbnailUrl: string | null | undefined) {
  return !thumbnailUrl || temporaryTikTokThumbnailPattern.test(thumbnailUrl);
}

function backfillErrorMessage(error: unknown) {
  return (error instanceof Error ? error.message : "Thumbnail не получен").slice(0, 500);
}

export async function backfillTikTokThumbnailRecord(
  video: TikTokThumbnailBackfillVideo,
  dependencies: TikTokThumbnailBackfillDependencies,
) {
  if (!needsTikTokThumbnailBackfill(video.thumbnailUrl)) {
    return { status: "skipped" as const };
  }

  try {
    const image = await dependencies.download(video.videoUrl);
    const permanentUrl = dependencies.createPermanentUrl(video.id);
    await dependencies.storeSuccess({ video, image, permanentUrl });
    return { status: "restored" as const, permanentUrl };
  } catch (error) {
    const message = backfillErrorMessage(error);
    await dependencies.storeFailure({ video, message });
    return { status: "failed" as const, message };
  }
}
