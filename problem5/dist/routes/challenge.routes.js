"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const challenge_controller_1 = require("../controllers/challenge.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const challenge_validator_1 = require("../validators/challenge.validator");
const router = (0, express_1.Router)();
router.post("/", (0, validation_middleware_1.validateRequest)(challenge_validator_1.challengeSchema), challenge_controller_1.createChallenge);
router.get("/", challenge_controller_1.getChallenges);
router.get("/:id", challenge_controller_1.getChallenge);
router.put("/:id", (0, validation_middleware_1.validateRequest)(challenge_validator_1.challengeSchema), challenge_controller_1.updateChallenge);
router.delete("/:id", challenge_controller_1.deleteChallenge);
exports.default = router;
