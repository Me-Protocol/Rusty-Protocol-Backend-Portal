import {
  CREATE_SENDGRID_CONTACT,
  CreateSendgridContactEvent,
} from '@src/globalServices/mail/create-sendgrid-contact.event';
import { OnEvent } from '@nestjs/event-emitter';
import {
  SENDGRID_API_KEY,
  SENDGRID_BRAND_CONTACT_LIST_ID,
  SENDGRID_USER_CONTACT_LIST_ID,
} from '@src/config/env.config';
import axios from 'axios';
import { UserAppType } from '@src/utils/enums/UserAppType';

export class CreateSendgridContactHandler {
  @OnEvent(CREATE_SENDGRID_CONTACT)
  async handleCreateSendgridContact(event: CreateSendgridContactEvent) {
    const apiUrl = `https://api.sendgrid.com/v3/marketing/contacts`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    };

    console.log('event listener for create sendgrid contact');

    const data = {
      list_ids: [
        event.userType === UserAppType.USER
          ? SENDGRID_USER_CONTACT_LIST_ID
          : SENDGRID_BRAND_CONTACT_LIST_ID,
      ],
      contacts: [
        {
          email: event.email,
          first_name: event.firstName,
          last_name: event.lastName,
        },
      ],
    };
    try {
      await axios.put(apiUrl, data, { headers });
      console.log('successfully created sendgrid contact');
    } catch (e) {
      // console.log(e.response.data.errors);
      console.log('error creating sendgrid contact');
    }
    return;
  }
}
