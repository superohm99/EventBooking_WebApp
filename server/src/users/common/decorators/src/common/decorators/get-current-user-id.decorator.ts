import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from "../../../../../../users/types"
import { Types } from 'mongoose';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): Types.ObjectId => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    console.log(request);
    return user.sub;
  },
);