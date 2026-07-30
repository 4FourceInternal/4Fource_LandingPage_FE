import CMS_CONFIG from '../config/cms';

/** Unwrap Strapi v4/v5 media wrappers ({ data: { url } } etc.) */
export const unwrapMedia = (imageData) => {
  if (!imageData) return null;
  if (typeof imageData === 'string') return imageData;

  if (imageData.data) {
    const inner = imageData.data.attributes ?? imageData.data;
    return unwrapMedia(inner);
  }

  return imageData;
};

/**
 * Helper function to get full image URL from Strapi
 * @param {Object|string|null} imageData - Strapi image object or string URL
 * @returns {string|null} Full image URL or null if no valid image data
 */
export const getImageUrl = (imageData) => {
  const media = unwrapMedia(imageData);
  if (!media) return null;

  if (typeof media === 'string') return media;

  if (media.url) {
    if (media.url.startsWith('http')) return media.url;
    const baseUrl = CMS_CONFIG.API_BASE_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}${media.url}`;
  }

  return null;
};

/** Prefer medium/small/thumbnail format when available */
export const getBestImageUrl = (imageData) => {
  const media = unwrapMedia(imageData);
  if (!media) return null;

  const sized =
    media.formats?.medium ??
    media.formats?.small ??
    media.formats?.thumbnail ??
    media;

  return getImageUrl(sized);
};

export default getImageUrl;
