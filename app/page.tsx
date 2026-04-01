'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Cek status login (Ketentuan 105)
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // 2. Jika tidak ada kunci login (Ketentuan 106 & 114)
    if (!isLoggedIn) {
      router.push('/auth/not-authorized');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Jika belum terverifikasi, tampilkan layar kosong sebentar (biar tidak kedip)
  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#4F83FF] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-black italic">Selamat Datang!</h1>
        <p className="text-gray-600 mb-8">Anda sekarang berada di area privat yang aman.</p>
        
        <button 
          onClick={() => {
            localStorage.removeItem('isLoggedIn'); // Hapus kunci saat keluar
            router.push('/auth/login');
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          Logout & Kunci Halaman
        </button>
      </div>
    </div>
  );
}