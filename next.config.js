// require('dotenv').config({
//   path: `./config/.env.${process.env.environment}`,
// });

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // swcMinify: true,
//   async rewrites() {
//     return [
//       {
//         source: '/_api/:path*',
//         destination: 'https://m.shop.interpark.com/_api/:path*',
//       },
//       {
//         source: '/main/:path*',
//         destination: 'https://m.shop.interpark.com/main/:path*',
//       },
//       {
//         source: '/quest/:path*',
//         destination: 'http://shopapi.interpark.com/quest/:path*',
//       },
//       {
//         source: '/product/:path*',
//         destination: 'http://shopapi.interpark.com/product/:path*',
//       },
//     ];
//   },
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.resolve.fallback.fs = false;
//     }

//     return {
//       ...config,
//     };
// },
// };

console.log('>> NODE_ENV        ::', process.env.NODE_ENV);
console.log('>> NEXT_PUBLIC_SHOP_URL     :: ', process.env.NEXT_PUBLIC_CODOG_FRONT_URL);
console.log('>> NEXT_PUBLIC_MSHOP_URL    :: ', process.env.NEXT_PUBLIC_CODOG_BACK_URL);

// module.exports = nextConfig;
