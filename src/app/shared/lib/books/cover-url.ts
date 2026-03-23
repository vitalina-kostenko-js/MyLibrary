import { ensureHttpsUrl } from "../ensure-https";

export const getImageCover = (cover_id: number): string => {
    return cover_id
      ? ensureHttpsUrl(
          `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`,
        )
      : "/No-Cover-Image-01.png";
  };
  