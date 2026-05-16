import { Car, TrendingUp, Users, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function Stats() {
  const stats = [
    {
      icon: Car,
      value: '250+',
      label: 'Chỗ đỗ xe',
      trend: '+12%',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Tỷ lệ sử dụng',
      trend: '+8%',
      color: 'text-green-600'
    },
    {
      icon: Users,
      value: '1,234',
      label: 'Khách hàng',
      trend: '+24%',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Hoạt động',
      trend: '100%',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.color} bg-muted p-3 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
