import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    description: 'Success message for new user registration.',
    example: 'new user created',
  })
  message: string;
}
