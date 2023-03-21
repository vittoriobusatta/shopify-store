import ProductPageContent from "@/components/Products/ProductPageContent";
import { getAllProducts, getSingleProduct } from "libs/shopify/storefront";
import React from "react";

export default function ProductPage({ product, allProducts }) {
  return (
    <>
      <ProductPageContent product={product} allProducts={allProducts}/>
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
  const allProducts = await getAllProducts();
  return {
    props: {
      product: await getSingleProduct(params.handle),
      allProducts,
    },
  };
}
