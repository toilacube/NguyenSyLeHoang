"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.challengeSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(3).max(100),
    description: joi_1.default.string().required().min(10),
    difficulty: joi_1.default.string().valid('easy', 'medium', 'hard').required(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    sampleSolution: joi_1.default.string(),
    testCases: joi_1.default.string(),
    isActive: joi_1.default.boolean()
});
