import React from "react";
import { ADD_TO_CART } from "redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "utils/helpers";
import { storeClient } from "libs/shopify";
import { gql } from "@apollo/client";

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

  const lineItems = cart.items.map((item) => {
    return {
      variantId: item.id,
      quantity: item.variantQuantity,
    };
  });

  async function createCheckout() {
    const lineItemsObject = cart.items.map((item) => {
      return `{
        variantId: "${item.id}",
        quantity:  ${item.variantQuantity}
      }`;
    });

    const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItemsObject}]
      }) {
        checkout {
          id
        }
      }
    }
  `;

    try {
      const response = await storeClient.mutate({
        mutation: gql`
          ${query}
        `,
      });

      return response.data.checkoutCreate.checkout.id;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  const handleAddToCart = async () => {
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
      <button type="button" onClick={createCheckout}>
        Checkout
      </button>
      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </form>
  );
}

export default ProductForm;
