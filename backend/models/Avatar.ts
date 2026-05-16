import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

export interface AvatarAttributes {
  id: number;
  userId: number;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type AvatarCreationAttributes = Optional<AvatarAttributes, "id" | "uploadedAt">;

class Avatar extends Model<AvatarAttributes, AvatarCreationAttributes> implements AvatarAttributes {
  public id!: number;
  public userId!: number;
  public filename!: string;
  public path!: string;
  public mimetype!: string;
  public size!: number;
  public readonly uploadedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Avatar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Avatar",
  }
);

User.hasOne(Avatar, { foreignKey: "userId", as: "avatar", onDelete: "CASCADE" });
Avatar.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Avatar;
