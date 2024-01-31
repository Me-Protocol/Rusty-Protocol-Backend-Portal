import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyService)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  async getCurrency() {
    const currency = await this.currencyRepo.findOne({
      order: {
        currency: 'DESC',
      },
    });

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

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncCurrencyValue() {
    await axios
      .get(
        'https://api.currencyapi.com/v3/latest?apikey=cur_live_j5pPTc9oFwO4xCe4Y08efmcB6V6RiaOVCDskxTOR',
      )
      .then(async (response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
