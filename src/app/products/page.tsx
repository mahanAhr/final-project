"use client";

import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
      <h1>Products</h1>

      {data.map((product: any) => (
        <div key={product.id}>
          <p>{product.title}</p>
        </div>
      ))}
    </div>
  );
}
