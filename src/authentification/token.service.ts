import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class TokenService {

  constructor(private readonly jwtService: JwtService) { }
  async encode(payload: any) {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async decode(token: string) {
    try {
      const user = await this.jwtService.verifyAsync(token);
      if (!user) {
        throw new Error("Token invalid");
      }
      if (user.exp < Date.now() / 1000) {
        throw new Error("Token expired");
      }
      return user;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}