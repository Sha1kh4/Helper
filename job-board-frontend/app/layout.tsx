import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Helper4U Jobs",
  description: "Find your next job opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Helper4U Jobs</h1>
          </div>
        </header>
        <main className="container mx-auto py-8">{children}</main>
        <footer className="bg-gray-200 p-4 mt-8">
          <div className="container mx-auto text-center">
            &copy; 2023 Helper4U Jobs. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
