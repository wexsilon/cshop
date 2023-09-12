import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    description: 'The username that can be used for logging in.',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'The password that the user must enter for logging in.',
    example: '1234',
  })
  password: string;
}
