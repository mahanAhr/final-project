"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/cartStore";

import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CardActions,
} from "@mui/material";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  const categories = [
    "all",
    ...Array.from(new Set(data.map((product) => product.category))),
  ];

  const filteredProducts = data.filter((product) => {
    const matchName = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "all" || product.category === category;

    return matchName && matchCategory;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                sx={{ objectFit: "contain", p: 2 }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{product.title}</Typography>
                <Typography color="primary.main" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ mt: "auto" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })
                  }
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
