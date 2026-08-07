/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        port: '',
        pathname: '/**', // Разрешает любые пути на этом сервере
      },
    ],
  },
};

module.exports = nextConfig;
