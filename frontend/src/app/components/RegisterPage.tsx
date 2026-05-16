import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { FormEvent, type ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRegister } from "@/hooks/useApi";
import { API_CONFIG, FEATURES } from "@/config/config";
import type { RegisterPayload } from "@/services/api";

interface RegisterPageProps {
  onBackToHome?: () => void;
  onBackToLogin?: () => void;
  onRegisterSuccess?: () => void;
}

type RegisterStep = "info" | "success";

const featureItems = [
  "Quan ly xe ra vao tu dong",
  "Thanh toan truc tuyen",
  "Bao cao thong ke chi tiet",
  "Camera giam sat 24/7",
];

export function RegisterPage({
  onBackToHome,
  onBackToLogin,
  onRegisterSuccess,
}: RegisterPageProps) {
  const [step, setStep] = useState<RegisterStep>("info");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const { register, loading, error } = useRegister();

  const payload: RegisterPayload = useMemo(
    () => ({
      username: form.username.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      phone: form.phone.trim() || undefined,
      address: form.address.trim() || undefined,
    }),
    [form]
  );

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(API_CONFIG.REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      setForm((current) => ({ ...current, email: rememberedEmail }));
    }
  }, []);

  const updateField =
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setLocalError(null);
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const validateInfo = () => {
    if (!payload.username || !payload.email || !payload.password) {
      return "Vui long nhap day du ten dang nhap, email va mat khau.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return "Email khong hop le.";
    }

    if (payload.password.length < 6) {
      return "Mat khau phai co it nhat 6 ky tu.";
    }

    if (payload.password !== form.confirmPassword) {
      return "Mat khau xac nhan khong khop.";
    }

    if (payload.phone && !/^(0|\+84)\d{8,10}$/.test(payload.phone)) {
      return "So dien thoai khong hop le.";
    }

    return null;
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateInfo();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      await register(payload);
      localStorage.setItem(API_CONFIG.REMEMBER_EMAIL_KEY, payload.email);
      setLocalError(null);
      setStep("success");
    } catch {
      // The hook exposes the API error message.
    }
  };

  const resetForm = () => {
    setStep("info");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    });
    setLocalError(null);
  };

  const activeError = localError || error;

  if (!FEATURES.ENABLE_REGISTRATION) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tinh nang dang phat trien</h2>
          <p className="text-muted-foreground mb-6">
            Trang dang ky dang duoc phat trien. Vui long lien he quan tri vien de duoc ho tro.
          </p>
          <Button onClick={onBackToLogin}>Quay lai dang nhap</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMTUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-center" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
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
              Dang ky tai khoan
              <br />
              quan ly bai xe
            </h1>
            <p className="text-blue-100 text-lg">
              Tao tai khoan moi va su dung he thong ngay sau khi dang ky thanh cong.
            </p>
          </div>

          <div className="space-y-4">
            {featureItems.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-sm text-blue-50">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Button variant="ghost" size="sm" className="mb-4" onClick={onBackToHome}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lai trang chu
          </Button>

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
            {step === "info" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Dang ky tai khoan</h2>
                  <p className="text-muted-foreground text-sm">
                    Nhap thong tin tai khoan de dang ky.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleRegister}>
                  {activeError && <ErrorMessage message={activeError} />}

                  <div className="space-y-2">
                    <Label htmlFor="username">Ten dang nhap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Nhap ten dang nhap"
                        className="h-11 pl-10"
                        value={form.username}
                        onChange={updateField("username")}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 pl-10"
                        value={form.email}
                        onChange={updateField("email")}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mat khau</Label>
                    <PasswordInput
                      id="password"
                      placeholder="Toi thieu 6 ky tu"
                      value={form.password}
                      visible={showPassword}
                      onChange={updateField("password")}
                      onToggle={() => setShowPassword((value) => !value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xac nhan mat khau</Label>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Nhap lai mat khau"
                      value={form.confirmPassword}
                      visible={showConfirmPassword}
                      onChange={updateField("confirmPassword")}
                      onToggle={() => setShowConfirmPassword((value) => !value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">So dien thoai</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Tuy chon"
                          className="h-11 pl-10"
                          value={form.phone}
                          onChange={updateField("phone")}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dia chi</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Tuy chon"
                          className="h-11 pl-10"
                          value={form.address}
                          onChange={updateField("address")}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {loading ? "Dang dang ky..." : "Dang ky"}
                  </Button>
                </form>
              </>
            )}

            {step === "success" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Dang ky thanh cong</h2>
                <p className="text-muted-foreground mb-6">
                  Tai khoan cua ban da duoc tao. Hay dang nhap bang email va mat khau vua dang ky.
                </p>
                <Button
                  onClick={() => {
                    resetForm();
                    onRegisterSuccess?.();
                  }}
                  className="w-full h-11 text-base"
                >
                  Dang nhap ngay
                </Button>
              </div>
            )}

            {step !== "success" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Hoac</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Da co tai khoan? </span>
                  <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-primary font-medium hover:underline"
                    disabled={loading}
                  >
                    Dang nhap ngay
                  </button>
                </div>
              </>
            )}
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8">
            (c) 2026 SmartParking. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
      <AlertCircle className="w-4 h-4 text-red-600" />
      <span className="text-sm text-red-600">{message}</span>
    </div>
  );
}

function PasswordInput({
  id,
  placeholder,
  value,
  visible,
  onChange,
  onToggle,
  disabled,
}: {
  id: string;
  placeholder: string;
  value: string;
  visible: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="h-11 pr-10"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        minLength={6}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        disabled={disabled}
        aria-label={visible ? "An mat khau" : "Hien mat khau"}
      >
        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}
