import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('reset-issues')
  async resetIssues(): Promise<{ count: number }> {
    const count = await this.userService.updateIssuesFlag();
    return { count };
  }
}
