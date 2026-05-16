"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        await exports.sequelize.sync();
        console.log("MySQL ket noi thanh cong");
    }
    catch (error) {
        console.error("MySQL ket noi that bai:", error.message || error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
