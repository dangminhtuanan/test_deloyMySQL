import Avatar from "../models/Avatar";

export async function findAvatarByUserId(userId: number) {
  return Avatar.findOne({ where: { userId } });
}

export async function deleteAvatarsByUserId(userId: number) {
  return Avatar.destroy({ where: { userId } });
}

export async function createAvatar(data: {
  userId: number;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}) {
  return Avatar.create(data);
}
