"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue("email", typeof value === "string" ? value.trim().toLowerCase() : value);
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "",
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "",
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: null,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "User",
});
exports.default = User;
