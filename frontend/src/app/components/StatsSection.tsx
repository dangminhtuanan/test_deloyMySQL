import { Card } from './ui/card';
import { Building2, Users, Shield, Clock } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Building2,
      number: '150+',
      label: 'Chỗ đỗ xe',
      description: 'Quản lý hiệu quả'
    },
    {
      icon: Users,
      number: '1,200+',
      label: 'Khách hàng',
      description: 'Tin tưởng sử dụng'
    },
    {
      icon: Shield,
      number: '99.9%',
      label: 'Bảo mật',
      description: 'An toàn tuyệt đối'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Hỗ trợ',
      description: 'Luôn sẵn sàng'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
