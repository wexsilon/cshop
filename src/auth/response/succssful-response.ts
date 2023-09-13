import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    description: 'Success message for new user registration.',
    example: 'new user created',
  })
  message: string;
}

export class LoginResponse {
  @ApiProperty({
    description:
      'The token that is created using JWT and should be placed in the request header.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY5NDUxOTQwNSwiZXhwIjoxNjk1MTI0MjA1fQ.-Kr5yxINrkkfPVJDt1UWQMxq6a4ENLRlJQnmnWZjIZU',
  })
  access_token: string;
}

export class VerifyResponse {
  @ApiProperty({
    description:
      'If email confirmation is successful, this message will be sent.',
    example: 'email succssful verified',
  })
  message: string;
}
