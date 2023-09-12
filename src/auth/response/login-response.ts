import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description:
      'The token that is created using JWT and should be placed in the request header.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY5NDUxOTQwNSwiZXhwIjoxNjk1MTI0MjA1fQ.-Kr5yxINrkkfPVJDt1UWQMxq6a4ENLRlJQnmnWZjIZU',
  })
  access_token: string;
}
