import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatPrice } from "utils/helpers";

function ProductCard({ product }) {
  const { handle, title, productType } = product.node;
  const { altText, url } = product.node.images.edges[0].node;
  const { amount } = product.node.priceRange.minVariantPrice;


  return (
    <li>
      <Link href={`/products/${handle}`}>
        <Image width={286} height={429} src={url} alt={altText} priority />
      </Link>
      <div className="products__details">
        <div className="products__details__row">
          <h3>{title}</h3>
          <p className="products__price">{formatPrice(amount)}</p>
        </div>
        <div className="products__details__row">
          <h4>{productType}</h4>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
