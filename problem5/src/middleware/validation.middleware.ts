import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import HttpException from '../utils/HttpException';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new HttpException(400, errorMessage));
    }
    
    next();
  };
};