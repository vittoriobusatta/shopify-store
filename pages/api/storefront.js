export async function storefront (query, variables = {}) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCES_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );
  const json = await response.json();
  return json;
}