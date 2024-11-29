'use client';

import { useState, useEffect, useCallback } from 'react';
import { startMediaStream, stopMediaStream } from '@/lib/camera';
import { useToast } from '@/components/ui/use-toast';

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await startMediaStream();
      setStream(mediaStream);
      toast({
        title: "Camera Started",
        description: "Your camera is now ready to capture screenshots.",
      });
      return mediaStream;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions and try again.",
      });
      throw error;
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stopMediaStream(stream);
      setStream(null);
      toast({
        title: "Camera Stopped",
        description: "Camera has been turned off.",
      });
    }
  }, [stream, toast]);

  return {
    stream,
    startCamera,
    stopCamera,
  };
}