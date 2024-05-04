import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from "../../../../../../users/types"
import { Types } from 'mongoose';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    console.log(request)
    // return { _id: new Types.ObjectId(user.sub) };
    return "ssss";
    // console.log(typeof(user));
    // console.log((user.sub));
    // return user.sub;
  },
);