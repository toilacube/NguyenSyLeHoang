import Joi from 'joi';

export const challengeSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
  tags: Joi.array().items(Joi.string()),
  sampleSolution: Joi.string(),
  testCases: Joi.string(),
  isActive: Joi.boolean()
});