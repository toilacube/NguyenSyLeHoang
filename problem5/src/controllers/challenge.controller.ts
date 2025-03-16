import { Request, Response, NextFunction } from 'express';
import { Challenge } from '../models/challenge.model';
import { Op } from 'sequelize';
import { 
  ChallengeDto, 
  ChallengeFilters, 
  PaginationOptions 
} from '../interfaces/challenge.interface';
import { ApiResponse } from '../interfaces/response.interface';
import HttpException from '../utils/HttpException';

export const createChallenge = async (
  req: Request, 
  res: Response<ApiResponse<Challenge>>, 
  next: NextFunction
) => {
  try {
    const challengeData: ChallengeDto = req.body;
    const challenge = await Challenge.create(challengeData as any);
    
    res.status(201).json({
      success: true,
      data: challenge,
      message: 'Challenge created successfully',
      statusCode: 201
    });
  } catch (error) {
    next(error);
  }
};

export const getChallenges = async (
  req: Request, 
  res: Response<ApiResponse<Challenge[]>>, 
  next: NextFunction
) => {
  try {
    const filters: ChallengeFilters = {
      difficulty: req.query.difficulty as any,
      tag: req.query.tag as string,
      searchTerm: req.query.search as string,
      isActive: req.query.isActive ? req.query.isActive === 'true' : true
    };


    const pagination: PaginationOptions = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10
    };

    const whereClause: any = {};

    if (filters.difficulty) {
      whereClause.difficulty = filters.difficulty;
    }
    
    if (filters.isActive !== undefined) {
      whereClause.isActive = filters.isActive;
    }
    
    if (filters.searchTerm) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${filters.searchTerm}%` } },
        { description: { [Op.like]: `%${filters.searchTerm}%` } }
      ];
    }
    
    console.log("whereClause:", whereClause);
    const offset = (pagination.page! - 1) * pagination.limit!;
    
    const { count, rows } = await Challenge.findAndCountAll({
      where: whereClause,
      limit: pagination.limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / pagination.limit!);
    
    res.status(200).json({
      success: true,
      data: rows,
      statusCode: 200,
      pagination: {
        page: pagination.page!,
        limit: pagination.limit!,
        totalItems: count,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getChallenge = async (
  req: Request, 
  res: Response<ApiResponse<Challenge>>, 
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const challenge = await Challenge.findByPk(id);
    
    if (!challenge) {
      throw new HttpException(404, 'Challenge not found');
    }
    
    res.status(200).json({
      success: true,
      data: challenge,
      statusCode: 200
    });
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (
  req: Request, 
  res: Response<ApiResponse<Challenge>>, 
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const challengeData: Partial<ChallengeDto> = req.body;
    
    const challenge = await Challenge.findByPk(id);
    
    if (!challenge) {
      throw new HttpException(404, 'Challenge not found');
    }
    
    await challenge.update(challengeData);
    
    const updatedChallenge = await Challenge.findByPk(id);
    
    res.status(200).json({
      success: true,
      data: updatedChallenge!,
      message: 'Challenge updated successfully',
      statusCode: 200
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChallenge = async (
  req: Request, 
  res: Response<ApiResponse<null>>, 
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const challenge = await Challenge.findByPk(id);
    
    if (!challenge) {
      throw new HttpException(404, 'Challenge not found');
    }
    
    await challenge.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Challenge deleted successfully',
      statusCode: 200
    });
  } catch (error) {
    next(error);
  }
};
