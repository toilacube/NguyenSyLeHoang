"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChallenge = exports.updateChallenge = exports.getChallenge = exports.getChallenges = exports.createChallenge = void 0;
const challenge_model_1 = require("../models/challenge.model");
const sequelize_1 = require("sequelize");
const HttpException_1 = __importDefault(require("../utils/HttpException"));
const createChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const challengeData = req.body;
        const challenge = yield challenge_model_1.Challenge.create(challengeData);
        res.status(201).json({
            success: true,
            data: challenge,
            message: 'Challenge created successfully',
            statusCode: 201
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createChallenge = createChallenge;
const getChallenges = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = {
            difficulty: req.query.difficulty,
            tag: req.query.tag,
            searchTerm: req.query.search,
            isActive: req.query.isActive ? req.query.isActive === 'true' : true
        };
        const pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        };
        const whereClause = {};
        if (filters.difficulty) {
            whereClause.difficulty = filters.difficulty;
        }
        if (filters.isActive !== undefined) {
            whereClause.isActive = filters.isActive;
        }
        if (filters.searchTerm) {
            whereClause[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.like]: `%${filters.searchTerm}%` } },
                { description: { [sequelize_1.Op.like]: `%${filters.searchTerm}%` } }
            ];
        }
        console.log("whereClause:", whereClause);
        const offset = (pagination.page - 1) * pagination.limit;
        const { count, rows } = yield challenge_model_1.Challenge.findAndCountAll({
            where: whereClause,
            limit: pagination.limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        const totalPages = Math.ceil(count / pagination.limit);
        res.status(200).json({
            success: true,
            data: rows,
            statusCode: 200,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalItems: count,
                totalPages
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getChallenges = getChallenges;
const getChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const challenge = yield challenge_model_1.Challenge.findByPk(id);
        if (!challenge) {
            throw new HttpException_1.default(404, 'Challenge not found');
        }
        res.status(200).json({
            success: true,
            data: challenge,
            statusCode: 200
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getChallenge = getChallenge;
const updateChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const challengeData = req.body;
        const challenge = yield challenge_model_1.Challenge.findByPk(id);
        if (!challenge) {
            throw new HttpException_1.default(404, 'Challenge not found');
        }
        yield challenge.update(challengeData);
        const updatedChallenge = yield challenge_model_1.Challenge.findByPk(id);
        res.status(200).json({
            success: true,
            data: updatedChallenge,
            message: 'Challenge updated successfully',
            statusCode: 200
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateChallenge = updateChallenge;
const deleteChallenge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const challenge = yield challenge_model_1.Challenge.findByPk(id);
        if (!challenge) {
            throw new HttpException_1.default(404, 'Challenge not found');
        }
        yield challenge.destroy();
        res.status(200).json({
            success: true,
            message: 'Challenge deleted successfully',
            statusCode: 200
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteChallenge = deleteChallenge;
