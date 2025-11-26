import Image from 'next/image';
import React from 'react';

export function HngLogo() {
  return (
    <Image
      src="/images/hng-connect-logo.png"
      alt="HNG Connect"
      width={180}
      height={40}
    />
  );
}
