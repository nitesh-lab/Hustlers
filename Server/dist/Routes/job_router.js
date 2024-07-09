"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_router = void 0;
const express_1 = require("express");
const job_controller_1 = require("../Controllers/job_controller");
exports.job_router = (0, express_1.Router)();
exports.job_router.route("/createjob").post(job_controller_1.createjob);
exports.job_router.route("/findjobs").post(job_controller_1.findjobs);
//# sourceMappingURL=job_router.js.map