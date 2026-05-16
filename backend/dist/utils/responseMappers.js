"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAvatarResponse = toAvatarResponse;
exports.toUserResponse = toUserResponse;
exports.toProfileResponse = toProfileResponse;
exports.toAuthProfileResponse = toAuthProfileResponse;
function toAvatarResponse(avatar) {
    if (!avatar)
        return null;
    return {
        _id: avatar.id,
        url: avatar.path,
        filename: avatar.filename,
        mimetype: avatar.mimetype,
        size: avatar.size,
        uploadedAt: avatar.uploadedAt,
    };
}
function toUserResponse(user) {
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
function toProfileResponse(user) {
    return {
        ...toUserResponse(user),
        avatar: toAvatarResponse(user.avatar),
    };
}
function toAuthProfileResponse(user) {
    const profile = toUserResponse(user);
    return {
        ...profile,
        refreshToken: undefined,
    };
}
