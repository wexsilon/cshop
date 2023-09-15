import { Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { IsAdminGuard } from './guards/is.admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
