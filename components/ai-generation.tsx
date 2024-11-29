'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateImage } from '@/lib/openai';
import { DeviceFrame } from './device-frame';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export function AIGeneration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [device, setDevice] = useState<'iphone14' | 'iphone14pro' | 'pixel7' | 'ipad'>('iphone14pro');
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await generateImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError('Failed to generate image. Please try again.');
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Could not generate the image. Please try again.",
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while generating the image.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <Textarea
          placeholder="Describe your app screenshot (e.g., 'A professional showing productivity features of the app on an iPhone 14 Pro')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="mt-4 flex items-center gap-4">
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
          <Button onClick={handleGenerate} disabled={!prompt || loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Screenshot
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </Card>

      {generatedImage && (
        <div className="flex justify-center">
          <DeviceFrame device={device}>
            <img
              src={generatedImage}
              alt="Generated screenshot"
              className="h-full w-full object-cover"
            />
          </DeviceFrame>
        </div>
      )}
    </div>
  );
}