import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UpCar — Drive Your Dream",
  description: "O ecossistema completo do seu veículo. Da caderneta digital ao maior app automotivo do Brasil.",
  keywords: "carro, automóvel, manutenção, abastecimento, oficina, caronas, entusiastas",
  openGraph: {
    title: "UpCar — Drive Your Dream",
    description: "O ecossistema completo do seu veículo.",
    url: "https://upcar.app",
    siteName: "UpCar",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
