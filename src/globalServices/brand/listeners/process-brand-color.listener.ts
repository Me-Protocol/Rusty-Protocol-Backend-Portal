import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProcessBrandColorEvent } from '../events/process-brand-color.event';
import axios from 'axios';
import Vibrant from 'node-vibrant';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class ProcessBrandColor {
  constructor(private readonly brandRepository: Repository<Brand>) {}
  @OnEvent('process.brand.color', { async: true })
  async handleOrderCreatedEvent(event: ProcessBrandColorEvent) {
    const response = await axios.get(event.url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data);

    const vibrant = new Vibrant(buffer);
    const swatches = await vibrant.swatches();

    const sortedSwatches = Object.values(swatches).sort(
      (a, b) => b.population - a.population,
    );

    // Get the top two predominant colors
    const [primaryColor, secondaryColor] = sortedSwatches
      .slice(0, 2)
      .map((swatch) => swatch.hex);

    try {
      await this.brandRepository.update(
        { id: event.brandId },
        {
          brandPrimaryColor: primaryColor,
          brandSecondaryColor: secondaryColor,
        },
      );
    } catch (error) {
      logger.error(error);
    }
  }
}
