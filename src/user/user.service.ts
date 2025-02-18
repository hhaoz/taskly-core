import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(private supabase: SupabaseService) {}
}
