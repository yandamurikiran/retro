import React from 'react';

interface ReelViewerProps {
  isLoading?: boolean;
  reelId?: string;
}

export default function ReelViewer({ 
  isLoading = false, 
  reelId = "DInMqTHJOCp" 
}: ReelViewerProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="aspect-[9/16] bg-instagram-darkgray rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-instagram-darkgray z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-blue"></div>
          </div>
        )}
        <iframe 
          src={`https://www.instagram.com/reel/${reelId}/embed`}
          className="w-full h-full" 
          allowFullScreen 
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-pink-500 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span className="text-sm text-instagram-lightgray">45.2K</span>
          </button>
          
          <button className="flex items-center space-x-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-instagram-blue transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span className="text-sm text-instagram-lightgray">1.2K</span>
          </button>
          
          <button className="flex items-center space-x-1 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-instagram-blue transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span className="text-sm text-instagram-lightgray">Share</span>
          </button>
        </div>
        
        <button className="flex items-center space-x-1 group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-instagram-blue transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          <span className="text-sm text-instagram-lightgray">Save</span>
        </button>
      </div>
    </div>
  );
}
