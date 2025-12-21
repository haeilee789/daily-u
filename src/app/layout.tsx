import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Daily-U : Daily Challenge Tracker',
  description: 'Simplicity keeps you going',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
