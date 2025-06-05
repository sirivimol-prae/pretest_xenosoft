'use client';
import React, { useState } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
      onLogin(loginForm.username);
      setLoginForm({ username: '', password: '' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #B1ADFA 0%, #FCF10D 25%, #FF9021 50%, #ADFU75 100%)' }}>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-fredoka gradient-text mb-2 animate-bounce-slow">
            Login
          </h1>
          <p className="text-gray-600 font-prompt font-medium text-lg thai-text">ระบบโหวตคำคม คำกวนๆ</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-prompt font-semibold text-gray-700 mb-2 thai-text">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 text-purple-800 bg-white/80 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all shadow-sm font-fredoka"
              placeholder="กรอกชื่อผู้ใช้"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-prompt font-semibold text-gray-700 mb-2 thai-text">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 text-purple-800 bg-white/80 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all pr-12 shadow-sm font-fredoka"
                placeholder="กรอกรหัสผ่าน"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!loginForm.username || !loginForm.password}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-fredoka font-bold shadow-lg transform hover:scale-[1.02] active:scale-[0.98] hover:animate-wiggle"
          >
            <span className="thai-text">เข้าสู่ระบบ</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl p-3 shadow-sm">
            <p className="text-sm text-gray-700 font-prompt font-medium thai-text">
              ทดสอบด้วย username และ password อะไรก็ได้
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-orange-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-0 w-12 h-12 bg-green-300/30 rounded-full blur-lg"></div>
      </div>
    </div>
  );
}