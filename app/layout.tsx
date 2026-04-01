import './globals.css'; // WAJIB ADA: Tanpa ini, Tailwind & warna biru tidak akan muncul
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Tema "dark" agar pop-up hitam sesuai permintaan terakhirmu */}
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </body>
    </html>
  );
}