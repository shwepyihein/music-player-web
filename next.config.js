/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'edemy-bucket-konyan.s3.us-east-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
