import {
  Car,
  CreditCard,
  Clock,
  Shield,
  Camera,
  Bell,
  BarChart3,
  Smartphone,
  Zap,
  HeadphonesIcon,
  Cloud,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function FeaturesSection() {
  const features = [
    {
      icon: Car,
      title: 'Quản lý chỗ đỗ thông minh',
      description: 'Tự động phát hiện và quản lý chỗ đỗ xe trống, tối ưu hóa không gian bãi đỗ',
      badge: 'Smart'
    },
    {
      icon: CreditCard,
      title: 'Hệ thống thanh toán tự động',
      description: 'Thanh toán nhanh chóng qua thẻ, ví điện tử, chuyển khoản tự động',
      badge: 'Auto'
    },
    {
      icon: Clock,
      title: 'Theo dõi thời gian thực',
      description: 'Cập nhật tình trạng bãi đỗ và thông tin xe ra vào theo thời gian thực',
      badge: 'Real-time'
    },
    {
      icon: Shield,
      title: 'Bảo mật & an toàn',
      description: 'Hệ thống bảo mật đa lớp, camera giám sát 24/7, bảo vệ tài sản',
      badge: 'Secure'
    },
    {
      icon: Camera,
      title: 'Camera AI nhận diện',
      description: 'Nhận diện biển số xe tự động với độ chính xác cao, lưu trữ hình ảnh',
      badge: 'AI'
    },
    {
      icon: Bell,
      title: 'Thông báo tức thì',
      description: 'Nhận thông báo về xe vào/ra, thanh toán, sự cố qua app và email',
      badge: 'Instant'
    },
    {
      icon: BarChart3,
      title: 'Báo cáo & phân tích',
      description: 'Thống kê doanh thu, lưu lượng xe, báo cáo chi tiết theo ngày/tháng',
      badge: 'Analytics'
    },
    {
      icon: Smartphone,
      title: 'Ứng dụng di động',
      description: 'Quản lý mọi lúc mọi nơi với app iOS & Android, giao diện thân thiện',
      badge: 'Mobile'
    },
    {
      icon: Zap,
      title: 'Xử lý siêu nhanh',
      description: 'Thời gian vào/ra chỉ trong vài giây, giảm tắc nghẽn tại cổng',
      badge: 'Fast'
    },
    {
      icon: HeadphonesIcon,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng phục vụ mọi lúc',
      badge: 'Support'
    },
    {
      icon: Cloud,
      title: 'Lưu trữ đám mây',
      description: 'Dữ liệu được backup tự động, truy cập từ mọi thiết bị',
      badge: 'Cloud'
    },
    {
      icon: Lock,
      title: 'Kiểm soát truy cập',
      description: 'Quản lý quyền truy cập theo vai trò, bảo mật thông tin người dùng',
      badge: 'Access'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4">
            Tính năng
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Đặc điểm nổi bật
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Tối ưu và thuận tiện
          </p>
          <p className="text-muted-foreground mt-2">
            Hệ thống quản lý bãi đỗ xe với đầy đủ tính năng hiện đại,
            giúp vận hành hiệu quả và nâng cao trải nghiệm khách hàng
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Sẵn sàng trải nghiệm hệ thống quản lý thông minh?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Dùng thử miễn phí
            </button>
            <button className="px-6 py-3 border rounded-lg font-medium hover:bg-accent transition-colors">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
