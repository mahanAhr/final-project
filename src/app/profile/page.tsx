"use client";

import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/users/1").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Eror</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>User Profile</h1>

      <p>Name:{data.name.firstname} {data.name.lastname}</p>
      <p>User Name: {data.username}</p>
      <p>E-mail:{data.email}</p>

      <h3>Address:</h3>
      <p>
        {data.address.city} — {data.address.street}, {data.address.number}
      </p>
    </div>
  );
}

