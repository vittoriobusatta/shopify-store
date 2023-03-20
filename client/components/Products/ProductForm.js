import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CART, ADD_TO_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

const ProductQuantity = ({ quantityAvailable }) => {
  if (quantityAvailable <= 10) {
    return (
      <span className="product_quantity">
        Seulement {quantityAvailable} en stock
      </span>
    );
  }
  return <span className="product_quantity">En stock</span>;
};

function ProductForm({ product }) {
  const dispatch = useDispatch();
  const [cartResponse, setCartResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const popupTimeout = useRef(null);
  const [productQuantity, setProductQuantity] = useState(1);

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
    setIsProcessing(true);

    const existingItem = cart.items.find(
      (product) => product.item.id === variant.id
    );

    if (existingItem && existingItem.line.node.quantity >= 10) {
      alert("La quantité maximale de ce produit est de 10.");
      return;
    }

    if (cart.id === null) {
      dispatch(CREATE_CART(item))
        .then((res) => setCartResponse(res.payload))
        .finally(() => setIsProcessing(false));
    } else {
      dispatch(ADD_TO_CART(item))
        .then((res) => setCartResponse(res.payload))
        .finally(() => setIsProcessing(false));
    }
  };

  const displayPopup = () => {
    if (cartResponse) {
      if (popupTimeout.current) {
        clearTimeout(popupTimeout.current);
      }
      setShowPopup(true);
      popupTimeout.current = setTimeout(() => {
        setShowPopup(false);
      }, 4000);
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
          <h1
            onClick={() => {
              setShowPopup(false);
            }}
          >
            CLOSE
          </h1>
          <div>
            <h2>{cartResponse.item.title}</h2>
            <h3>{formatPrice(cartResponse.item.price)}</h3>
          </div>

          <Link href="/cart">
            <button>Voir le panier ({cart.quantity})</button>
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
        <ProductQuantity quantityAvailable={variant.quantityAvailable} />
        {/* <div className="product__quantity">
          <button
            onClick={() => {
              if (productQuantity > 1) {
                setProductQuantity(productQuantity - 1);
              }
            }}
          >
            -
          </button>
          <p>{productQuantity}</p>
          <button
            onClick={() => {
              if (productQuantity < variant.quantityAvailable) {
                setProductQuantity(productQuantity + 1);
              }
            }}
          >
            +
          </button>
        </div> */}
      </div>
      <button type="button" onClick={handleCreateCart} disabled={isProcessing}>
        Add to cart
      </button>
    </>
  );
}

export default ProductForm;
