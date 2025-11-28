type AvatarProps = {
  name: string;
  size?: number | string;
  fontSize?: number | string;
  radius?: number | string;
  bgColor?: string;
  textColor?: string;
};

export default function PlaceholderProfile({
  name,
  size = 35,
  fontSize,
  radius = '.35rem',
  bgColor = 'var(--color-primary-blue)', 
}: Readonly<AvatarProps>) {
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  const containerSize = window.innerWidth * 0.1; 
const fontSizeDefault = containerSize * 0.3;

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
        fontSize: fontSize || fontSizeDefault,
        textTransform: 'uppercase',
        userSelect: 'none',
        textAlign: 'center'
      }}
    >
      {getInitials(name)}
    </div>
  );
}
