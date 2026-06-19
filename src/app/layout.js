import "./globals.css";

export const metadata = {
  title: "Syscape",
  description: "Boot into your own digital reality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased select-none">{children}</body>
    </html>
  );
}
