/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "quebec-ats-f66o.onrender.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
