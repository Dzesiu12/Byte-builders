import { type ReactNode } from "react";
import { type Metadata } from "next";

import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Byte Builders",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html data-theme="mytheme" lang="pl">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
