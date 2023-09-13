import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  EmailNotVerified,
  NotFoundVerifyToken,
  UserExists,
  WrongUsernameOrPassword,
} from './response/error-response';
import {
  LoginResponse,
  RegisterResponse,
  VerifyResponse,
} from './response/succssful-response';

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
  @ApiException(() => new EmailNotVerified(), {
    description:
      'If the email is not confirmed, logging in will result in an error.',
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

  @ApiOperation({
    summary: 'User Email Verification',
    description:
      'Through this path, you can confirm the email and allow the user to log into their account.',
  })
  @ApiParam({
    type: String,
    name: 'token',
    description: 'A token used for verification and in UUID format.',
    example: '0af127fa-5926-464d-9029-1da3e1167a92',
  })
  @ApiOkResponse({
    type: VerifyResponse,
    description: 'If confirmation is successful, this exit is triggered.',
  })
  @ApiException(() => new NotFoundVerifyToken(), {
    description:
      'This error is sent when the token does not exist in the database.',
  })
  @Get('verify/:token')
  handleVerfiyGet(@Param('token') token: string) {
    return this.authService.verify(token);
  }
}
