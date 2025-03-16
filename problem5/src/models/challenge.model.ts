import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'challenges' })
export class Challenge extends Model {
  @Column({ type: DataType.STRING }) title!: string;
  @Column({ type: DataType.TEXT }) description!: string;
  @Column({ type: DataType.ENUM, values: ['easy', 'medium', 'hard'], defaultValue: 'medium' })
  difficulty!: 'easy' | 'medium' | 'hard';
  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] }) tags!: string[];
  @Column(DataType.TEXT) sampleSolution?: string;
  @Column(DataType.TEXT) testCases?: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) isActive!: boolean;
}
