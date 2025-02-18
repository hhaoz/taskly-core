import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [SupabaseModule],
})
export class AuthModule {}
