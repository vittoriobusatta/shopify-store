import Image from "next/image";
import { addToCart, clearCart, setQuantity } from "redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "libs/shopify";

export default function ProductPageContent({ product }) {
  const images = [];

  product.images.edges.forEach((image) => {
    images.push(image.node);
  });

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const cart = useSelector((state) => state.cart);
  

  return (
    <div>
      <h1
        className="product__title"
        style={{
          "--color": product.color.value,
        }}
      >
        {product.title}
      </h1>
      <div>
        {images.map((image) => (
          <Image
            key={product.id}
            src={image.url}
            alt={image.altText}
            width={286}
            height={429}
            priority
          />
        ))}
      </div>
      <button
       onClick={handleAddToCart}
        className="product__button"
      >
        Add to cart
      </button>
      
      <button
        onClick={() => createCheckout(cart)}>Looo</button>
        
    </div>
  );
}
