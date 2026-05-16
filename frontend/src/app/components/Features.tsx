import {
  Car,
  Clock,
  Shield,
  BarChart3,
  Smartphone,
  CreditCard,
  Camera,
  Bell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function Features() {
  const features = [
    {
      icon: Car,
      title: 'Quản Lý Xe Thông Minh',
      description: 'Theo dõi xe ra vào tự động với hệ thống nhận diện biển số xe tiên tiến',
      badge: 'AI-Powered'
    },
    {
      icon: Clock,
      title: 'Theo Dõi Thời Gian Thực',
      description: 'Cập nhật tình trạng chỗ đỗ xe trực tiếp, biết ngay chỗ trống còn lại',
      badge: 'Real-time'
    },
    {
      icon: Shield,
      title: 'An Toàn & Bảo Mật',
      description: 'Hệ thống camera giám sát 24/7 và bảo vệ an ninh chuyên nghiệp',
      badge: 'Secure'
    },
    {
      icon: BarChart3,
      title: 'Báo Cáo Thống Kê',
      description: 'Phân tích dữ liệu chi tiết về doanh thu, lưu lượng xe và hiệu suất',
      badge: 'Analytics'
    },
    {
      icon: Smartphone,
      title: 'Ứng Dụng Di Động',
      description: 'Quản lý mọi lúc mọi nơi với ứng dụng iOS và Android',
      badge: 'Mobile'
    },
    {
      icon: CreditCard,
      title: 'Thanh Toán Linh Hoạt',
      description: 'Hỗ trợ đa dạng hình thức thanh toán: tiền mặt, thẻ, ví điện tử',
      badge: 'Payment'
    },
    {
      icon: Camera,
      title: 'Camera AI',
      description: 'Nhận diện biển số xe tự động với độ chính xác cao',
      badge: 'Computer Vision'
    },
    {
      icon: Bell,
      title: 'Thông Báo Tức Thì',
      description: 'Nhận cảnh báo và thông báo về các sự kiện quan trọng',
      badge: 'Notifications'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Tính năng
          </Badge>
          <h2 className="mb-4 text-3xl sm:text-4xl">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hệ thống quản lý bãi đỗ xe hiện đại với đầy đủ tính năng
            để vận hành doanh nghiệp của bạn một cách chuyên nghiệp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
