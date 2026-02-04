import productsClient from "./productsClient";
import { ComponentType } from "react";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  const ProductsClient = productsClient as ComponentType<{
    products: any;
  }>;

  return <ProductsClient products={products} />;
}
