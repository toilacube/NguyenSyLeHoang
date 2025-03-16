import { Router } from "express";
import {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
} from "../controllers/challenge.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { challengeSchema } from "../validators/challenge.validator";
const router = Router();

router.post("/", validateRequest(challengeSchema), createChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.put("/:id", validateRequest(challengeSchema), updateChallenge);
router.delete("/:id", deleteChallenge);

export default router;
