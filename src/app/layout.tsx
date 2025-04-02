import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "300", "800", "900", "100", "200", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furkan Thumbnails | Graphic Designer",
  description: "Portfolio showcasing graphic design, thumbnail creation, and digital artwork",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-black text-white`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme={'dark'}
          disableTransitionOnChange
          enableSystem
        >
          <div className="relative min-h-screen w-full bg-black">
            <div
              className={cn(
                "absolute inset-0 opacity-25",
                "[background-size:20px_20px]",
                "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
              )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_35%,#00ff00)] bg-[#91db00]/10"></div>
            <div className="relative z-20">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
