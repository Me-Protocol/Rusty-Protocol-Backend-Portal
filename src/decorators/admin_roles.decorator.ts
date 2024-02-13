import { Reflector } from '@nestjs/core';
import { AdminRole } from '@src/utils/enums/AdminRole';

export const AdminRoles = Reflector.createDecorator<AdminRole[]>();
