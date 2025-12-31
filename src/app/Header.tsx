"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#e0e0e0" }}>
        <Toolbar sx={{ display: "flex" }}>
          {/* LEFT */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: "#000" }} />
              </IconButton>
            ) : (
              <Link href="/products">
                <Button
                  startIcon={<HomeIcon />}
                  sx={{
                    fontWeight: "bold",
                    color: "#000",
                    textTransform: "none",
                  }}
                >
                  Home
                </Button>
              </Link>
            )}
          </Box>

          {/* CENTER */}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h6" color="black">
              Smart Shopping
            </Typography>
          </Box>

          {/* RIGHT */}
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
                <Link href="/cart">
                  <IconButton>
                    <ShoppingCartIcon sx={{ color: "#000" }} />
                  </IconButton>
                </Link>
                <Link href="/profile">
                  <IconButton>
                    <AccountCircleIcon sx={{ color: "#000" }} />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
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
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  letterSpacing: "0.4px",
                }}
              />
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
