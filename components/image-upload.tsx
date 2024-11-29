'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DeviceFrame } from './device-frame';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [device, setDevice] = useState<'iphone14' | 'iphone14pro' | 'pixel7' | 'ipad'>('iphone14pro');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
  });

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

      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center hover:border-primary/50 ${
          isDragActive ? 'border-primary' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop your screenshots here, or click to select files
        </p>
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <DeviceFrame key={file.name} device={device}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover"
              />
            </DeviceFrame>
          ))}
        </div>
      )}
    </div>
  );
}