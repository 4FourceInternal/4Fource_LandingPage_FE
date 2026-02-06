import CMS_CONFIG from '../config/cms';

/**
 * Helper function to get full image URL from Strapi
 * @param {Object|string|null} imageData - Strapi image object or string URL
 * @returns {string|null} Full image URL or null if no valid image data
 */
export const getImageUrl = (imageData) => {
  console.log('[getImageUrl] ===== Processing Image =====');
  console.log('[getImageUrl] Input imageData:', imageData);
  console.log('[getImageUrl] Type of imageData:', typeof imageData);
  
  if (!imageData) {
    console.log('[getImageUrl] ❌ No image data provided, returning null');
    return null;
  }
  
  // If it's already a string (local fallback), return as is
  if (typeof imageData === 'string') {
    console.log('[getImageUrl] ✅ String URL detected:', imageData);
    return imageData;
  }
  
  // If it's a Strapi image object, construct the full URL
  if (imageData.url) {
    console.log('[getImageUrl] Found URL in imageData:', imageData.url);
    
    // Check if it's already a full URL
    if (imageData.url.startsWith('http')) {
      console.log('[getImageUrl] ✅ Full URL detected:', imageData.url);
      return imageData.url;
    }
    
    // Construct full URL from Strapi base (remove /api from the end)
    const baseUrl = CMS_CONFIG.API_BASE_URL.replace('/api', '');
    const fullUrl = `${baseUrl}${imageData.url}`;
    console.log('[getImageUrl] CMS_CONFIG.API_BASE_URL:', CMS_CONFIG.API_BASE_URL);
    console.log('[getImageUrl] Base URL (without /api):', baseUrl);
    console.log('[getImageUrl] ✅ Constructed full URL:', fullUrl);
    return fullUrl;
  }
  
  console.log('[getImageUrl] ❌ No valid URL found in imageData, returning null');
  return null;
};

export default getImageUrl;