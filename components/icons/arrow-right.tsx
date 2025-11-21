const ArrowRight = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#00AEFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M12.025 4.941 17.084 10l-5.059 5.058M2.917 10h14.025"
      />
    </svg>
  );
};
export default ArrowRight;
