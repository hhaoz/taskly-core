import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { initSupabase } from './initSupabase';

@Injectable()
export class SupabaseService {
  public supabase: SupabaseClient = createClient(
    initSupabase.supabaseUrl,
    initSupabase.supabaseKey,
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
