import { UserAppType } from '@src/utils/enums/UserAppType';

export const CREATE_SENDGRID_CONTACT = 'sendgrid.contact.create';

export class CreateSendgridContactEvent {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly userType: UserAppType,
  ) {}
}
