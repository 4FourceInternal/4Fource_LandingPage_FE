import CMS_CONFIG from '../config/cms';

/**
 * Helper function to get full image URL from Strapi
 * @param {Object|string|null} imageData - Strapi image object or string URL
 * @returns {string|null} Full image URL or null if no valid image data
 */
export const getImageUrl = (imageData) => {
  if (!imageData) return null;

  // Local / already-resolved URL string
  if (typeof imageData === 'string') return imageData;

  // Strapi media object
  if (imageData.url) {
    if (imageData.url.startsWith('http')) return imageData.url;
    const baseUrl = CMS_CONFIG.API_BASE_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}${imageData.url}`;
  }

  return null;
};

export default getImageUrl;
