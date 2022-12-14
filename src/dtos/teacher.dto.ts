import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsString()
  public phone: string;

  @IsString()
  public formation: string;

  @IsString()
  public title: string;
    
  @IsNumber()
  public income: number;
}
