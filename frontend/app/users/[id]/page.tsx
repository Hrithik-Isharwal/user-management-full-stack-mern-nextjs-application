"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams hook for route parameters

const UserDetails = () => {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/users/${id}`);
          const data = await response.json();
          console.log(data, "daaaaaaaataaaaaaaa");
          

          if (response.ok) {
            setUser(data);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [id]);

  if (loading) return <p>Loading user details...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User Details</h1>
        </header>

        <section className="w-full p-4 border rounded shadow-md">
          <h2 className="text-xl font-bold">Name: {user.firstName} {user.lastName}</h2>
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-lg">Phone Number: {user.phoneNumber}</p>
          <p className="text-lg">Role: {user.role}</p>
          {user.avatar && (
            <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="mt-4 w-32 h-32 rounded-full" />
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
