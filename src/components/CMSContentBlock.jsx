import React from 'react';

const CMSContentBlock = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  isLoading = false, 
  error = null 
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="h-16 md:h-20 bg-gray-600 rounded mb-6 w-3/4"></div>
        
        {/* Subtitle skeleton */}
        <div className="h-8 bg-gray-600 rounded mb-4 w-1/2"></div>
        
        {/* Description skeleton - multiple lines */}
        <div className="space-y-3 mb-8">
          <div className="h-6 bg-gray-600 rounded w-full"></div>
          <div className="h-6 bg-gray-600 rounded w-5/6"></div>
          <div className="h-6 bg-gray-600 rounded w-4/5"></div>
          <div className="h-6 bg-gray-600 rounded w-3/4"></div>
        </div>
        
        {/* Image skeleton */}
        <div className="h-64 md:h-96 bg-gray-600 rounded-lg mt-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-semibold mb-2">
          Error loading content
        </div>
        <div className="text-gray-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tech-text-gradient leading-tight">
          {title}
        </h1>
      )}
      
      {subtitle && (
        <h2 className="text-xl md:text-2xl font-semibold text-tech-600">
          {subtitle}
        </h2>
      )}
      
      {description && (
        <div className="text-lg md:text-xl text-accent-600 leading-relaxed max-w-4xl">
          {description}
        </div>
      )}
      
      {image && (
        <div className="mt-8">
          <img 
            src={image} 
            alt={title || 'CMS Content'} 
            className="w-full h-auto rounded-lg shadow-2xl"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default CMSContentBlock; 