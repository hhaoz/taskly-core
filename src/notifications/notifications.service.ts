import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SupabaseService } from '../supabase/supabase.service';
import * as CardDTO from './dto/create-card-notification.dto';
import { range } from 'rxjs';
import { NotificationType } from '../enums/notification-type.enum';

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
      throw new BadRequestException(error.message);
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
      return false;
    }
    return data.length > 0;
  }

  async isAcceptNotification(notificationId: string, isAccepted: boolean) {
    // Lấy dữ liệu của thông báo trước khi xóa
    const { data: noti, error } = await this.supabase.supabase
      .from('notification')
      .select('boardId, userId, senderId')
      .eq('id', notificationId)
      .single();

    if (error || !noti) {
      throw new BadRequestException('Notification not found');
    }

    const boardId = noti.boardId;
    const receiver = noti.userId;
    const sender = noti.senderId;

    const { error: deleteError } = await this.supabase.supabase
      .from('notification')
      .delete()
      .eq('id', notificationId);

    if (deleteError) {
      throw new BadRequestException(deleteError.message);
    }

    // check if user is already a member of this board
    const { data: boardMember, error: boardMemberError } =
      await this.supabase.supabase
        .from('board_members')
        .select()
        .eq('user_id', receiver)
        .eq('board_id', boardId)
        .single();

    if (boardMemberError) {
      throw new BadRequestException(boardMemberError.message);
    }

    if (boardMember) {
      throw new BadRequestException('User is already a member of this board');
    }

    if (isAccepted && boardId) {
      const { data, error } = await this.supabase.supabase
        .from('board_members')
        .insert({
          user_id: receiver,
          board_id: boardId,
        });

      if (error) {
        throw new BadRequestException(error.message);
      }

      // create notification for sender
      const newNotification = {
        type: NotificationType.ACCEPT_INVITE,
        boardId,
        userId: sender,
        senderId: receiver,
        read: false,
      };

      const { data: senderNoti, error: senderNotiError } =
        await this.supabase.supabase
          .from('notification')
          .insert(newNotification)
          .select();

      if (senderNotiError) {
        throw new BadRequestException(senderNotiError.message);
      }

      return data;
    }

    if (!isAccepted && boardId) {
      const newNotification = {
        type: NotificationType.DECLINE_INVITE,
        boardId,
        userId: sender,
        senderId: receiver,
        read: false,
      };

      const { data: senderNoti, error: senderNotiError } =
        await this.supabase.supabase
          .from('notification')
          .insert(newNotification)
          .select();

      if (senderNotiError) {
        throw new BadRequestException(senderNotiError.message);
      }
      return senderNoti;
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
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase.supabase
      .from('notification')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }
}
