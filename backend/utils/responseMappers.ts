import User from "../models/User";
import Avatar from "../models/Avatar";

export function toAvatarResponse(avatar?: Avatar | null) {
  if (!avatar) return null;
  return {
    _id: avatar.id,
    url: avatar.path,
    filename: avatar.filename,
    mimetype: avatar.mimetype,
    size: avatar.size,
    uploadedAt: avatar.uploadedAt,
  };
}

export function toUserResponse(user: User) {
  return {
    _id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: undefined,
    refreshToken: user.refreshToken,
    isActive: user.isActive,
  };
}

export function toProfileResponse(user: User) {
  return {
    ...toUserResponse(user),
    avatar: toAvatarResponse(user.avatar),
  };
}

export function toAuthProfileResponse(user: User) {
  const profile = toUserResponse(user);
  return {
    ...profile,
    refreshToken: undefined,
  };
}
