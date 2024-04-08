import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Region } from './entities/region.entity';
import { AuditTrailService } from '../auditTrail/auditTrail.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly auditTrailService: AuditTrailService,
    private readonly userService: UserService,
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
    userId,
    name,
    code,
    currencyId,
    flag,
  }: {
    userId: string;
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

    const savedRegion = await this.regionRepo.save(region);

    const user = await this.userService.getUserById(userId);
    if(!user) throw new HttpException('User not found', 404);

    const auditTrailEntry = {
      userId: userId,
      auditType: 'CREATE_REGION',
      description: `User ${userId} created a region ${name}, ${code} with currency ID ${currencyId}.`,
      reportableId: savedRegion.id,
    };

    await this.auditTrailService.createAuditTrail(auditTrailEntry);

    return savedRegion;
  }

  async updateRegion({
    userId,
    name,
    code,
    currencyId,
    flag,
    id,
  }: {
    userId: string;
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

      const originalRegion = { ...region};

      if (name) region.name = name;
      if (code) region.code = code;
      if (currencyId) region.currencyId = currencyId;
      if (flag) region.flag = flag;

      const updatedRegion = await this.regionRepo.save(region);

      const user = await this.userService.getUserById(userId);
      if(!user) throw new HttpException('User not found', 404);
      
      const auditTrailEntry = {
        userId: userId,
        auditType: 'UPDATE_REGION',
        description: `User ${userId} updated region ${id}. Changes: ${JSON.stringify({
          original: originalRegion,
          updated: updatedRegion,
        })}`,
        reportableId: id,
      };

      await this.auditTrailService.createAuditTrail(auditTrailEntry);

      return updatedRegion;

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
      newRegion.name = 'Global';
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

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async syncCurrencyValue() {
    try {
      const apiKey = 'cur_live_lqegEL92Bp2kwN37R2F8gBMTOrFtwDenyaLRh0cA';
      const apiKey2 = 'sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz';

      const countriesData = await axios.get(
        `https://api.currencyapi.com/v3/currencies?apikey=${apiKey}`,
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

          const country = countries.find(
            (country) => country.code === currency.currency,
          );

          if (currencyRecord) {
            currencyRecord.code = currency?.currency;
            currencyRecord.value = currency.value;
            currencyRecord.name = country?.name ?? currency.currency;
            currencyRecord.symbol = country?.symbol ?? currency.currency;
            currencyRecord.value = currency.value;
            await this.updateCurrency(currencyRecord);
          } else {
            const newCurrency = new Currency();
            newCurrency.code = currency?.currency;
            newCurrency.value = currency.value;
            newCurrency.name = country?.name ?? currency.currency;
            newCurrency.symbol = country.symbol ?? currency.currency;

            await this.createCurrency(newCurrency);
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncCurrencies() {
  //   const currenciesData = await axios.get(
  //     'https://api.meappbounty.com/payment/currencies',
  //   );
  //   const currencies = currenciesData.data.data;

  //   for (const currency of currencies) {
  //     const currencyRecord = await this.getCurrencyByCurrency(currency.code);

  //     if (currencyRecord) {
  //       currencyRecord.code = currency.code;
  //       currencyRecord.value = currency.value;
  //       currencyRecord.name = currency.name;
  //       currencyRecord.symbol = currency.symbol;
  //       currencyRecord.value = currency.value;
  //       await this.updateCurrency(currencyRecord);
  //     } else {
  //       const newCurrency = new Currency();
  //       newCurrency.code = currency.code;
  //       newCurrency.value = currency.value;
  //       newCurrency.name = currency.name;
  //       newCurrency.symbol = currency.symbol;

  //       await this.createCurrency(newCurrency);
  //     }

  //     if (currency.id === currencies[currencies.length - 1].id) {
  //       console.log('last currency');
  //     }
  //   }
  // }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async removeDuplicateCurrencies() {
  //   const currencies = await this.currencyRepo.find();

  //   for (const currency of currencies) {
  //     const duplicateCurrencies = await this.currencyRepo.find({
  //       where: {
  //         code: currency.id,
  //       },
  //     });

  //     if (duplicateCurrencies.length > 1) {
  //       console.log('duplicateCurrencies', duplicateCurrencies);
  //       await Promise.all(
  //         duplicateCurrencies.map(async (duplicateCurrency, index) => {
  //           if (index > 0) {
  //             await this.currencyRepo.remove(duplicateCurrency);
  //           }
  //         }),
  //       );
  //     }
  //   }
  // }
}
