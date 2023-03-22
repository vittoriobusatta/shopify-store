import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <section className="landing">
      <h1 className="landing__title">
        <span>Best Seller</span>
        <span>Hijab Collection</span>
      </h1>
      <ul className="landing__list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
