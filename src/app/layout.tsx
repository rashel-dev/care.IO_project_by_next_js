import React from "react";
import "./globals.css";
import AuthProviders from "@/providers/AuthProviders";

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
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
