import { Play, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-block">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">
                ✨ Giải pháp quản lý thông minh #1
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Quản lý tòa nhà &<br />
                gửi xe thông minh
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Giải pháp toàn diện giúp tối ưu hóa việc quản lý bãi đỗ xe,
                theo dõi thời gian thực và nâng cao trải nghiệm khách hàng
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Bắt đầu ngay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <Play className="mr-2 h-4 w-4" />
                Xem demo
              </Button>
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold">150+</div>
                <div className="text-sm text-muted-foreground">Chỗ đỗ xe</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">1200+</div>
                <div className="text-sm text-muted-foreground">Khách hàng</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Hỗ trợ</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Placeholder for car images - using gradient background */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-xl font-semibold">BMW & Luxury Cars</p>
                    <p className="text-sm opacity-90 mt-2">Smart Parking Management</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-bold">98.5%</div>
                    <div className="text-xs text-muted-foreground">Độ chính xác</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <div className="font-bold">Real-time</div>
                    <div className="text-xs text-muted-foreground">Cập nhật trực tiếp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
