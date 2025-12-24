"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCartStore();

  if (!mounted) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#9e9e9e" }}>
              {[
                "Number",
                "Title",
                "Category",
                "Quantity",
                "Price",
                "Total Price",
                "",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell>{index + 1}</TableCell>

                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.title}
                </TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    sx={{ background: "#f44336", color: "#fff", mr: 1 }}
                    onClick={() => decreaseQty(item.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    component="span"
                    sx={{ mx: 1, fontWeight: "bold" }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{ background: "#2196f3", color: "#fff", ml: 1 }}
                    onClick={() => increaseQty(item.id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </TableCell>

                <TableCell>${item.price.toFixed(2)}</TableCell>

                <TableCell>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                ${total.toFixed(2)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
