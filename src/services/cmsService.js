import axios from 'axios';
import CMS_CONFIG from '../config/cms';

// Create axios instance with base configuration
const cmsApi = axios.create({
  baseURL: CMS_CONFIG.API_BASE_URL,
  timeout: CMS_CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    ...CMS_CONFIG.authHeader, // Include API token if available
  },
});

// Simple in-memory cache
const cache = new Map();

// Helper function to extract data from Strapi response
const extractData = (response) => {
  // Handle different Strapi response structures
  if (response.data.data?.attributes) {
    // Standard Strapi structure with attributes
    return response.data.data.attributes;
  } else if (response.data.data) {
    // Direct data structure (your current case)
    return response.data.data;
  } else {
    // Fallback to response.data
    return response.data;
  }
};

// Helper function to handle errors
const handleError = (error) => {
  throw error;
};

// Helper function to get cached data
const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CMS_CONFIG.CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Generic function to fetch content with caching
const fetchContent = async (endpoint, cacheKey) => {
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }

  // Use deep population for nested components, especially for contact buttons and global footer
  let populateParam = 'populate=*';
  if (endpoint === '/contact') {
    populateParam = 'populate[seo][populate]=*&populate[buttons][populate][whatsapp][populate]=*&populate[buttons][populate][email][populate]=*&populate[info][populate]=*&populate[offers][populate]=*&populate[bottomCta][populate][buttons][populate]=*';
  } else if (endpoint === '/global') {
    populateParam = 'populate[defaultSeo][populate]=*&populate[footer][populate][quickLinks][populate]=*&populate[footer][populate][contactInfo][populate]=*&populate[header][populate][brand][populate]=*&populate[header][populate][navLinks][populate]=*';
  } else if (endpoint === '/service-page-content') {
    populateParam = 'populate[seo][populate]=*&populate[cards][populate]=*';
  }

  try {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const cacheBuster = `&_t=${timestamp}`;
    
    let response;
    try {
      // Try with specific populate first
      response = await cmsApi.get(`${endpoint}?${populateParam}${cacheBuster}`);
    } catch (populateError) {
      // If specific populate fails, fall back to simple populate
      if (populateError.response?.data?.error?.name === 'ValidationError') {
        response = await cmsApi.get(`${endpoint}?populate=*${cacheBuster}`);
      } else {
        throw populateError;
      }
    }
    
    const data = extractData(response);
    
    // Cache the data
    setCachedData(cacheKey, data);
    
    return data;
  } catch (error) {
    // For dynamic content, we don't fallback - we throw the error
    throw new Error(`Failed to fetch content from CMS: ${error.message}`);
  }
};

// Home page content
export const getHomeContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }
  
  return await fetchContent('/home', 'home');
};

// About page content
export const getAboutContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }

  // Use explicit populate to include teams and EmployeeImage
  const cacheKey = 'about';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const timestamp = Date.now();
    const response = await cmsApi.get(`/about?populate[teams][populate][EmployeeImage]=true&_t=${timestamp}`);
    const data = extractData(response);
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    return handleError(new Error(`Failed to fetch About content: ${error.message}`));
  }
};

// Services page content
export const getServicesContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }
  
  return await fetchContent('/service-page-content', 'services');
};

// Info page content
export const getInfoContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }
  
  return await fetchContent('/info', 'info');
};

// Contact page content
export const getContactContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }
  
  return await fetchContent('/contact', 'contact');
};

// Global content (header, footer)
export const getGlobalContent = async () => {
  if (!CMS_CONFIG.ENABLE_CMS) {
    throw new Error('CMS is disabled. Please enable CMS integration.');
  }
  
  return await fetchContent('/global', 'global');
};

// Remove fallback functions since we're going completely dynamic
// export const getFallbackContent = () => {
//   return import('../cms/content.js').then(module => module.default);
// };



export default {
  getHomeContent,
  getAboutContent,
  getServicesContent,
  getInfoContent,
  getContactContent,
  getGlobalContent,
};
