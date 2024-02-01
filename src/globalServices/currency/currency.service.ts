import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  async getCurrency() {
    const currency = await this.currencyRepo.findOne({});

    return currency;
  }

  async getCurrencyByCurrency(currency: string) {
    const currencyRecord = await this.currencyRepo.findOne({
      where: {
        currency,
      },
    });

    return currencyRecord;
  }

  async createCurrency(currency: Currency) {
    const currencyRecord = await this.currencyRepo.save(currency);

    return currencyRecord;
  }

  async updateCurrency(currency: Currency) {
    const currencyRecord = await this.currencyRepo.save(currency);

    return currencyRecord;
  }

  async deleteCurrency(currency: Currency) {
    const currencyRecord = await this.currencyRepo.remove(currency);

    return currencyRecord;
  }

  async getCurrencyById(id: string) {
    const currencyRecord = await this.currencyRepo.findOne({
      where: {
        id,
      },
    });

    return currencyRecord;
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async syncCurrencyValue() {
    await axios
      .get(
        'https://api.currencyapi.com/v3/latest?apikey=cur_live_j5pPTc9oFwO4xCe4Y08efmcB6V6RiaOVCDskxTOR',
      )
      .then(async (response) => {
        const data = response.data?.data;

        const currencies = Object.keys(data).map((key) => data[key]);

        await Promise.all(
          currencies.map(async (currency) => {
            const currencyRecord = await this.getCurrencyByCurrency(
              currency.code,
            );

            if (currencyRecord) {
              currencyRecord.value = currency.value;
              await this.updateCurrency(currencyRecord);
            } else {
              const newCurrency = new Currency();
              newCurrency.currency = currency.code;
              newCurrency.value = currency.value;
              await this.createCurrency(newCurrency);
            }
          }),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
