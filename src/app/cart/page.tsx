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
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { cart, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ p: { xs: 0.5, sm: 2 } }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table
          stickyHeader
          sx={{
            minWidth: { xs: 480, sm: 600, md: 700 },
          }}
        >
          <TableHead>
            <TableRow>
              {["#", "Title", "Cat", "Qty", "Price", "Total", ""].map(
                (head, index) => (
                  <TableCell
                    key={head}
                    sx={{
                      backgroundColor: "#9e9e9e",
                      color: "#fff",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",

                      position: index === 0 ? "sticky" : "static",
                      left: index === 0 ? 0 : "auto",
                      zIndex: 3,

                      fontSize: { xs: 11, sm: 14 },
                      padding: { xs: "4px 6px", sm: "10px 12px" },
                      minWidth: index === 0 ? 45 : { xs: 75, sm: 110 },
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                }}
              >
                
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    position: "sticky",
                    left: 0,
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                    zIndex: 2,
                    whiteSpace: "nowrap",
                    fontSize: { xs: 11, sm: 14 },
                    padding: { xs: "4px 6px", sm: "10px 12px" },
                  }}
                >
                  {index + 1}
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: 11, sm: 14 },
                    padding: { xs: "4px 6px", sm: "10px 12px" },
                  }}
                >
                  {item.title}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: { xs: 11, sm: 14 },
                    padding: { xs: "4px 6px", sm: "10px 12px" },
                  }}
                >
                  {item.category}
                </TableCell>

              
                <TableCell
                  sx={{
                    padding: { xs: "2px 4px", sm: "8px 10px" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        background: "#f44336",
                        color: "#fff",
                        padding: { xs: "3px", sm: "6px" },
                      }}
                      onClick={() => decreaseQty(item.id)}
                    >
                      <RemoveIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />
                    </IconButton>

                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: 11, sm: 14 },
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      sx={{
                        background: "#2196f3",
                        color: "#fff",
                        padding: { xs: "3px", sm: "6px" },
                      }}
                      onClick={() => increaseQty(item.id)}
                    >
                      <AddIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: { xs: 11, sm: 14 },
                    padding: { xs: "4px 6px", sm: "10px 12px" },
                  }}
                >
                  ${item.price.toFixed(2)}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: { xs: 11, sm: 14 },
                    padding: { xs: "4px 6px", sm: "10px 12px" },
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>

                <TableCell
                  sx={{
                    padding: { xs: "2px 4px", sm: "8px 10px" },
                  }}
                >
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ padding: { xs: "4px", sm: "8px" } }}
                  >
                    <DeleteIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
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
      </TableContainer>
    </Box>
  );
}
