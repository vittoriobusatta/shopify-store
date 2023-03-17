import Image from "next/image";
import ProductForm from "./ProductForm";
import { useState } from "react";

export default function ProductPageContent({ product }) {
  const [Loading, setLoading] = useState(true);

  const images = [];
  product.images.edges.forEach((image) => {
    images.push(image.node);
  });

  return (
    <section
      className="page__product"
      style={{
        "--color": product.color.value,
      }}
    >
      <h1 className="product__title">{product.title}</h1>
      <div className="product_container">
        <div className="products__image__placeholder" />
        {images.map((image) => (
          <Image
            key={product.id}
            src={image.url}
            alt={image.altText}
            width={286}
            height={429}
            onLoadingComplete={() => setLoading(false)}
            priority
            className={`product__image__img ${
              !Loading ? "product__image__img--visible" : ""
            }
            `}
          />
        ))}
      </div>

      <ProductForm product={product} />
    </section>
  );
}
