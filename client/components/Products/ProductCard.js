import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatPrice } from "utils/helpers";

function ProductCard({ product }) {
  const { handle, title, productType } = product;
  const { altText, url } = product.images.edges[0].node;
  const { amount } = product.priceRange.minVariantPrice;
  const [Loading, setLoading] = useState(true);

  return (
    <li>
      <Link className="products__image" href={`/products/${handle}`}>
        <div className="products__image__placeholder" />
        <Image
            width={286}
            height={429}
            src={url}
            alt={altText}
            priority
            onLoadingComplete={() => setLoading(false)}
            className={`products__image__img ${
              !Loading ? "products__image__img--visible" : ""
            }`}
          />
      </Link>

      {/* <div className="products__details">
        <div className="products__details__row">
          <h3>{title}</h3>
        </div>
        <div className="products__details__row">
          <p className="products__price">{formatPrice(amount)}</p>
        </div>
      </div> */}
    </li>
  );
}

export default ProductCard;
