import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            Giải pháp quản lý bãi đỗ xe hàng đầu
          </Badge>
          <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl">
            Hệ Thống Quản Lý Nhà Gửi Xe Thông Minh
          </h1>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Giải pháp toàn diện để quản lý bãi đỗ xe hiệu quả, theo dõi thời gian thực,
            và tối ưu hóa doanh thu cho doanh nghiệp của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group">
              Bắt đầu ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Play className="w-4 h-4" />
              Xem demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
