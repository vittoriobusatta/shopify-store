import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <>
      <h1 className="landing__title">
        <span>Best Seller</span>
        <span>Hijab Collection</span>
      </h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
