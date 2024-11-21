import React from 'react';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Management</title>
      </head>
      <body className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center my-8">
            <h1 className="text-4xl font-semibold text-gray-800">User Management</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
