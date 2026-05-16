"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const User_1 = __importDefault(require("./User"));
class Avatar extends sequelize_1.Model {
}
Avatar.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    filename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    uploadedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Avatar",
});
User_1.default.hasOne(Avatar, { foreignKey: "userId", as: "avatar", onDelete: "CASCADE" });
Avatar.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
exports.default = Avatar;
