import React, { useState } from "react";
import {ADD_TO_CART } from "redux/slice";
import { useDispatch } from "react-redux";

function ProductForm({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const allVariantsOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};

    variant.node.selectedOptions.map((option) => {
      allOptions[option.name] = option.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      images: variant.node.image?.url,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantsOptions[0]);

  return (
    <div>
      <button
        onClick={() => handleAddToCart(selectedVariant)}
        className="product__button"
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductForm;
