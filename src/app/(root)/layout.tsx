import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: {
    template: "Nexaura UI — %s",
    default: "Nexaura UI :  Next.js Component Library",
  },
  description: "A collection of beautiful, accessible, and customizable UI components built with Tailwind CSS and Radix UI.",
};

export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}