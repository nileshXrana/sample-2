import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetCurrentUserHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
