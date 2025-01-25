import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as process from 'node:process';

@Injectable()
export class SupabaseService {
  public supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  constructor() {
    console.log(this.supabase);
  }

  async fetchCards() {
    const data = await this.supabase.from('card').select();
    console.log(data);
    return data;
  }
}
