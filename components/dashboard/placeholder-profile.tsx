import clsx from 'clsx';

type AvatarProps = {
  name: string;
  size?: number | string;
  className?: string;
  radius?: number | string;
  bgColor?: string;
  textColor?: string;
};

export default function PlaceholderProfile({
  name,
  size = 35,
  className,
  radius = '.35rem',
  bgColor = 'var(--color-primary-blue)',
}: Readonly<AvatarProps>) {
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        // fontSize: fontSize || fontSizeDefault,
        textTransform: 'uppercase',
        userSelect: 'none',
        textAlign: 'center',
      }}
      className={clsx(className)}
    >
      {getInitials(name)}
    </div>
  );
}
