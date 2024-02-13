/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ApiKeyService } from '@src/globalServices/api_key/api_key.service';
import { ApiKeyManagementService } from './service';

describe('ApiKeyManagementService', () => {
  let service: ApiKeyManagementService;
  let apiKeyService: ApiKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyManagementService,
        {
          provide: ApiKeyService,
          useValue: {
            createApiKey: jest.fn(),
            getApiKeysByBrandId: jest.fn(),
            get: jest.fn(),
            deleteApiKey: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApiKeyManagementService>(ApiKeyManagementService);
    apiKeyService = module.get<ApiKeyService>(ApiKeyService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createApiKey', () => {
    it('should create an API key successfully', async () => {
      const brandId = 'brand123';
      const name = 'Test Key';

      const expectedResult = {
        key: 'generatedKey',
        protocolPublicKey: 'publicKey',
      };

      jest
        .spyOn(apiKeyService, 'createApiKey')
        // @ts-ignore
        .mockResolvedValue(expectedResult);

      const result = await service.createApiKey(brandId, name);

      expect(apiKeyService.createApiKey).toHaveBeenCalledWith(brandId, name);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an HttpException when an error occurs during API key creation', async () => {
      const brandId = 'brand123';
      const name = 'Test Key';

      const errorMessage = 'API key creation failed';
      jest
        .spyOn(apiKeyService, 'createApiKey')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.createApiKey(brandId, name)).rejects.toThrowError(
        new HttpException(errorMessage, undefined, {
          cause: new Error(errorMessage),
        }),
      );
    });
  });

  describe('getApiKeysByBrandId', () => {
    it('should return API keys for a given brandId', async () => {
      const brandId = 'brand123';
      const expectedApiKeys = [
        { key: 'key1', protocolPublicKey: 'publicKey1' },
        { key: 'key2', protocolPublicKey: 'publicKey2' },
      ];

      jest
        .spyOn(apiKeyService, 'getApiKeysByBrandId')
        // @ts-ignore
        .mockResolvedValue(expectedApiKeys);

      const result = await service.getApiKeysByBrandId(brandId);

      expect(apiKeyService.getApiKeysByBrandId).toHaveBeenCalledWith(brandId);
      expect(result).toEqual(expectedApiKeys);
    });
  });

  describe('deleteApiKey', () => {
    it('should delete an API key successfully', async () => {
      const id = 'key123';
      const brandId = 'brand123';

      const apiKey = { key: 'key123', protocolPublicKey: 'publicKey123' };

      // @ts-ignore
      jest.spyOn(apiKeyService, 'get').mockResolvedValue(apiKey);

      const result = await service.deleteApiKey(id, brandId);

      expect(apiKeyService.get).toHaveBeenCalledWith(id, brandId);
      expect(apiKeyService.deleteApiKey).toHaveBeenCalledWith(id, brandId);
      expect(result).toEqual({ protocolPublicKey: apiKey.protocolPublicKey });
    });

    it('should throw an HttpException when the API key is not found', async () => {
      const id = 'nonexistentKey';
      const brandId = 'brand123';

      jest.spyOn(apiKeyService, 'get').mockResolvedValue(null);

      await expect(service.deleteApiKey(id, brandId)).rejects.toThrowError(
        new HttpException('Api key not found', 404, {
          cause: new Error('Api key not found'),
        }),
      );
    });
  });
});
