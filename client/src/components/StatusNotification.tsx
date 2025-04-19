import React from 'react';

interface StatusNotificationProps {
  message: string;
  isError?: boolean;
}

export default function StatusNotification({ 
  message, 
  isError = false 
}: StatusNotificationProps) {
  return (
    <div 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg z-50 ${
        isError ? 'bg-instagram-red' : 'bg-gray-800'
      }`}
    >
      <span>{message}</span>
    </div>
  );
}
