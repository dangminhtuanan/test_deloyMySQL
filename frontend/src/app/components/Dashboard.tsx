import {
  Car,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { API_CONFIG } from '@/config/config';

interface DashboardProps {
  onLogout?: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const handleLogout = () => {
    localStorage.removeItem(API_CONFIG.ACCESS_TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
    onLogout?.();
  };
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '45,231,000₫',
      change: '+20.1%',
      icon: DollarSign,
      positive: true
    },
    {
      title: 'Xe đang đỗ',
      value: '187',
      change: '85% đầy',
      icon: Car,
      positive: true
    },
    {
      title: 'Khách hàng',
      value: '1,234',
      change: '+12.3%',
      icon: Users,
      positive: true
    },
    {
      title: 'Doanh thu TB',
      value: '242,500₫',
      change: '+8.2%',
      icon: TrendingUp,
      positive: true
    }
  ];

  const recentVehicles = [
    {
      id: 'VEH001',
      plate: '29A-12345',
      type: 'Ô tô',
      checkIn: '08:30',
      duration: '2h 15m',
      status: 'active',
      fee: '45,000₫'
    },
    {
      id: 'VEH002',
      plate: '51B-67890',
      type: 'Xe máy',
      checkIn: '09:15',
      duration: '1h 30m',
      status: 'active',
      fee: '15,000₫'
    },
    {
      id: 'VEH003',
      plate: '30C-11111',
      type: 'Ô tô',
      checkIn: '07:00',
      duration: '3h 45m',
      status: 'warning',
      fee: '90,000₫'
    },
    {
      id: 'VEH004',
      plate: '92D-22222',
      type: 'Xe máy',
      checkIn: '10:00',
      duration: '45m',
      status: 'active',
      fee: '10,000₫'
    },
    {
      id: 'VEH005',
      plate: '59E-33333',
      type: 'Ô tô',
      checkIn: '06:30',
      duration: '4h 15m',
      status: 'completed',
      fee: '120,000₫'
    }
  ];

  const recentActivity = [
    { time: '10:45', action: 'Xe vào', plate: '29A-12345', user: 'Nguyễn Văn A' },
    { time: '10:30', action: 'Xe ra', plate: '51B-67890', user: 'Trần Thị B' },
    { time: '10:15', action: 'Thanh toán', plate: '30C-11111', user: 'Lê Văn C' },
    { time: '10:00', action: 'Xe vào', plate: '92D-22222', user: 'Phạm Thị D' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Tổng quan hệ thống quản lý bãi đỗ xe</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            Xuất báo cáo
          </Button>
          <Button>
            <Car className="w-4 h-4" />
            Xe vào mới
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.positive ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                    <Icon className={`w-5 h-5 ${stat.positive ? 'text-primary' : 'text-destructive'}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Vehicles Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Xe đang đỗ</CardTitle>
                <CardDescription>Danh sách xe hiện đang trong bãi</CardDescription>
              </div>
              <Button variant="ghost" size="sm">Xem tất cả</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Biển số</TableHead>
                  <TableHead>Loại xe</TableHead>
                  <TableHead>Giờ vào</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Phí dự kiến</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.plate}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.checkIn}</TableCell>
                    <TableCell>{vehicle.duration}</TableCell>
                    <TableCell>{vehicle.fee}</TableCell>
                    <TableCell>
                      {vehicle.status === 'active' && (
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="w-3 h-3" />
                          Đang đỗ
                        </Badge>
                      )}
                      {vehicle.status === 'warning' && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Quá giờ
                        </Badge>
                      )}
                      {vehicle.status === 'completed' && (
                        <Badge className="gap-1 bg-green-500">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã ra
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Cập nhật theo thời gian thực</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate">{activity.action}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{activity.plate}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ sử dụng</CardTitle>
            <CardDescription>Chỗ đỗ hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Ô tô</span>
                  <span className="font-medium">142/180 (79%)</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Xe máy</span>
                  <span className="font-medium">45/70 (64%)</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hôm nay</CardTitle>
            <CardDescription>Cập nhật đến {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">2,450,000₫</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tiền mặt</span>
                <span className="font-medium">1,200,000₫</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Chuyển khoản</span>
                <span className="font-medium">950,000₫</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ví điện tử</span>
                <span className="font-medium">300,000₫</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
            <CardDescription>Tổng quan trong ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Xe vào</span>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Xe ra</span>
                <span className="text-2xl font-bold">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Thời gian TB</span>
                <span className="text-2xl font-bold">2.5h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
