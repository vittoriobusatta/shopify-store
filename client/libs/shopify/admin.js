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

// Create store admin API
export const adminClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/admin/api/${storefrontApiVersion}/graphql.json`,
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontApiAccessToken,
    },
  }),
  cache: new InMemoryCache(),
});

export async function createDraftOrder(lineItems, billingAddress, shippingAddress, email) {
  const query = `
    mutation {
      draftOrderCreate(input: {
        lineItems: ${lineItems},
        billingAddress: ${billingAddress},
        shippingAddress: ${shippingAddress},
        email: ${email}
      }) {
        draftOrder {
          id
          order
          ready
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  try {
    const response = await adminClient.mutate({
      mutation: gql`
        ${query}
      `,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
