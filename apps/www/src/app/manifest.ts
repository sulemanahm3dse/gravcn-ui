import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GravCN UI',
    short_name: 'GravCN',
    description: 'A beautiful, accessible, and customizable UI library.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/api/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/api/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }
    ],
  };
}
