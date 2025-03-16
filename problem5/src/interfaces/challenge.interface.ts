export interface ChallengeDto {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags?: string[];
    sampleSolution?: string;
    testCases?: string;
    isActive?: boolean;
  }

  export interface ChallengeFilters {
    difficulty?: 'easy' | 'medium' | 'hard';
    tag?: string;
    searchTerm?: string;
    isActive?: boolean;
  }
  
  export interface PaginationOptions {
    page?: number;
    limit?: number;
  }