import Image from 'next/image';
import React from 'react';

export function HngLogo() {
  return (
    <Image
      src="/images/hng-logo-2.png"
      alt="HNG Portal"
      width={180}
      height={40}
    />
  );
}
