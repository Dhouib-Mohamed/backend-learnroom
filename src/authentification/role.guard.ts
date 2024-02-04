import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";
import { TokenService } from "./token.service";
import { Role } from "./role.enum";

export const RoleGuard = (roles?: Role [] | Role) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor( public TokenService : TokenService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Token not found");
      }
      const user = await this.TokenService.decode(token);
      if (!user.role) {
        throw new Error("User has no role");
      }
      if (!roles || roles.includes(user.role)) {
        request.user = user;
        return true;
      }
      throw new Error("User have no permission");
    };
  }
  return mixin(RoleGuardMixin);
}
