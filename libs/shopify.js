const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// This function will fetch data from your Shopify store
async function shopifyData(query) {
  // Define the URL for your store
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  try {
    // Make a POST request to the URL
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    // Convert the response to JSON
    const data = await response.json();

    // Return the data
    return data;
  } catch (err) {
    console.log(err, "Problem fetching data from Shopify");
  }
}

// export async function getProductsInCollection() {
//   // Get all products in the collection
//   const query = `
//   {
//     collection(handle: "hijab-jersey") {
//       title
//       products(first: 25) {
//         edges {
//           node {
//             id
//             title
//             handle
//             priceRange {
//               minVariantPrice {
//                 amount
//                 currencyCode
//               }
//             }
//             images(first: 5) {
//               edges {
//                 node {
//                   url
//                   altText
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   `;

//   const response = await shopifyData(query);

//   // Check if any products were returned
//   const allProducts = response.data.collection.products.edges
//     ? response.data.collection.products.edges
//     : [];

//   return allProducts;
// }

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

  const response = await shopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getSingleProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  productType
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
        }
    	}
      id
      title
      handle
      description
      color: metafield(namespace: "custom", key: "color") {
        value
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
            color: metafield(namespace: "custom", key: "color") {
              value
            }
          }
        }
      }
    }
  }`;

  const response = await shopifyData(query);

  const product = response.data.product ? response.data.product : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
  mutation {
    checkoutCreate(input: {
      lineItems: [{variantId: "${id}", quantity: ${quantity}}]
    }) {
      checkout {
        id
        webUrl
      }
    }
  }
  `;

  const response = await shopifyData(query);


  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }
  `;
  const response = await shopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function getCheckout(id) {
  const query = `
    {
      node(id: "${id}") {
        ... on Checkout {
          id
          completedAt
          createdAt
          updatedAt
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyData(query);

  if (!response.data) {
    throw new Error("La requête GraphQL n'a pas réussi.");
  }

  const checkout = response.data.node ? response.data.node : [];

  return checkout;
}


