"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
exports.client = (0, redis_1.createClient)({
    password: (process.env.REDIS_PW),
    socket: {
        host: (process.env.REDIS_HOST),
        port: parseInt(process.env.REDIS_PORT) || 13528
    }
});
exports.client.on('error', (err) => console.log(err));
if (!exports.client.isOpen) {
    exports.client.connect();
}
//# sourceMappingURL=redisConnect.js.map