import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'user login route' })
  @ApiBody({ type: LoginAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  handleLoginPost(@Req() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'simple route that test is user authenticated or not' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Get('protect')
  handleProtectGet() {
    return 'Hello World';
  }
}
