import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserRole } from '@modules/users/enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    lastName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'StrongP@ssw0rd' })
    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    password: string;

    @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiPropertyOptional({ example: '+1234567890' })
    @IsOptional()
    @IsString()
    @Length(8, 20)
    phoneNumber?: string;
} 