import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        './todolist-246-25a-firebase-adminsdk-zwkfa-13218b0caa.json',
      ),
    });
  }

  async login(accessToken: any) {
    try {
      console.log(accessToken.accessToken);
      const decodedToken = await admin
        .auth()
        .verifyIdToken(accessToken.accessToken);
      console.log(decodedToken);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
