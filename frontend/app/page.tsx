"use client";

import { useEffect, useState } from "react";
import { User } from "../types";
import Pagination from "../components/Pagination";
import UserTable from "../components/UserTable";
import Link from "next/link";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({});

  const countRoles = (users: User[]) => {
    const counts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    setRoleCounts(counts);
  };

  const fetchAllUsers = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/users/all`);
      const data = await response.json();

      countRoles(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/users?page=${page}&perPage=10`);
      const data = await response.json();

      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User List</h1>
          <div className="text-gray-600">
            <p>Total Users: {totalUsers}</p>
            <div className="flex space-x-4 mt-2">
              {Object.entries(roleCounts).map(([role, count]) => (
                <p key={role} className="text-gray-600">
                  {role.charAt(0).toUpperCase() + role.slice(1)}: {count}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/add-user">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add User
                </button>
              </Link>
            </div>
          </div>
        </header>

        <section className="w-full">
          <UserTable users={users} loading={loading} />
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
