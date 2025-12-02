import { Card, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import { Feature } from '@/lib/types';

interface FeatureCardProps {
  feature: Feature;
}
export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card
      variant={'ghost'}
      className="bg-[#ECF0F3] text-center flex flex-col items-center justify-center  flex-1 shrink  min-w-[300px] md:max-w-[580px] md:min-w-[500px] not-md:min-h-[400px] max-w-full"
    >
      <Card
        variant={'ghost'}
        className="bg-[#ECF0F3] text-center flex flex-col items-center justify-center shrink-0 w-full max-w-[90vw] md:max-w-[580px] md:min-w-[500px]"
      ></Card>
      <CardContent>
        <Image
          src={`/assets/images/landing-page/${feature.image}`}
          width={482}
          height={332}
          alt="user status image"
        />
      </CardContent>
      <CardDescription className="text-[#1e1e1e] max-w-[468px]">
        <h4 className="text-2xl font-medium">{feature.header}</h4>
        <p className="text-sm">{feature.description}</p>
      </CardDescription>
    </Card>
  );
}
