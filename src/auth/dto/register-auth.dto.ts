import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    description:
      'Username is required for user registration and must be unique.',
    example: 'example',
  })
  username: string;

  @ApiProperty({
    description: 'Password is required for user registration.',
    example: '1234',
  })
  password: string;

  @ApiProperty({
    description: 'Email is required for user registration and must be unique.',
    example: 'example@gmail.com',
  })
  email: string;
}
