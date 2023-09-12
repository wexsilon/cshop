import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(registerAuthDto: RegisterAuthDto) {
    const newUser = this.userRepository.create(registerAuthDto);
    return this.userRepository.save(newUser);
  }

  findOneByEmailOrUsername(email: string, username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.username = :username', { username })
      .getOne();
  }
}
