import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "./providers";
import ProductsClient from "./ProductsClient";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Providers dehydratedState={dehydratedState}>
      <ProductsClient />
    </Providers>
  );
}
