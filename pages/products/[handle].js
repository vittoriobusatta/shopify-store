import Cart from "@/components/Cart";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, gql, storefront } from "pages/api/storefront";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "utils/slice";

export async function getStaticPaths() {
  const { data } = await storefront(
    gql`
      {
        products(first: 8) {
          edges {
            node {
              handle
              id
            }
          }
        }
      }
    `
  );
  return {
    paths: data.products.edges.map(({ node }) => ({
      params: {
        handle: node.handle,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await storefront(singleProductQuery(params.handle));
  return {
    props: {
      singleProduct: data.productByHandle,
      products: data.products,
    },
  };
}

const singleProductQuery = (handle) => gql`
{
productByHandle(handle: "${handle}") {
    id
    title
    handle
    description
    priceRange {
      minVariantPrice {
        amount
      }
    }
    images(first: 1) {
    edges {
        node {
        url
        altText
        }
    }
    }
}
products(first: 8) {
  edges {
    node {
      id
      title
      handle
      productType
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
}
}
`;

function Products({ singleProduct, products }) {
  const image = singleProduct.images.edges[0].node;
  const product = singleProduct;
  const price = singleProduct.priceRange;
  const [slicedProducts, setSlicedProducts] = useState([]);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const relatedProducts = products.edges
      .filter((product) => product.node.handle !== singleProduct.handle)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setSlicedProducts(relatedProducts);
  }, [products, singleProduct]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const alreadyInCart = cart.items.find(
      (item) => item.id === singleProduct.id
    );
  
    if (!alreadyInCart) {
      dispatch(addToCart(singleProduct));
    }
  };
  

  return (
    <>
      <Head>
        <title>{product.title} | Oukthy Shop </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Generated by create next app"
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.example.com" />
      </Head>

      <Cart />

      <section>
        <div className="products__inner">
          <h1>{product.title}</h1>
          <Image
            width={286}
            height={429}
            src={image.url}
            alt={image.altText}
            className="products__inner__image"
            priority
            style={{
              height: "auto",
              width: "auto",
            }}
          />
          <p>{formatPrice(price.minVariantPrice.amount)}</p>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
        <div className="products__related">
          <h2>Related Products</h2>
          <div className="products__related__inner">
            {slicedProducts.map(({ node }) => (
              <div key={node.handle} className="products__related__inner__item">
                <Link href={`/products/${node.handle}`}>
                  <Image
                    width={286}
                    height={429}
                    src={node.images.edges[0].node.url}
                    alt={node.images.edges[0].node.altText}
                    priority
                    style={{
                      height: "auto",
                      width: "auto",
                    }}
                  />
                </Link>
                <h3>{node.title}</h3>
                <p>{formatPrice(node.priceRange.minVariantPrice.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
