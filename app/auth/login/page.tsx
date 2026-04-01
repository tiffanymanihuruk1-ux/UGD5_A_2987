'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import { toast } from 'react-toastify';
import { Eye, EyeOff, RotateCw } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [attempts, setAttempts] = useState(3);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onSubmit'
  });

  const generateCaptcha = useCallback(() => {
    setCaptchaText(Math.random().toString(36).substring(2, 8).toUpperCase());
  }, []);

  useEffect(() => { 
    generateCaptcha(); 
  }, [generateCaptcha]);

  const handleFailure = (msg?: string) => {
    setAttempts((prev) => {
      const nextValue = Math.max(0, prev - 1);
      const finalMsg = nextValue === 0 ? "Login gagal / Kesempatan login habis!" : (msg || `Login Gagal! Sisa kesempatan: ${nextValue}`);
      toast.error(finalMsg, { toastId: 'status' });
      return nextValue;
    });
    generateCaptcha();
  };

  const onValid = (data: any) => {
    // Sesuaikan dengan data NPM kamu
    const VALID_EMAIL = "241712987@gmail.com"; 
    const VALID_PWD = "241712987";

    if (data.captcha?.toUpperCase() !== captchaText) {
      handleFailure('Captcha tidak sesuai!');
      return;
    }

    if (data.email === VALID_EMAIL && data.password === VALID_PWD) {
      // MEMBERIKAN KUNCI PRIVAT: Supaya link localhost/home tidak bisa dibuka publik
      localStorage.setItem('isLoggedIn', 'true'); 
      
      toast.success('Selamat Datang!', { icon: "🚀" });
      router.push('/home'); 
    } else {
      handleFailure();
    }
  };

  return (
    <AuthFormWrapper title="Login">
      <div className="w-full text-center">
        <p className="text-[13px] font-bold text-gray-800 mb-6 mt-4">Sisa Kesempatan: {attempts}</p>
        
        <form onSubmit={handleSubmit(onValid, () => handleFailure())} className="space-y-4 text-left">
          {/* Email Section */}
          <div>
            <label className="text-[13px] text-gray-600 font-normal mb-1 block ml-1">Email</label>
            <input 
              {...register('email', { required: 'Email tidak boleh kosong' })} 
              placeholder="Masukan email" 
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-[#F9FAFB]'
              }`} 
            />
          </div>

          {/* Password Section */}
          <div>
            <label className="text-[13px] text-gray-600 font-normal mb-1 block ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPwd ? 'text' : 'password'} 
                {...register('password', { required: 'Password tidak boleh kosong' })} 
                placeholder="Masukan password" 
                className={`w-full px-4 py-2.5 border rounded-xl text-sm pr-11 outline-none transition-all ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-[#F9FAFB]'
                }`} 
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-2.5 text-gray-400">
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Captcha Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600 font-bold">Captcha:</span>
              <span className="bg-gray-100 px-3 py-1 font-mono font-bold rounded text-[15px] border border-gray-200">{captchaText}</span>
              <button type="button" onClick={generateCaptcha} className="text-blue-600 active:rotate-180 transition-all">
                <RotateCw size={16} strokeWidth={2.5} />
              </button>
            </div>
            <input 
              {...register('captcha', { required: 'Captcha wajib diisi' })} 
              placeholder="Masukan captcha" 
              className={`w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all ${
                errors.captcha ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-[#F9FAFB]'
              }`} 
            />
          </div>

          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              disabled={attempts === 0} 
              className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg disabled:bg-gray-300"
            >
              Sign In
            </button>
            
            <button 
              type="button" 
              onClick={() => { setAttempts(3); toast.success("Kesempatan login berhasil direset!"); }} 
              disabled={attempts > 0}
              className={`w-full text-white py-3.5 rounded-xl font-bold text-[15px] transition-all ${
                attempts === 0 ? 'bg-[#22C55E] shadow-md' : 'bg-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              Reset Kesempatan
            </button>
          </div>

          {/* SOSIAL ICONS - PERBAIKAN URL DI SINI */}
          <div className="flex justify-center gap-6 mt-6">
            {[
              { id: 'google', url: 'https://www.svgrepo.com/show/475656/google-color.svg' },
              { id: 'github', url: 'https://www.svgrepo.com/show/512317/github-142.svg' },
              { id: 'facebook', url: 'https://www.svgrepo.com/show/475647/facebook-color.svg' }
            ].map((social) => (
              <button key={social.id} type="button" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all">
                <img src={social.url} className="w-5 h-5" alt={social.id} />
              </button>
            ))}
          </div>
        </form>

        <p className="mt-8 text-center text-[13px] text-gray-500 font-normal">
          Tidak punya akun? <Link href="/auth/register" className="text-blue-600 font-bold hover:underline">Daftar</Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
}