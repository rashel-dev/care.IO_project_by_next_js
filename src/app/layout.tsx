import React from "react";
import "./globals.css";

export const metadata = {
  title: "Care.io",
  description: "Created by Mohammad Rashel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
