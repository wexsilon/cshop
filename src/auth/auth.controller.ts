import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginResponse } from './response/login-response';
import { UserExists, WrongUsernameOrPassword } from './response/errors';
import { RegisterResponse } from './response/register-response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login',
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

  @ApiOperation({
    summary: 'User Registration',
    description: 'Users can register through this path.',
  })
  @ApiBody({
    type: RegisterAuthDto,
    description: 'Users can register by sending the RegisterAuthDto object.',
  })
  @ApiCreatedResponse({
    type: RegisterResponse,
    description:
      'If the username and email do not belong to another user, registration will be successful.',
  })
  @ApiException(() => new UserExists('username or email'), {
    description: 'The username or password belongs to another user.',
  })
  @Post('register')
  handleRegisterPost(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('verify')
  // handleVerfiyGet(@Req() req) {
  //   return req.user;
  // }
}
