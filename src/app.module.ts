import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { GenerateUsers1717936752241 } from './migrations/1717936752241-GenerateUsers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54321,
      username: 'postgres',
      password: 'postgres',
      database: 'db_service',
      entities: [User],
      migrations: [GenerateUsers1717936752241],
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    UserModule,
  ]
})
export class AppModule {}
