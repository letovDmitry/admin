import { Montserrat } from 'next/font/google'
import './ui/globals.css'
import StoreProvider from './StoreProvider'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Anyboost',
  description: 'Anyboost',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
