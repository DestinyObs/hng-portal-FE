import React from 'react';

const RocketIcon = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" // enables dynamic stroke color from ServiceCard
    >
      <rect width="60" height="60" rx="8" fill="#EEEEEE" />

      <path
        d="M25 29.2947C30.284 19.4466 36.8635 19.333 39.4928 20.5072C40.667 23.1365 40.5534 29.716 30.7053 35C30.6031 34.4129 30.0352 32.8749 28.5801 31.4199C27.1251 29.9648 25.5871 29.3969 25 29.2947Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 34.8C34.0428 35.7334 34.2609 37.4069 34.5439 39C34.5439 39 38.8223 36.0481 36.0856 32"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.2 28C24.2666 25.9572 22.5931 25.7391 21 25.4561C21 25.4561 23.9519 21.1777 28 23.9144"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.2086 32C23.5768 32.6319 22.5025 34.4644 23.2608 36.7392C25.5356 37.4975 27.3681 36.4233 28 35.7914"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.0948 25.7535C36.0948 24.7333 35.2678 23.9062 34.2476 23.9062C33.2274 23.9062 32.4004 24.7333 32.4004 25.7535C32.4004 26.7737 33.2274 27.6007 34.2476 27.6007C35.2678 27.6007 36.0948 26.7737 36.0948 25.7535Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default RocketIcon;