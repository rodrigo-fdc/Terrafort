import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste Projeto Template",
  description:
    "Ponto de partida para a próxima aplicação do Teste Projeto Template.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
