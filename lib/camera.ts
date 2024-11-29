'use client';

export async function startMediaStream(): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1024 },
        height: { ideal: 1792 },
        facingMode: 'environment'
      }
    });
  } catch (error) {
    console.error('Error accessing camera:', error);
    throw new Error('Could not access camera');
  }
}

export function stopMediaStream(stream: MediaStream) {
  stream.getTracks().forEach(track => track.stop());
}