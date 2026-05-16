import {
  LayoutDashboard,
  Car,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Car, label: 'Quản lý xe', active: false },
    { icon: Users, label: 'Khách hàng', active: false },
    { icon: CreditCard, label: 'Thanh toán', active: false },
    { icon: BarChart3, label: 'Báo cáo', active: false },
    { icon: Settings, label: 'Cài đặt', active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out flex flex-col",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ParkingMS</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  item.active && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Admin User</div>
              <div className="text-xs text-muted-foreground truncate">admin@parkingms.vn</div>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-3" size="sm">
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
