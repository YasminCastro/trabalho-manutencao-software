import {  IsArray, IsString } from 'class-validator';

export class CreateTeacherClassesDto {
  @IsString()
  public teacherId: string;

  @IsString()
  public subjectId: string;

  @IsString()
  public semester: string;

  @IsString()
  public year: string;

  @IsArray()
  public weekDays: Array<string>;

}


