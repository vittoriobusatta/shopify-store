import { getCheckout } from "libs/shopify";
import Image from "next/image";
import ProductForm from "./ProductForm";

export default function ProductPageContent({ product }) {
  const images = [];

  product.images.edges.forEach((image) => {
    images.push(image.node);
  });

  // console.log(product.variants.edges[0].node.id);

  // recuperer l'id de la commande
  const checkoutId = "gid://shopify/Checkout/9ef7a433760d3515c3c01048b032da9f?key=fb5c680607f0b11c8c6a10b02a3867fb"

  getCheckout(checkoutId).then((checkout) => {
    console.log(checkout);
  });

  return (
    <section
      className="page__product"
      style={{
        "--color": product.color.value,
      }}
    >
      <h1 className="product__title">{product.title}</h1>
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
      <ProductForm product={product} />
    </section>
  );
}
