import { HttpException, Injectable } from '@nestjs/common';
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
    flag,
  }: {
    name: string;
    code: string;
    currencyId: string;
    flag: string;
  }) {
    const currency = await this.currencyRepo.findOne({
      where: { id: currencyId },
    });

    if (!currency) throw new Error('Currency not found');

    const region = new Region();
    region.name = name;
    region.code = code;
    region.currencyId = currencyId;
    region.flag = flag;

    return await this.regionRepo.save(region);
  }

  async updateRegion({
    name,
    code,
    currencyId,
    flag,
    id,
  }: {
    name: string;
    code: string;
    currencyId: string;
    flag: string;
    id: string;
  }) {
    try {
      const currency = await this.currencyRepo.findOne({
        where: { id: currencyId },
      });

      if (!currency) throw new Error('Currency not found');

      const region = await this.regionRepo.findOne({
        where: { id },
      });

      if (!region) throw new Error('Region not found');

      if (name) region.name = name;
      if (code) region.code = code;
      if (currencyId) region.currencyId = currencyId;
      if (flag) region.flag = flag;

      return await this.regionRepo.save(region);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, 400, {
        cause: new Error('updateRegion'),
      });
    }
  }

  async getRegions() {
    const regions = await this.regionRepo.find({
      relations: ['currency'],
    });

    return regions;
  }

  async getRegionById(id: string) {
    const region = await this.regionRepo.findOne({
      where: {
        id,
      },
      relations: ['currency'],
    });

    return region;
  }

  async getDefaultRegion() {
    const region = await this.regionRepo.findOne({
      where: {
        isDefault: true,
      },
      relations: ['currency'],
    });

    if (!region) {
      const newRegion = new Region();
      newRegion.name = 'Default Region';
      newRegion.code = 'DR';
      newRegion.flag = 'dr';
      newRegion.isDefault = true;

      await this.regionRepo.save(newRegion);

      return await this.getDefaultRegion();
    }

    return region;
  }

  async saveRegion(region: Region) {
    const regionRecord = await this.regionRepo.save(region);

    return regionRecord;
  }

  async getRegionByCode(code: string) {
    const region = await this.regionRepo.findOne({
      where: {
        code,
      },
      relations: ['currency'],
    });

    return region;
  }

  @Cron(CronExpression.EVERY_4_HOURS)
  async syncCurrencyValue() {
    try {
      const apiKey = 'cur_live_lqegEL92Bp2kwN37R2F8gBMTOrFtwDenyaLRh0cA';
      const apiKey2 = 'sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz';

      const countriesData = await axios.get(
        `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey2}`,
      );

      const countries = Object.keys(countriesData?.data?.data).map(
        (key) => countriesData?.data?.data[key],
      );

      const currenciesData = await axios.get(
        `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`,
      );

      const currencies = Object.keys(currenciesData?.data?.data).map((key) => ({
        value: currenciesData?.data?.data[key]?.value,
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

            console.log(country);

            const newCurrency = new Currency();
            newCurrency.code = currency?.currency;
            newCurrency.value = currency.value;
            newCurrency.name = country?.code || currency.currency;
            newCurrency.symbol = currency.currency;

            await this.createCurrency(newCurrency);
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
