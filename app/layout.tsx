import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Duck Typer",
  description: "Test your typing skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
