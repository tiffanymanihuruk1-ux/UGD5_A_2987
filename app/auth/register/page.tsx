'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' });

  const password = watch('password', '');

  // Rumus Strength Sesuai Poin 6 Soal
  const strength = Math.min(
    (password.length > 7 ? 25 : 0) +
    (/[A-Z]/.test(password) ? 25 : 0) +
    (/[0-9]/.test(password) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
  );

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(() => { toast.success('Berhasil Daftar!'); router.push('/auth/login'); })} className="space-y-4 text-left">
        {/* Username 3-8 Karakter */}
        <div>
          <label className="text-[13px] text-gray-600 font-bold mb-1 block ml-1">Username</label>
          <input {...register('username', { required: 'Wajib diisi', minLength: 3, maxLength: 8 })} placeholder="3-8 karakter" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-black" />
          {errors.username && <p className="text-red-500 text-[10px] mt-1 italic font-medium">{errors.username.message as string}</p>}
        </div>

        {/* Email Pattern (@ dan .com/.net/.co) */}
        <div>
          <label className="text-[13px] text-gray-600 font-bold mb-1 block ml-1">Email</label>
          <input {...register('email', { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/, message: 'Pattern email salah' } })} 
            placeholder="email@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-black" />
        </div>

        {/* Password Strength Indicator */}
        <div>
          <label className="text-[13px] text-gray-600 font-bold mb-1 block ml-1">Password</label>
          <div className="relative">
            <input type={showPwd ? 'text' : 'password'} {...register('password', { required: true, minLength: 8 })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-black" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-3 text-black">{showPwd ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          <div className="h-2 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${strength === 100 ? 'bg-green-500' : strength >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${strength}%`}}></div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 font-bold">Strength: {strength}%</p>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="text-[13px] text-gray-600 font-bold mb-1 block ml-1">Confirm Password</label>
          <input {...register('confirm', { required: true, validate: (val) => val === password || 'Password tidak cocok' })} type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-black" />
          {errors.confirm && <p className="text-red-500 text-[10px] mt-1 italic font-medium">{errors.confirm.message as string}</p>}
        </div>

        <button type="submit" className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-sm shadow-md">Sign Up</button>
      </form>
    </AuthFormWrapper>
  );
}
