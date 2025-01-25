import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { CardModule } from './card/card.module';
import { GatewayGateway } from './gateway/gateway.gateway';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { ChecklistItemModule } from './checklist-item/checklist-item.module';
import { SupabaseService } from './supabase/supabase.service';
import { SupabaseModule } from './supabase/supabase.module';

import * as process from 'node:process';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.xifoyeacybvpukqvsccz',
      password: 'Bodulatao1212',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TaskModule,
    CardModule,
    BoardModule,
    CommentModule,
    ChecklistItemModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, GatewayGateway, SupabaseService],
})
export class AppModule {}

console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE,
);
