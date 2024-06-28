"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Base_router_1 = require("./Routes/Base_router");
const mongoConnect_1 = require("./utils/mongoConnect");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: '50mb' }));
app.use("/api", Base_router_1.base_router);
(0, mongoConnect_1.ConnectDB)().then(() => {
    app.listen(8000, () => {
        console.log("listening to port 8000");
    });
});
//# sourceMappingURL=server.js.map