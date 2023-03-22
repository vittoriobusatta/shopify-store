import Image from "next/image";
import ProductDetails from "./ProductDetails";
import { useState } from "react";
import RecommendedList from "./RecommendedList";

export default function ProductPageContent({ product, allProducts }) {
  const [Loading, setLoading] = useState(true);

  const images = [];
  product.images.edges.forEach((image) => {
    images.push(image.node);
  });

  return (
    <section
      className="product"
      style={{
        "--color": product.color.value,
      }}
    >
      <div className="product__container">
        <div className="placeholder" />
        {images.map((image) => (
          <Image
            key={product.id}
            src={image.url}
            alt={image.altText}
            width={286}
            height={429}
            onLoadingComplete={() => setLoading(false)}
            className={`product__container__image ${
              !Loading ? "product__container__image--visible placeholder__image" : ""
            }
            `}
          />
        ))}
      </div>

      <ProductDetails product={product} />

      <RecommendedList current={product} allProducts={allProducts}/>
    </section>
  );
}
