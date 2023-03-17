import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CART, CLEAR_CART, ADD_TO_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

function ProductForm({ product }) {
  const dispatch = useDispatch();
  const [cartResponse, setCartResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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
    image: {
      src: variant.image.url,
      alt: variant.image.altText,
    },
    price: variant.price.amount,
  };

  const handleCreateCart = async () => {
    if (cart.id === null) {
      dispatch(CREATE_CART(item)).then((res) => setCartResponse(res.payload));
    } else {
      dispatch(ADD_TO_CART(item)).then((res) => setCartResponse(res.payload));
    }
  };

  const displayPopup = () => {
    if (cartResponse) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  };

  useEffect(() => {
    displayPopup();
  }, [cartResponse]);

  const handleCheckout = async () => {
    const url = `/api/checkout/create`;
    axios
      .post(url, {
        items: cart.items,
        cartId: cart.id,
      })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          <h1>Ajouté au panier !</h1>
          <div>
            <h2>{cartResponse.item.title}</h2>
            <h3>{formatPrice(cartResponse.item.price)}</h3>
          </div>
          <Link href="/cart">
            <h3>Voir le panier {cart.quantity}</h3>
          </Link>
          <button
            onClick={() => {
              handleCheckout();
            }}
          >
            Paiement
          </button>
        </div>
      )}
      <div className="product__form">
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
      </div>
    </>
  );
}

export default ProductForm;
