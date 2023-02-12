/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SHOPYFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPYFY_STOREFRONT_ACCESS_TOKEN,
    SHOPYFY_STOREFRONT_DOMAIN: process.env.SHOPYFY_STOREFRONT_DOMAIN,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};
