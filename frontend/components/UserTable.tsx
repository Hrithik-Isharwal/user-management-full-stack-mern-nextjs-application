"use client";

import Link from "next/link";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  return (
    <section className="w-full overflow-x-auto">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-700" colSpan={6}>
                  <Link href={`/users/${user.id}`} className="block">
                    <div className="flex justify-between">
                      <span>{user.id}</span>
                      <span>{user.firstName}</span>
                      <span>{user.lastName}</span>
                      <span>{user.phoneNumber}</span>
                      <span>{user.email}</span>
                      <span>{user.role}</span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserTable;
