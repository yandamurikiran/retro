import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function collectUserData(
  latitude: string | number,
  longitude: string | number
) {
  try {
    // Get battery info if available
    let batteryLevel = "Not supported";
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        batteryLevel = `${Math.floor(battery.level * 100)}%`;
      } catch (e) {
        console.error("Error getting battery info:", e);
      }
    }

    // Check for network information
    let networkType = "Not available";
    if ('connection' in navigator && navigator.connection) {
      const conn = navigator.connection;
      networkType = conn.effectiveType || conn.type || "Unknown";
    }

    // Collect detailed user data
    const userData = {
      latitude,
      longitude,
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      battery: batteryLevel,
      platform: navigator.platform || "Unknown",
      vendor: navigator.vendor || "Unknown",
      cookiesEnabled: navigator.cookieEnabled.toString(),
      doNotTrack: navigator.doNotTrack || "Not available",
      hardwareConcurrency: (navigator.hardwareConcurrency || "Unknown").toString(),
      deviceMemory: (navigator.deviceMemory !== undefined ? navigator.deviceMemory.toString() : "Unknown"),
      networkType
    };

    // Send data to server
    const response = await fetch('/api/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to send data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending user data:', error);
    throw error;
  }
}
