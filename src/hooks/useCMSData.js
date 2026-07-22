import { useState, useEffect } from 'react';
import * as cmsService from '../services/cmsService';

export const useCMSData = (contentType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let content;
        
        // Fetch from Strapi CMS (no fallback)
        switch (contentType) {
          case 'home':
            content = await cmsService.getHomeContent();
            break;
          case 'about':
            content = await cmsService.getAboutContent();
            break;
          case 'services':
            content = await cmsService.getServicesContent();
            break;
          case 'info':
            content = await cmsService.getInfoContent();
            break;
          case 'contact':
            content = await cmsService.getContactContent();
            break;
          case 'clients':
            content = await cmsService.getClientsContent();
            break;
          case 'global':
            content = await cmsService.getGlobalContent();
            break;
          default:
            throw new Error(`Unknown content type: ${contentType}`);
        }
        
        // Set the content from CMS
        setData(content);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  return { data, loading, error };
};

export default useCMSData; 