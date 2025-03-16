import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    error: message,
    statusCode: status
  });
};