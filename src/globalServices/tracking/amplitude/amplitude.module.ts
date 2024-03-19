import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AMPLITUDE_CONFIG } from './config';
import { AmplitudeService } from './amplitude.service';
import type {
  AmplitudeModuleAsyncOptions,
  AmplitudeModuleOptions,
} from './types';

@Module({
  providers: [AmplitudeService],
  exports: [AmplitudeService],
})
export class AmplitudeModule {
  public static register(options: AmplitudeModuleOptions): DynamicModule {
    const optionsProvider = this.createOptionsProvider(options);
    return {
      module: AmplitudeModule,
      providers: [AmplitudeService, optionsProvider],
      exports: [AmplitudeService, optionsProvider],
    };
  }

  private static createOptionsProvider(
    options: AmplitudeModuleOptions,
  ): Provider<AmplitudeModuleOptions> {
    return {
      provide: AMPLITUDE_CONFIG,
      useValue: options,
    };
  }

  public static registerAsync(
    options: AmplitudeModuleAsyncOptions,
  ): DynamicModule {
    const optionsProvider = this.createAsyncOptionsProvider(options);
    return {
      module: AmplitudeModule,
      imports: options.imports || [],
      providers: [AmplitudeService, optionsProvider],
      exports: [AmplitudeService, optionsProvider],
    };
  }

  private static createAsyncOptionsProvider(
    options: AmplitudeModuleAsyncOptions,
  ): Provider<AmplitudeModuleOptions> {
    if (!options.useFactory && !options.useExisting && !options.useValue) {
      throw new Error(
        'AmplitudeModule registerAsync options require a provider',
      );
    }

    return {
      provide: AMPLITUDE_CONFIG,
      ...options,
    } as Provider<AmplitudeModuleOptions>;
  }
}
