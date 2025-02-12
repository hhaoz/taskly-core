import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SupabaseService } from '../supabase/supabase.service';
import * as CardDTO from './dto/create-card-notification.dto';
import { range } from 'rxjs';

@Injectable()
export class NotificationsService {
  constructor(private supabase: SupabaseService) {}

  async findAll(userId: string, limit: number, offset: number) {
    const { data, error } = await this.supabase.supabase
      .from('notification')
      .update({ read: true })
      .eq('userId', userId)
      .eq('read', false)
      .range(offset, offset + limit);

    if (error) {
      return new BadRequestException(error.message);
    }

    return this.supabase.supabase
      .from('notification')
      .select()
      .eq('userId', userId)
      .range(offset, offset + limit)
      .order('created_at', { ascending: false });
  }

  async isNewNotification(userId: string) {
    const { data, error } = await this.supabase.supabase
      .from('notification')
      .select()
      .eq('userId', userId)
      .eq('read', false)
      .single();

    if (error) {
      return new BadRequestException(error.message);
    }
    return data.length > 0;
  }

  async isAcceptNotification(notificationId: string, isAccepted: boolean) {
    // Lấy dữ liệu của thông báo trước khi xóa
    const { data: noti, error } = await this.supabase.supabase
      .from('notification')
      .select('boardId, userId')
      .eq('id', notificationId)
      .single();

    if (error || !noti) {
      return new BadRequestException('Notification not found');
    }

    const boardId = noti.boardId;
    const userId = noti.userId;

    const { error: deleteError } = await this.supabase.supabase
      .from('notification')
      .delete()
      .eq('id', notificationId);

    if (deleteError) {
      return new BadRequestException(deleteError.message);
    }

    const { data: boardMember, error: boardMemberError } =
      await this.supabase.supabase
        .from('board_members')
        .select()
        .eq('user_id', userId)
        .eq('board_id', boardId)
        .single();

    if (boardMemberError) {
      return new BadRequestException(boardMemberError.message);
    }

    if (boardMember) {
      return new BadRequestException('User is already a member of this board');
    }

    if (isAccepted && boardId) {
      const { data, error } = await this.supabase.supabase
        .from('board_members')
        .insert({
          user_id: userId,
          board_id: boardId,
        });

      if (error) {
        return new BadRequestException(error.message);
      }

      return data;
    }

    return {
      statusCode: HttpStatus.OK,
    };
  }

  async create(createNotificationDto: CreateNotificationDto, senderId: string) {
    const newNotification = {
      ...createNotificationDto,
      read: false,
      senderId,
    };

    const { data, error } = await this.supabase.supabase
      .from('notification')
      .insert(newNotification)
      .select();

    if (error) {
      return new BadRequestException(error.message);
    }

    return data;
  }

  async createCardNotification(
    createNotificationDto: CardDTO.CreateNotificationDto,
    senderId: string,
  ) {
    const newNotification = {
      ...createNotificationDto,
      read: false,
      senderId,
    };

    const { data, error } = await this.supabase.supabase
      .from('notification')
      .insert(newNotification)
      .select();

    if (error) {
      return new BadRequestException(error.message);
    }

    return data;
  }
}
