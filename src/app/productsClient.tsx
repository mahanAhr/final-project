"use client";

import { useState } from "react";
import { useCartStore } from "./store/cartStore";

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
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

// ⭐ اینجا props رو اضافه کردم
export default function ProductsClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

  // ⭐ useQuery رو حذف کردم و از products که از props میاد استفاده می‌کنم
  const data = products;

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
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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

                <CardActions sx={{ px: 2, pb: 2 }}>
                  {!cartItem ? (
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
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <IconButton
                        color="error"
                        onClick={() => decreaseQty(product.id)}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography fontWeight="bold">
                        {cartItem.quantity}
                      </Typography>

                      <IconButton
                        color="primary"
                        onClick={() => increaseQty(product.id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}