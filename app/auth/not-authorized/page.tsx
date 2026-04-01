'use client';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFormWrapper';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <AuthFormWrapper title="Akses Ditolak">
      <div className="text-center py-6">
        {/* Tampilan sesuai PDF Halaman 5 */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-500 w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-inner">
            ❌
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Anda belum login</h2>
        <p className="text-gray-500 text-sm mb-8 px-6">
          Maaf, halaman ini bersifat privat. Silakan login terlebih dahulu untuk mengaksesnya.
        </p>
        
        <button 
          onClick={() => router.push('/auth/login')}
          className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
        >
           Kembali ke Login
        </button>
      </div>
    </AuthFormWrapper>
  );
}