import {
  CREATE_SENDGRID_CONTACT,
  CreateSendgridContactEvent,
} from '@src/globalServices/mail/create-sendgrid-contact.event';
import { OnEvent } from '@nestjs/event-emitter';
import { SENDGRID_API_KEY } from '@src/config/env.config';
import axios from 'axios';

export class CreateSendgridContactHandler {
  @OnEvent(CREATE_SENDGRID_CONTACT)
  async handleCreateSendgridContact(event: CreateSendgridContactEvent) {
    const apiUrl = `https://api.sendgrid.com/v3/marketing/contacts`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    };

    console.log('event listener for create sendgrid contact');
    console.log('event.email', event.email);

    const data = {
      contacts: [
        {
          email: event.email,
          first_name: event.firstName,
          last_name: event.lastName,
          custom_fields: {
            firstName: event.firstName,
          },
        },
      ],
    };

    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: data,
    };
    try {
      await axios.post(apiUrl, data, { headers });
      console.log('successfully created sendgrid contact');
    } catch (e) {
      console.log('error creating sendgrid contact');
    }
    return;
  }
}
