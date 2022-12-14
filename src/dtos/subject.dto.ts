import {  IsNumber, IsString } from 'class-validator';

export class CreateSubjectDto {

  @IsString()
  public name: string;

  @IsString()
  public code: string;

  @IsNumber()
  public workload: number;

}
