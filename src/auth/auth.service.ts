import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as process from 'node:process';
import * as dotenv from 'dotenv';

dotenv.config();
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

@Injectable()
export class AuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
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
