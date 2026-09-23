import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../../domain/entities/users.entity';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    const users = [
      { email: 'owner@example.com', password: 'password' },
      { email: 'manager@example.com', password: 'password' },
      { email: 'editor@example.com', password: 'password' },
      { email: 'member@example.com', password: 'password' },
    ];

    for (const user of users) {
      const existingUser = await repository.findOne({
        where: { email: user.email },
      });
      if (!existingUser) {
        const newUser = repository.create(user);
        await repository.save(newUser);
      }
    }
  }
}
