import Image from "next/image";
import ProductForm from "./ProductForm";


export default function ProductPageContent({ product }) {
  const images = [];

  product.images.edges.forEach((image) => {
    images.push(image.node);
  });


 

  // console.log(product.variants.edges[0].node.id);

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
      <ProductForm product={product}/>
    </div>
  );
}
