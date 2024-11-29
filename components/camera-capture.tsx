'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Loader2 } from 'lucide-react';
import { DeviceFrame } from './device-frame';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCamera } from '@/hooks/use-camera';
import { captureScreenshot } from '@/lib/screenshot';
import { useToast } from '@/components/ui/use-toast';

export function CameraCapture() {
  const { stream, startCamera, stopCamera } = useCamera();
  const [device, setDevice] = useState<'iphone14' | 'iphone14pro' | 'pixel7' | 'ipad'>('iphone14pro');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleStartCamera = async () => {
    try {
      const mediaStream = await startCamera();
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Failed to start camera:', error);
    }
  };

  const handleCaptureScreenshot = async () => {
    if (!frameRef.current) return;

    setIsCapturing(true);
    try {
      const dataUrl = await captureScreenshot(frameRef.current);
      setScreenshots(prev => [...prev, dataUrl]);
      toast({
        title: "Screenshot Captured",
        description: "Your screenshot has been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Capture Failed",
        description: "Failed to capture screenshot. Please try again.",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const deleteScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Screenshot Deleted",
      description: "The screenshot has been removed.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={device} onValueChange={(value: any) => setDevice(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iphone14">iPhone 14</SelectItem>
            <SelectItem value="iphone14pro">iPhone 14 Pro</SelectItem>
            <SelectItem value="pixel7">Pixel 7</SelectItem>
            <SelectItem value="ipad">iPad</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <div ref={frameRef}>
          <DeviceFrame device={device}>
            {stream ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <Button onClick={handleStartCamera}>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              </div>
            )}
          </DeviceFrame>
        </div>
      </div>

      {stream && (
        <div className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={stopCamera}>
            Stop Camera
          </Button>
          <Button onClick={handleCaptureScreenshot} disabled={isCapturing}>
            {isCapturing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Capturing...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Capture Screenshot
              </>
            )}
          </Button>
        </div>
      )}

      {screenshots.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {screenshots.map((screenshot, index) => (
            <Card key={index} className="group relative p-2">
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="aspect-[9/16] w-full rounded-md object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => deleteScreenshot(index)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}