import ProductPageContent from "@/components/ProductPageContent";
import { getAllProducts, getSingleProduct } from "libs/shopify";
import React from "react";

export default function ProductPage({ product }) {
  return (
    <>
      <ProductPageContent product={product} />
    </>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map((product) => ({
    params: { handle: product.node.handle },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getSingleProduct(params.handle);

  return {
    props: {
      product,
    },
  };
}
