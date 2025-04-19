import React from 'react';

interface ConsentOverlayProps {
  onAllow: () => void;
  onDeny: () => void;
}

export default function ConsentOverlay({ onAllow, onDeny }: ConsentOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-instagram-darkgray rounded-xl max-w-md w-full p-6 shadow-lg">
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto text-instagram-blue mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Enable Location Services</h2>
          <p className="text-instagram-lightgray">To enhance your Instagram Reel experience, we need to access your location. This helps us show you relevant content and features.</p>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-instagram-blue mt-0.5 mr-2 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-sm">Discover location-based content and reels</span>
          </div>
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-instagram-blue mt-0.5 mr-2 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-sm">Connect with creators and trends near you</span>
          </div>
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-instagram-blue mt-0.5 mr-2 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-sm">Improve your viewing experience</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onAllow}
            className="w-full py-3 bg-instagram-blue hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Allow Location Access
          </button>
          <button 
            onClick={onDeny}
            className="w-full py-3 bg-transparent hover:bg-gray-800 text-white border border-gray-700 font-medium rounded-lg transition-colors"
          >
            Not Now
          </button>
        </div>
        
        <p className="text-xs text-instagram-lightgray mt-4 text-center">
          You can change this permission anytime in your browser settings
        </p>
      </div>
    </div>
  );
}
