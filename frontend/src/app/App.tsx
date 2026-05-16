import { useState } from 'react';
import { LandingHeader } from './components/LandingHeader';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { LandingFooter } from './components/LandingFooter';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'dashboard'>('home');

  // Trang Dashboard (Sau khi đăng nhập)
  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentPage('home')} />;
  }

  // Trang Register
  if (currentPage === 'register') {
    return (
      <RegisterPage
        onBackToHome={() => setCurrentPage('home')}
        onBackToLogin={() => setCurrentPage('login')}
        onRegisterSuccess={() => setCurrentPage('login')}
      />
    );
  }

  // Trang Login
  if (currentPage === 'login') {
    return (
        <LoginPage
          onBackToHome={() => setCurrentPage('home')}
        onLoginSuccess={() => setCurrentPage('home')}
          onGoToRegister={() => setCurrentPage('register')}
        />
    );
  }

  // Trang chủ
  return (
    <div className="size-full min-h-screen bg-background">
      <LandingHeader onLoginClick={() => setCurrentPage('login')} />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
      </main>
      <LandingFooter />
    </div>
  );
}
