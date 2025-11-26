import * as React from 'react';

const FindJobsMessageIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17 2.75c1.615 0 3.076.403 4.136 1.388 1.07.993 1.614 2.47 1.614 4.362v7c0 1.893-.544 3.369-1.614 4.362-1.06.985-2.521 1.388-4.136 1.388H7c-1.615 0-3.076-.403-4.136-1.388-1.07-.993-1.614-2.47-1.614-4.362v-7c0-1.893.544-3.369 1.614-4.362C3.924 3.153 5.385 2.75 7 2.75zM7.003 9.008l3.125 2.496.006.005c.497.405 1.172.62 1.866.62.69 0 1.359-.214 1.87-.624l.002-.001 3.123-2.495.001-.004V9l-.002-.002-3.126 2.498c-.537.43-1.224.621-1.873.621-.65 0-1.338-.19-1.875-.622L7.003 9.003z"
        stroke="#737373"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default FindJobsMessageIcon;
