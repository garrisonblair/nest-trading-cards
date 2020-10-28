import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
      ) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user) {
        const hash = user.password
        if (bcrypt.compareSync(pass, hash)) {
            const { password, ...endResult } = user
            return endResult
        }
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.username, sub: user.userId }
      const loggedInUser = await this.usersService.findUserWithCards(user.username);
      return {
        user: loggedInUser,
        access_token: this.jwtService.sign(payload),
      };
    }
      
}
