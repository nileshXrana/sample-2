import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserValidator } from './create-user.validator';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserHandler {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // bcrypt
  private readonly saltRounds = 10;
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async execute(createUser: CreateUserValidator) {
    const { email, password } = createUser;

    const hashedPassword = await this.hashPassword(password);
    const existingUser = await this.userRepository.findOne({
      where: [{ email: email }],
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const newUser = this.userRepository.create({
      email: email,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(newUser);
    return {
      id: user.id,
      email: user.email,
    };
  }
}
