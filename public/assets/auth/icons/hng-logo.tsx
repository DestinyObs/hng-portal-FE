import Image from 'next/image';

export function HngLogo() {
  return (
    <Image
      src="/images/hng-logo.png"
      alt="HNG Portal"
      width={180}
      height={40}
    />
  );
}
