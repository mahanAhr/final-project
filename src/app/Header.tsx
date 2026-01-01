"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#e0e0e0" }}>
        <Toolbar sx={{ display: "flex" }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: "#000" }} />
              </IconButton>
            ) : (
              <Button
                component={Link}
                href="/products"
                startIcon={<HomeIcon />}
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                Home
              </Button>
            )}
          </Box>

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h6" color="black">
              Smart Shopping
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            {!isMobile && (
              <>
                <IconButton component={Link} href="/cart">
                  <ShoppingCartIcon sx={{ color: "#000" }} />
                </IconButton>

                <IconButton component={Link} href="/profile">
                  <AccountCircleIcon sx={{ color: "#000" }} />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItemButton
              component={Link}
              href="/products"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              href="/cart"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              href="/profile"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
