"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./swagger"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/image", express_1.default.static("image"));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api", profileRoutes_1.default);
app.get("/", (_req, res) => {
    res.send("API dang chay! Them /docs de mo Swagger");
});
const PORT = Number(process.env.PORT) || 5000;
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`May chu chay tren port ${PORT}`);
        (0, swagger_1.default)(app, PORT);
    });
});
