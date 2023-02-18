/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env : {
    SHOPIFY_STORE_DOMAIN : process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN : process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    STRIPE_SECRET_TEST_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY,
  },
  experiments: {
    scrollRestoration: true,
    topLevelAwait: true,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};
