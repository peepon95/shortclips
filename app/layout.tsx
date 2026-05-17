import "./globals.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Stream to Shorts",
  description: "Convert livestreams into 9:16 Shorts"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
