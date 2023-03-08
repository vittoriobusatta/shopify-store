import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CART, CLEAR_CART, ADD_TO_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

function ProductForm({ product }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const variants = [];
  product.variants.edges.forEach((variant) => {
    variants.push(variant.node);
  });

  let variant = variants.find((variant) => variant.availableForSale);
  if (!variant) {
    variant = variants[0];
  }

  const item = {
    id: variant.id,
    title: product.title,
    handle: product.handle,
    variantQuantity: 1,
    cartId: cart.id,
  };

  const handleCreateCart = async () => {
    if (cart.id === null) {
      dispatch(CREATE_CART(item));
    } else {
      dispatch(ADD_TO_CART(item));
    }
  };

  return (
    <form className="product__form">
      <h1>{product.title}</h1>
      <p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
      {product.compareAtPriceRange.minVariantPrice.amount > 0 && (
        <p className="product__price--old">
          {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
        </p>
      )}
      <button type="button" onClick={handleCreateCart}>
        Add to cart
      </button>
      <button
        onClick={() => {
          dispatch(CLEAR_CART());
        }}
      >
        Clear cart
      </button>
    </form>
  );
}

export default ProductForm;
