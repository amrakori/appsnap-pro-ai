'use client';

import { cn } from '@/lib/utils';

interface DeviceFrameProps {
  children: React.ReactNode;
  device: 'iphone14' | 'iphone14pro' | 'pixel7' | 'ipad';
  className?: string;
}

export function DeviceFrame({ children, device, className }: DeviceFrameProps) {
  const frames = {
    iphone14: {
      width: 'w-[320px]',
      height: 'h-[690px]',
      padding: 'p-4',
      radius: 'rounded-[55px]',
      notch: 'after:w-[40%] after:h-[25px] after:bg-black after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:rounded-b-3xl',
    },
    iphone14pro: {
      width: 'w-[320px]',
      height: 'h-[690px]',
      padding: 'p-4',
      radius: 'rounded-[55px]',
      notch: 'after:w-[30%] after:h-[35px] after:bg-black after:absolute after:top-2 after:left-1/2 after:-translate-x-1/2 after:rounded-2xl',
    },
    pixel7: {
      width: 'w-[320px]',
      height: 'h-[690px]',
      padding: 'p-4',
      radius: 'rounded-[45px]',
      notch: 'after:w-[25%] after:h-[25px] after:bg-black after:absolute after:top-2 after:left-1/2 after:-translate-x-1/2 after:rounded-full',
    },
    ipad: {
      width: 'w-[420px]',
      height: 'h-[590px]',
      padding: 'p-6',
      radius: 'rounded-[25px]',
      notch: '',
    },
  };

  const frameStyle = frames[device];

  return (
    <div
      className={cn(
        'relative bg-black',
        frameStyle.width,
        frameStyle.height,
        frameStyle.radius,
        frameStyle.notch,
        className
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-3xl bg-white">
        {children}
      </div>
    </div>
  );
}