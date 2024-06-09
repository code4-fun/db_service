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
    const batchSize = 10000;
    let totalUpdated = 0;
    const usersWithProblems = await this.userRepository.find({ select: ["id"], where: { hasIssues: true } });
    const idsToUpdate = usersWithProblems.map(user => user.id);

    const updateBatch = async (startIndex: number): Promise<void> => {
      const idsBatch = idsToUpdate.slice(startIndex, startIndex + batchSize);
      if (idsBatch.length === 0) {
        return;
      }

      try{
        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({ hasIssues: false })
          .where('id IN (:...ids)', { ids: idsBatch })
          .execute();

        totalUpdated += idsBatch.length;
        console.log(`End updating batch at ${new Date().toISOString()}, total updated: ${totalUpdated}`);
      } catch(error){
        console.error(`Error updating batch at ${new Date().toISOString()}, total updated: ${totalUpdated}`, error);
        throw error;
      }

      await updateBatch(startIndex + batchSize);
    };

    await updateBatch(0);

    return totalUpdated;
  }
}
