"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

export default function ProfilePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/users/1").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Eror</p>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: 2,
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
              {data.name.firstname[0].toUpperCase()}
            </Avatar>
          </Box>

          <Typography variant="h5" align="center">
            {data.name.firstname} {data.name.lastname}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            @{data.username}
          </Typography>

          <Typography variant="body2">
            <strong>Email:</strong> {data.email}
          </Typography>

          <Typography variant="body2">
            <strong>City:</strong> {data.address.city}
          </Typography>

          <Typography variant="body2">
            <strong>Street:</strong> {data.address.street}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}