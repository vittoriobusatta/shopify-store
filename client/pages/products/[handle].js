import ProductPageContent from "@/components/ProductPageContent";
import { getAllProducts, getSingleProduct } from "libs/shopify/storefront";
import React from "react";

export default function ProductPage({ product }) {
    return (
      <>
        <ProductPageContent product={product} />
      </>
    );
  }

export async function getStaticPaths() {
  const paths = (await getAllProducts()).map((product) => ({
    params: { handle: product.handle },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { product: await getSingleProduct(params.handle) } };
}
