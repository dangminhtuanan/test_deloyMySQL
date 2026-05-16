"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../config/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Khong co token, truy cap bi tu choi" });
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch (_error) {
        return res.status(403).json({ message: "Token khong hop le hoac da het han" });
    }
};
exports.default = authMiddleware;
