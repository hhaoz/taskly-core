import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SupabaseModule],
})
export class UserModule {}
