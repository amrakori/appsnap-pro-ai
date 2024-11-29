import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/image-upload';
import { AIGeneration } from '@/components/ai-generation';
import { CameraCapture } from '@/components/camera-capture';
import { ModeToggle } from '@/components/mode-toggle';
import { Camera, Upload, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold">AppSnap Pro</h1>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      <div className="container px-4 py-8">
        <Card className="p-6">
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>AI Generate</span>
              </TabsTrigger>
              <TabsTrigger value="camera" className="space-x-2">
                <Camera className="h-4 w-4" />
                <span>Camera</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <ImageUpload />
            </TabsContent>
            <TabsContent value="ai">
              <AIGeneration />
            </TabsContent>
            <TabsContent value="camera">
              <CameraCapture />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}