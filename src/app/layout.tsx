import "./globals.css";
import "../../public/antd.min.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import Header from "@/components/Header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "小滴课堂",
  description: "培养编程人才的官网",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
