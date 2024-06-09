import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateIssuesFlag(): Promise<number> {
    const usersWithIssuesCount = await this.userRepository.count({ where: { hasIssues: true } });

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ hasIssues: false })
      .execute();

    return usersWithIssuesCount;
  }
}
