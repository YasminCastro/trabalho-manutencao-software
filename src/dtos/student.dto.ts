import { IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsString()
  public phone: string;

  @IsString()
  public registration: string;

  @IsString()
  public course: string;
}
