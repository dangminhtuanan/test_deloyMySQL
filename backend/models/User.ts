import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  password: string;
  refreshToken: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "phone" | "address" | "role" | "refreshToken" | "isActive">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public role!: "user" | "admin";
  public password!: string;
  public refreshToken!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public avatar?: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue("email", typeof value === "string" ? value.trim().toLowerCase() : value);
      },
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
