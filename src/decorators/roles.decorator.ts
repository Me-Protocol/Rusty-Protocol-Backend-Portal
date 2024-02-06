import { Reflector } from '@nestjs/core';
import { BrandRole } from '@src/utils/enums/BrandRole';

export const Roles = Reflector.createDecorator<BrandRole[]>();
