'use client';

import { toPng } from 'html-to-image';

export async function captureScreenshot(element: HTMLElement): Promise<string> {
  try {
    // Wait for a moment to ensure the frame is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw new Error('Failed to capture screenshot');
  }
}