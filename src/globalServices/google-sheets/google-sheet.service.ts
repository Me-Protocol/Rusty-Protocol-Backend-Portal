/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { promises as fs } from 'fs';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '@src/config/env.config';

sgMail.setApiKey(SENDGRID_API_KEY);

@Injectable()
export class GoogleSheetService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
  private readonly TOKEN_PATH = path.join(process.cwd(), 'google_token.json');
  private readonly CREDENTIALS_PATH = path.join(
    process.cwd(),
    'google_client.json',
  );

  constructor(
    @InjectRepository(RewardRegistry)
    private readonly rewardRegistryRepository: Repository<RewardRegistry>,
  ) {}

  private async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content.toString());
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  private async saveCredentials(client) {
    const content = await fs.readFile(this.CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }

  public async authorizeWithSavedCredentials() {
    try {
      let savedClient = await this.loadSavedCredentialsIfExist();
      if (savedClient) {
        return savedClient;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  public async authorize() {
    try {
      const savedClient = await this.loadSavedCredentialsIfExist();
      if (savedClient) {
        return savedClient;
      }
      console.log(this.CREDENTIALS_PATH);
      const authClient = await authenticate({
        scopes: this.SCOPES,
        keyfilePath: this.CREDENTIALS_PATH,
      });
      console.log('authClient', authClient);
      if (authClient.credentials) {
        await this.saveCredentials(authClient);
      }
      return authClient;
    } catch (e) {
      return null;
    }
  }

  public async writeToSpreadsheet(
    userId: string,
    email: string,
    first_name: string,
    last_name: string,
  ) {
    const auth = await this.authorizeWithSavedCredentials();
    if (!auth) {
      return;
    }
    // @ts-ignore
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '1su--p_P8lvy2E6ZFlfO7t2uwo0IKUZGwktkDYZFMa2w';
    const range = 'Templating!A1:H';

    let existingData = [];
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      });
      existingData = response.data.values || [];
    } catch (err) {
      console.error('Error reading existing data from the sheet:', err);
      return;
    }

    const reward = await this.rewardRegistryRepository.find({
      where: {
        userId: userId,
      },
      relations: ['reward', 'reward.brand'],
    });
    if (!reward) {
      return;
    }

    const userRewards = reward.map((r) => {
      return [
        email,
        first_name,
        last_name,
        r.reward.brand.online_store_type === OnlineStoreType.WOOCOMMERCE
          ? r.reward.brand.woocommerce_online_store_url
          : r.reward.brand.shopify_online_store_url ?? '',
        r.totalBalance,
        r.reward.brand.name,
        r.reward.rewardName,
        'pending',
      ];
    });

    if (userRewards.length === 0) {
      await this.sendEmailToUserWithoutRewards(email, first_name);
      return;
    }

    const values = [...existingData, ...userRewards];

    const resource = {
      values: values,
    };

    new Promise((resolve, reject) => {
      // @ts-ignore
      sheets.spreadsheets.values.update(
        {
          spreadsheetId: spreadsheetId,
          range: range,
          valueInputOption: 'USER_ENTERED',
          // @ts-ignore
          resource: resource,
        },

        (err, result) => {
          if (err) {
            console.log('The API returned an error: ' + err);
            // reject(err);
          }
          // resolve(result);
          console.log('result', result);
        },
      );
    });
  }

  public async sendEmailToUserWithoutRewards(
    email: string,
    first_name: string,
  ) {
    const payload = {
      to: email,
      from: 'Me Marketplace <noreply@memarketplace.io>',
      templateId: 'd-797d63ae277e455a8694de84e7673ed4',
      dynamic_template_data: {
        name: first_name,
      },
    };
    sgMail.send(payload).then(
      () => {},
      (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }
}
