import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <>
      <h1 className="landing__title">Hijab Collection</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
