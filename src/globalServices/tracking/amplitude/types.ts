import type {
  ExistingProvider,
  FactoryProvider,
  ModuleMetadata,
  ValueProvider,
} from '@nestjs/common';

import { Options } from '@amplitude/types';

export type AmplitudeServiceOptions = {
  apiKey: string;
} & Partial<Options>;

export type AmplitudeModuleOptions = AmplitudeServiceOptions;

type Provider<T> = {
  provide: ValueProvider<T>['provide'];
  useValue?: ValueProvider<T>['useValue'];
  useFactory?: FactoryProvider<T>['useFactory'];
  inject?: FactoryProvider<T>['inject'];
  scope?: FactoryProvider<T>['scope'];
  useExisting?: ExistingProvider<T>['useExisting'];
};

export type AmplitudeOptionsProvider = Provider<AmplitudeModuleOptions>;

export type AmplitudeModuleAsyncOptions = Omit<
  AmplitudeOptionsProvider,
  'provide'
> & {
  imports?: ModuleMetadata['imports'];
};
