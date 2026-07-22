# CMS Integration Setup Guide

This guide explains how to connect your Qoyy Global frontend to the Strapi backend CMS.

## Overview

Your frontend is now integrated with Strapi CMS and will automatically:
1. Try to fetch content from Strapi first
2. Fall back to local content if Strapi is not available
3. Cache responses for better performance
4. Handle errors gracefully

## Prerequisites

1. **Strapi Backend**: Make sure your Strapi backend is running on `http://localhost:1337`
2. **Frontend Dependencies**: Ensure all required packages are installed

## Backend Setup (Strapi)

### 1. Start Strapi Backend

```bash
cd backend-strapi
npm run develop
```

Your Strapi admin panel will be available at: `http://localhost:1337/admin`

### 2. Create Content Types

The following content types have been created for you:

- **Home** (`/api/home`) - Home page content
- **About** (`/api/about`) - About page content  
- **Service Page Content** (`/api/service-page-content`) - Services page content
- **Info** (`/api/info`) - Info/FAQ page content
- **Contact** (`/api/contact`) - Contact page content
- **Clients Page** (`/api/clients-page`) - Our Client page (logos, open & private projects)
- **Global** (`/api/global`) - Header, footer, and global settings

### 3. Add Content

1. Go to `http://localhost:1337/admin`
2. Navigate to Content Manager
3. Create entries for each content type
4. Publish your content

### 4. Configure Permissions

1. Go to Settings → Users & Permissions Plugin → Roles
2. Select "Public" role
3. Enable "find" and "findOne" permissions for all content types
4. Save changes

## Frontend Configuration

### 1. Environment Variables (Optional)

Create a `.env` file in your frontend root:

```env
# Strapi backend URL
VITE_STRAPI_URL=http://localhost:1337/api

# Enable/disable CMS integration
VITE_ENABLE_CMS=true
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

### 2. CMS Configuration

The CMS configuration is in `src/config/cms.js`:

```javascript
export const CMS_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api',
  API_TIMEOUT: 10000,
  ENABLE_CMS: import.meta.env.VITE_ENABLE_CMS !== 'false',
  FALLBACK_TO_LOCAL: true,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};
```

## How It Works

### 1. Content Fetching

Each page uses the `useCMSData` hook:

```javascript
const { data: home, loading, error } = useCMSData('home');
```

### 2. Fallback System

If Strapi is not available, the system automatically falls back to local content:

```javascript
// Use CMS data or fallback to local content
const seo = home?.seo || { 
  title: 'Qoyy Global - Marketing Made Simple', 
  description: 'Marketing made simple...' 
};
```

### 3. Caching

Responses are cached for 5 minutes to improve performance.

## Content Structure

### Home Page
```javascript
{
  seo: {
    title: "string",
    description: "string"
  },
  hero: {
    title1: "string",
    title2: "string",
    backgroundImage: "media"
  }
}
```

### About Page
```javascript
{
  seo: { ... },
  heading: "string",
  paragraphs: ["array of strings"],
  approach: {
    title: "string",
    items: ["array of objects"]
  },
  teamImage: "media",
  quote: "string"
}
```

### Service Page Content
```javascript
{
  seo: { ... },
  heading: "string",
  focusTitle: "string",
  focusLead: "string",
  cards: [
    {
      icon: "string",
      title: "string",
      description: "string",
      features: ["array of strings"]
    }
  ],
  cta: {
    title: "string",
    lead: "string",
    button: { label: "string", href: "string" }
  }
}
```

### Info Page
```javascript
{
  seo: { ... },
  heading: "string",
  lead: "string",
  faqs: [
    {
      question: "string",
      answer: "string"
    }
  ],
  process: {
    title: "string",
    steps: ["array of objects"]
  },
  whyUs: {
    title: "string",
    points: ["array of objects"]
  }
}
```

### Clients Page (Our Client)
In Strapi admin: **Content Manager → Clients Page** (single type).

You will see two sections:

1. **Open Projects** — expand → under **Clients** click **Add an entry** for each client  
2. **Private Projects** — same for private-sector clients  

Each client entry (**Client** component):

| Field | Purpose |
|--------|--------|
| **clientName** | Client name on the card |
| **logo** | Upload logo image |
| **description** | Short text under the name |

```javascript
{
  seo: { metaTitle, metaDescription, shareImage },
  heading: "string",
  lead: "string",
  backgroundImage: "media (optional)",
  openProjects: {
    sectionTitle: "Open Projects",
    sectionDescription: "string",
    clients: [{ clientName, logo, description }]
  },
  privateProjects: {
    sectionTitle: "Private Projects",
    sectionDescription: "string",
    clients: [{ clientName, logo, description }]
  }
}
```

API: `GET /api/clients-page?populate=...` (frontend uses `getClientsContent`).

### Contact Page
```javascript
{
  seo: { ... },
  heading: "string",
  subheading: "string",
  lead: "string",
  buttons: {
    whatsapp: { href: "string" },
    email: { href: "string" }
  },
  info: {
    addressLines: ["array of strings"],
    phone: "string",
    email: "string",
    hours: ["array of strings"]
  },
  offers: [
    {
      label: "string",
      note: "string"
    }
  ],
  bottomCta: {
    title: "string",
    lead: "string",
    buttons: ["array of button objects"]
  }
}
```

## Troubleshooting

### 1. CMS Not Loading

- Check if Strapi backend is running on `http://localhost:1337`
- Verify permissions are set correctly in Strapi admin
- Check browser console for errors
- Ensure content is published in Strapi

### 2. Fallback to Local Content

If you see local content instead of CMS content:
- Check the browser console for warnings
- Verify the CMS configuration
- Ensure the content type exists in Strapi

### 3. Performance Issues

- Check cache settings in `src/config/cms.js`
- Monitor network requests in browser dev tools
- Consider increasing cache duration

### 4. Environment Variable Issues

- Ensure environment variables are prefixed with `VITE_`
- Restart your development server after changing `.env` file
- Check that the `.env` file is in the correct location

## Development Workflow

1. **Content Updates**: Make changes in Strapi admin panel
2. **Frontend Development**: Use local content for development
3. **Testing**: Test with both CMS and local content
4. **Deployment**: Ensure Strapi backend is accessible in production

## Production Deployment

1. Update `VITE_STRAPI_URL` to your production Strapi URL
2. Ensure CORS is configured in Strapi
3. Set up proper authentication if needed
4. Monitor performance and adjust cache settings

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Strapi backend is running and accessible
3. Check content permissions in Strapi admin
4. Ensure all content types are properly configured
