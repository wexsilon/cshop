import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponse } from './response/login-response';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { WrongUsernameOrPassword } from './response/errors';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login path',
    description:
      'Users can authenticate and access their accounts through this path.',
  })
  @ApiBody({
    type: LoginAuthDto,
    description:
      'The object that should be sent to the login address for entry.',
  })
  @ApiCreatedResponse({
    type: LoginResponse,
    description:
      'If the username and password are correct, it returns an object of LoginResponse.',
  })
  @ApiException(() => new WrongUsernameOrPassword(), {
    description: 'If the username or password is incorrect.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  handleLoginPost(@Req() req) {
    return this.authService.login(req.user);
  }
}
