import React from "react";
import { ADD_TO_CART } from "redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "utils/helpers";

function ProductForm({ product }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const variants = [];
  product.variants.edges.forEach((variant) => {
    variants.push(variant.node);
  });

  let variant = variants.find((variant) => variant.availableForSale);
  if (!variant) {
    variant = variants[0];
  }

  const handleAddToCart = () => {
    dispatch(
      ADD_TO_CART({
        id: variant.id,
        title: product.title,
        handle: product.handle,
        images: {
          url: product.images.edges[0].node.url,
          altText: product.images.edges[0].node.altText,
        },
        variantPrice: variant.price.amount,
        variantQuantity: 1,
      })
    );
  };

  const quantityOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <form className="product__form">
      <h1>{product.title}</h1>
      <p>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
      {product.compareAtPriceRange.minVariantPrice.amount > 0 && (
        <p className="product__price--old">
          {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
        </p>
      )}
      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </form>
  );
}

export default ProductForm;
