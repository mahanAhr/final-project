"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";

export default function ProductsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Products Lists
      </Typography>

      <Grid container spacing={3}>
        {data.map((product: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", padding: 2, bgcolor: "#fafafa" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ height: 60, overflow: "hidden", fontSize: "1rem" }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.category}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mt: 2, fontWeight: "bold", color: "primary.main" }}
                >
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
