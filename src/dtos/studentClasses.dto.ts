import {  IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentClassesDto {
  @IsString()
  public studentId: string;

  @IsString()
  public subjectId: string;

  @IsString()
  public semester: string;

  @IsString()
  public year: string;

  @IsNumber()
  @IsOptional()
  public n1: number;

  @IsNumber()
  @IsOptional()
  public n2: number;
  
  @IsNumber()
  @IsOptional()
  public absences: number;
}


