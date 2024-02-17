import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Region } from './entities/region.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,

    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,
  ) {}

  async getCurrency() {
    const currency = await this.currencyRepo.find({
      order: {
        code: 'DESC',
      },
    });

    return currency;
  }

  async getCurrencyByCurrency(currency: string) {
    const currencyRecord = await this.currencyRepo.findOne({
      where: {
        code: currency,
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

  async createRegion({
    name,
    code,
    currencyId,
  }: {
    name: string;
    code: string;
    currencyId: string;
  }) {
    const region = new Region();
    region.name = name;
    region.code = code;
    region.currencyId = currencyId;

    return await this.regionRepo.save(region);
  }

  async getRegions() {
    const regions = await this.regionRepo.find();

    return regions;
  }

  async getRegionById(id: string) {
    const region = await this.regionRepo.findOne({
      where: {
        id,
      },
    });

    return region;
  }

  async getRegionByCode(code: string) {
    const region = await this.regionRepo.findOne({
      where: {
        code,
      },
    });

    return region;
  }

  @Cron(CronExpression.EVERY_4_HOURS)
  async syncCurrencyValue() {
    try {
      const apiKey = 'sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz';

      const countriesData = await axios.get(
        `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}`,
      );

      const countries = Object.keys(countriesData?.data?.data).map(
        (key) => countriesData?.data?.data[key],
      );

      const currenciesData = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`,
      );

      const currencies = Object.keys(currenciesData?.data?.data).map((key) => ({
        value: currenciesData?.data?.data[key],
        currency: key,
      }));

      await Promise.all(
        currencies.map(async (currency) => {
          const currencyRecord = await this.getCurrencyByCurrency(
            currency.currency,
          );

          if (currencyRecord) {
            currencyRecord.value = currency.value;
            await this.updateCurrency(currencyRecord);
          } else {
            const country = countries.find(
              (country) => country.code === currency.currency,
            );

            const newCurrency = new Currency();
            newCurrency.code = country.code;
            newCurrency.value = currency.value;
            newCurrency.name = country.code;
            newCurrency.symbol = country.symbol;

            await this.createCurrency(newCurrency);
          }

          console.log(currencies);
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
