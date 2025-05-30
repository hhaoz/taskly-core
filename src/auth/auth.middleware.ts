import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import * as admin from 'firebase-admin';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
