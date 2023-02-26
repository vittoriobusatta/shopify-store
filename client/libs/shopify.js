const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} = require("@apollo/client");

const domain = process.env.SHOPIFY_STORE_DOMAIN;

// Storefront API Access
const storefrontApiAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const storefrontApiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

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

export async function createCheckout(lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`;
  });

  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItemsObject}]
      }) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const response = await storeClient.mutate({
      mutation: gql`
        ${query}
      `,
    });

    return response.data.checkoutCreate.checkout.id;
  } catch (err) {
    console.error(err);
    return [];
  }
}
