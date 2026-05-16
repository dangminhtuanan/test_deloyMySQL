import { Building2, CheckCircle2, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { useLogin } from '@/hooks/useApi';
import { API_CONFIG } from '@/config/config';

interface LoginPageProps {
  onBackToHome?: () => void;
  onLoginSuccess?: () => void;
  onGoToRegister?: () => void;
}

export function LoginPage({ onBackToHome, onLoginSuccess, onGoToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  
  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(API_CONFIG.REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem(API_CONFIG.REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(API_CONFIG.REMEMBER_EMAIL_KEY);
      }
      onLoginSuccess?.();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const features = [
    'Quản lý xe ra vào tự động',
    'Thanh toán trực tuyến',
    'Báo cáo thống kê chi tiết',
    'Camera giám sát 24/7'
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand & Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-center"></div>
        </div>

        {/* Building Image Placeholder */}
        <div className="absolute inset-0 flex items-end justify-center pb-32">
          <div className="relative">
            <div className="text-9xl opacity-20">🏢</div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">SmartParking</div>
                <div className="text-xs text-blue-200">Management System</div>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">
              HỆ THỐNG QUẢN LÝ<br />
              NHÀ GỬI XE
            </h1>
            <p className="text-blue-200 text-lg">
              Giải pháp quản lý thông minh, hiện đại và hiệu quả
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back Button */}
          {onBackToHome && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={onBackToHome}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Button>
          )}
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-lg">SmartParking</div>
              <div className="text-xs text-muted-foreground">Management System</div>
            </div>
          </div>

          <Card className="p-8 shadow-xl">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Đăng nhập</h2>
              <p className="text-muted-foreground text-sm">
                Nhập thông tin của bạn để tiếp tục
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              {/* Username/Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Tên đăng nhập</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Nhập tên đăng nhập hoặc email"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={loading}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Navigate to forgot password page
                    alert('Tính năng quên mật khẩu sẽ được cập nhật');
                  }}
                  className="text-sm text-primary hover:underline font-medium"
                  disabled={loading}
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-11 text-base"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Hoặc
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Chưa có tài khoản? </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onGoToRegister?.();
                  }}
                  className="text-primary font-medium hover:underline"
                  disabled={loading}
                >
                  Đăng ký ngay
                </button>
              </div>
            </form>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2026 SmartParking. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
