import { ImageResponse } from 'next/og';


export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sizeParam = searchParams.get('size');
  const size = parseInt(sizeParam || '192', 10);
  const iconSize = size * 0.6; // Scale down the SVG inside the square

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#000000',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={iconSize} height={iconSize} fill="none">
          <path d="M16 2L2 9.5V22.5L16 30L30 22.5V9.5L16 2Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 9.5L16 17L30 9.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 30V17" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 13.5V20.5L16 24V17L10 13.5Z" fill="#ffffff" fillOpacity="0.2" />
          <path d="M22 13.5V20.5L16 24V17L22 13.5Z" fill="#ffffff" fillOpacity="0.4" />
          <path d="M16 17L10 13.5L16 10L22 13.5L16 17Z" fill="#ffffff" />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
