import React from 'react';

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthFormWrapper({ title, children }: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen bg-[#4F83FF] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-[1rem] shadow-2xl px-8 pt-7 pb-18 mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-6 tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}