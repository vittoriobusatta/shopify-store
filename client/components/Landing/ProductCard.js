import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { formatPrice } from "utils/helpers";

function ProductCard({ product }) {
  const { handle, title } = product;
  const { altText, url } = product.images.edges[0].node;
  const { amount } = product.priceRange.minVariantPrice;
  const [Loading, setLoading] = useState(true);

  return (
    <li className="landing__item">
      <Link className="landing__item__picture" href={`/products/${handle}`}>
        <div className="placeholder" />
        <Image
          width={286}
          height={429}
          src={url}
          alt={altText}
          priority
          onLoadingComplete={() => setLoading(false)}
          className={`landing__item__picture__img ${
            !Loading ? "landing__item__picture__img--visible placeholder__image" : ""
          }`}
        />
      </Link>

      <div className="landing__item__details">
        <div className="landing__item__details__name">
          <h3>{title}</h3>
        </div>
        <div className="landing__item__details__price">
          <p>{formatPrice(amount)}</p>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
