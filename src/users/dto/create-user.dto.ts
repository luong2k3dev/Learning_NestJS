import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
