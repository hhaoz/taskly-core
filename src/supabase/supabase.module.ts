import { Injectable, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
