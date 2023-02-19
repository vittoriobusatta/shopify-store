const { ApolloClient, InMemoryCache, HttpLink, gql } = require("@apollo/client");

const domain = process.env.SHOPIFY_STORE_DOMAIN;

// Storefront API Access
const storefrontApiAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const storefrontApiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

// Admin API Access
const adminApiKey = process.env.SHOPIFY_ADMIN_API_KEY;
const adminApiSecret = process.env.SHOPIFY_ADMIN_API_SECRET;
const adminApiVersion = process.env.SHOPIFY_ADMIN_API_VERSION;

// Create store client
export const storeClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/api/${storefrontApiVersion}/graphql.json`,
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontApiAccessToken,
    },
  }),
  cache: new InMemoryCache(),
});

// Create admin client
const adminClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/admin/api/${adminApiVersion}/graphql.json`,
    headers: {
      "X-Shopify-Access-Token": adminApiKey,
    },
  }),
  cache: new InMemoryCache(),
});

export async function getAllProducts() {
  const query = `
  {
    products(first: 250) {
      edges {
        node {
          handle
          id
          title
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }  
  `;

  try {
    const response = await storeClient.query({
      query: gql`
        ${query}
      `,
    });

    return response.data.products.edges.map((edge) => edge.node);
  } catch (err) {
    console.error(err);
    return [];
  }
  
}

export async function getSingleProduct(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      handle
      title
      description
      productType
      priceRange {
        minVariantPrice {
          amount
        }
      }
      compareAtPriceRange{
        minVariantPrice {amount}
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      color: metafield(namespace: "custom", key: "color") {
        value
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
  `;

  try {
    const response = await storeClient.query({
      query: gql`
        ${query}
      `,
    });

    return response.data.productByHandle;
  } catch (err) {
    console.error(err);
    return [];
  }
}

