import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Merengue Cakes By Joselyn',
  description: 'Delicious custom merengue cakes for your special occasions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
