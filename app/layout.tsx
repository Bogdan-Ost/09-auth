import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "NoteHub — Твій розумний записник",
  description:
    "Зручний застосунок для створення, зберігання та керування вашими нотатками в хмарі.",
  openGraph: {
    title: "NoteHub — Твій розумний записник",
    description:
      "Зберігайте свої ідеї безпечно та доступно з будь-якого пристрою.",
    url: "https://08-zustand-git-main-bogdan-osts-projects.vercel.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Прев'ю інтерфейсу NoteHub",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub — Твій розумний записник",
    description:
      "Зберігайте свої ідеї безпечно та доступно з будь-якого пристрою.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
