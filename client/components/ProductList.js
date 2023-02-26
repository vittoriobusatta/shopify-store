import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
