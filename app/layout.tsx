import "./globals.css";

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
