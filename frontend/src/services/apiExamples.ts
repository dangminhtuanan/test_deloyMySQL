import { authAPI, profileAPI, userAPI, type RegisterPayload } from "@/services/api";

// ==================== EXAMPLES: AUTH ====================

// VD 1: Đăng ký - Gửi OTP
export async function handleSendRegisterOtp(data: RegisterPayload) {
  try {
    const response = await authAPI.register(data);
    console.log("OTP sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Send OTP failed:", error);
    throw error;
  }
}

// VD 2: Đăng ký - Xác nhận OTP
export async function handleRegisterVerifyOtp(
  email: string,
  otp: string
) {
  try {
    const response = await authAPI.register({ username: "", email, password: otp });
    console.log("Registration successful:", response.data);
    // Lưu token vào localStorage
    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
}

// VD 3: Đăng nhập
export async function handleLogin(email: string, password: string) {
  try {
    const response = await authAPI.login(email, password);
    console.log("Login successful:", response.data);
    // Lưu token vào localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// VD 4: Quên mật khẩu - Yêu cầu OTP
export async function handleRequestResetPassword(email: string) {
  try {
    const response = await authAPI.requestReset(email);
    console.log("Reset OTP sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request reset failed:", error);
    throw error;
  }
}

// VD 5: Quên mật khẩu - Xác nhận OTP và đổi password
export async function handleVerifyResetOtp(
  email: string,
  otp: string,
  newPassword: string
) {
  try {
    const response = await authAPI.verifyOtp(email, otp, newPassword);
    console.log("Password reset successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Verify OTP failed:", error);
    throw error;
  }
}

// ==================== EXAMPLES: PROFILE ====================

// VD 6: Lấy thông tin profile
export async function handleGetProfile() {
  try {
    const response = await profileAPI.getProfile();
    console.log("Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get profile failed:", error);
    throw error;
  }
}

// VD 7: Cập nhật profile
export async function handleUpdateProfile(
  username?: string,
  phone?: string,
  address?: string
) {
  try {
    const response = await profileAPI.updateProfile({
      username,
      phone,
      address,
    });
    console.log("Profile updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error;
  }
}

// VD 8: Đổi mật khẩu - Yêu cầu OTP
export async function handleRequestChangePasswordOtp() {
  try {
    const response = await profileAPI.requestChangePasswordOtp();
    console.log("Change password OTP sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request change password OTP failed:", error);
    throw error;
  }
}

// VD 9: Đổi mật khẩu - Xác nhận OTP
export async function handleChangePassword(otp: string, newPassword: string) {
  try {
    const response = await profileAPI.changePassword(otp, newPassword);
    console.log("Password changed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Change password failed:", error);
    throw error;
  }
}

// VD 10: Đổi email - Bước 1: Yêu cầu OTP email cũ
export async function handleRequestChangeEmailOtp() {
  try {
    const response = await profileAPI.requestChangeEmailOtp();
    console.log("Change email OTP sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request change email OTP failed:", error);
    throw error;
  }
}

// VD 11: Đổi email - Bước 2: Xác nhận email cũ
export async function handleVerifyCurrentEmailOtp(otp: string) {
  try {
    const response = await profileAPI.verifyCurrentEmailOtp(otp);
    console.log("Current email verified:", response.data);
    return response.data;
  } catch (error) {
    console.error("Verify current email OTP failed:", error);
    throw error;
  }
}

// VD 12: Đổi email - Bước 3: Yêu cầu OTP email mới
export async function handleRequestNewEmailOtp(newEmail: string) {
  try {
    const response = await profileAPI.requestNewEmailOtp(newEmail);
    console.log("New email OTP sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request new email OTP failed:", error);
    throw error;
  }
}

// VD 13: Đổi email - Bước 4: Xác nhận email mới
export async function handleChangeEmail(otp: string) {
  try {
    const response = await profileAPI.changeEmail(otp);
    console.log("Email changed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Change email failed:", error);
    throw error;
  }
}

// VD 14: Upload avatar
export async function handleUploadAvatar(file: File) {
  try {
    const response = await profileAPI.uploadAvatar(file);
    console.log("Avatar uploaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload avatar failed:", error);
    throw error;
  }
}

// VD 15: Lấy avatar
export async function handleGetAvatar() {
  try {
    const response = await profileAPI.getAvatar();
    console.log("Avatar:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get avatar failed:", error);
    throw error;
  }
}

// ==================== EXAMPLES: USER (ADMIN ONLY) ====================

// VD 16: Lấy tất cả users
export async function handleGetAllUsers() {
  try {
    const response = await userAPI.getAllUsers();
    console.log("All users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get all users failed:", error);
    throw error;
  }
}

// VD 17: Lấy user theo ID
export async function handleGetUserById(userId: string) {
  try {
    const response = await userAPI.getUserById(userId);
    console.log("User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get user by ID failed:", error);
    throw error;
  }
}

// VD 18: Tạo user mới
export async function handleCreateUser(
  username: string,
  email: string,
  password: string,
  phone?: string,
  address?: string
) {
  try {
    const response = await userAPI.createUser({
      username,
      email,
      password,
      phone,
      address,
    });
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create user failed:", error);
    throw error;
  }
}

// VD 19: Cập nhật user
export async function handleUpdateUser(
  userId: string,
  username?: string,
  email?: string,
  phone?: string,
  address?: string
) {
  try {
    const response = await userAPI.updateUser(userId, {
      username,
      email,
      phone,
      address,
    });
    console.log("User updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update user failed:", error);
    throw error;
  }
}

// VD 20: Xóa user
export async function handleDeleteUser(userId: string) {
  try {
    const response = await userAPI.deleteUser(userId);
    console.log("User deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete user failed:", error);
    throw error;
  }
}
