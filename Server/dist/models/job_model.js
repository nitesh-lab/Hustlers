"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.Company = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the Company schema
const companySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
});
exports.Company = mongoose_1.default.model('Company', companySchema);
// Define the Job schema
const jobSchema = new mongoose_1.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['FullTime', 'PartTime', 'Intern'],
        required: true,
    },
    openRoles: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Remote', 'OnSite'], // Add more categories if needed
        required: true,
    },
    stipend: {
        type: String,
        required: true,
    },
    work_id: {
        type: String,
        required: true,
    },
    posted_time: {
        type: Date,
        required: true,
        default: new Date(),
    },
    jobLocation: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    }
});
exports.Job = mongoose_1.default.model('Job', jobSchema);
//# sourceMappingURL=job_model.js.map