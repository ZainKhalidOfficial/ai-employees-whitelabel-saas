/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // experimental: {
  //   serverActions: true,
  // },
  //oaidalleapiprodscus.blob.core.windows.net
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "public.blob.vercel-storage.com",
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: "qvog6upgamt6c3fm.public.blob.vercel-storage.com",
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: '/**'
      },
      {
        hostname: "res.cloudinary.com",
        pathname: '/**'
      },
      {
        hostname: "abs.twimg.com",
        pathname: '/**'
      },
      {
        hostname: "pbs.twimg.com",
        pathname: '/**'
      },
      {
        hostname: "avatar.vercel.sh",
        pathname: '/**'
      },
      {
        hostname: "avatars.githubusercontent.com",
        pathname: '/**'
      },
      {
        hostname: "www.google.com",
        pathname: '/**'
      },
      {
        hostname: "flag.vercel.app",
        pathname: '/**'
      },      
      {
        hostname: "illustrations.popsy.co",
        pathname: '/**'
      },   
      {
        hostname: "res.cloudinary.com",
        pathname: '/**'
      },   
    ],
  },
  reactStrictMode: false,
};
