import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import AuthProvider from "./context/AuthProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-sans bg-milk h-full">
        <section className="flex flex-col min-h-full">
          <Navbar />
          <main className="relative flex-auto">
            {children}
          </main>
          <footer>
            FOOTER
          </footer>
        </section>
      </body>
    </html>
  );
}
