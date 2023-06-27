import * as Foundations from './Foundations';
import * as Wallets from './Wallets';
import { HttpClient } from './dfnsHttpClient';
import { RiskKind } from './utils';

class WalletsClient {
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  get httpClient(): HttpClient {
    // TODO: throw if not initialized
    return this._httpClient;
  }

  /**
   *
   *
   * @param body {CreateWalletRequest}
   * @returns {Promise<Wallets.Wallet>}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async createWallet(
    body: Wallets.CreateWalletRequest,
  ): Promise<Wallets.Wallet> {
    const resourcePath = '/wallets';
    return this.httpClient
      .post<Wallets.Wallet>(resourcePath, body, {
        risk: RiskKind.UserActionSignatureRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.Wallet>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getWallet(walletId: Foundations.EntityId): Promise<Wallets.Wallet> {
    const resourcePath = '/wallets/' + encodeURIComponent(walletId) + '';
    return this.httpClient
      .get<Wallets.Wallet>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.WalletAssets>}
   * @throws {EntityNotFoundError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getWalletAssets(
    walletId: Foundations.EntityId,
  ): Promise<Wallets.WalletAssets> {
    const resourcePath = '/wallets/' + encodeURIComponent(walletId) + '/assets';
    return this.httpClient
      .get<Wallets.WalletAssets>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.WalletNfts>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getWalletNfts(
    walletId: Foundations.EntityId,
  ): Promise<Wallets.WalletNfts> {
    const resourcePath = '/wallets/' + encodeURIComponent(walletId) + '/nfts';
    return this.httpClient
      .get<Wallets.WalletNfts>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.PaginatedWalletList>}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async listWallets(
    limit?: Foundations.IntegerPositiveStrict,
    paginationToken?: string,
  ): Promise<Wallets.PaginatedWalletList> {
    const resourcePath =
      '/wallets?' +
      (limit ? 'limit=' + encodeURIComponent(limit) : '') +
      (paginationToken
        ? 'paginationToken=' + encodeURIComponent(paginationToken)
        : '');
    return this.httpClient
      .get<Wallets.PaginatedWalletList>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.PaginatedEventHistory>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   */
  async getWalletHistory({
    walletId,
    limit,
    paginationToken,
  }: {
    walletId: Foundations.EntityId;
    limit?: Foundations.IntegerPositiveStrict;
    paginationToken?: Foundations.IsoDatetime;
  }): Promise<Wallets.PaginatedEventHistory> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/history?' +
      (limit ? 'limit=' + encodeURIComponent(limit) : '') +
      (paginationToken
        ? 'paginationToken=' + encodeURIComponent(paginationToken)
        : '');
    return this.httpClient
      .get<Wallets.PaginatedEventHistory>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        console.log(error);
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @param body {TransferAssetRequest}
   * @returns {Promise<Wallets.TransferRequest>}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async transferAsset(
    body: Wallets.TransferAssetRequest,
    walletId: Foundations.EntityId,
  ): Promise<Wallets.TransferRequest> {
    const resourcePath =
      '/wallets/' + encodeURIComponent(walletId) + '/transfers';
    return this.httpClient
      .post<Wallets.TransferRequest>(resourcePath, body, {
        risk: RiskKind.UserActionSignatureRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.TransferRequest>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getTransfer(
    walletId: Foundations.EntityId,
    transferId: Foundations.EntityId,
  ): Promise<Wallets.TransferRequest> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/transfers/' +
      encodeURIComponent(transferId) +
      '';
    return this.httpClient
      .get<Wallets.TransferRequest>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.PaginatedTransferList>}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async listTransfers(
    walletId: Foundations.EntityId,
    limit?: Foundations.IntegerPositiveStrict,
    paginationToken?: string,
  ): Promise<Wallets.PaginatedTransferList> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/transfers?' +
      (limit ? 'limit=' + encodeURIComponent(limit) : '') +
      (paginationToken
        ? 'paginationToken=' + encodeURIComponent(paginationToken)
        : '');
    return this.httpClient
      .get<Wallets.PaginatedTransferList>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   * # Broadcast Transaction
   *
   * Depending on the payload sent via request body, this operation can perform the following tasks:
   * * Create a contract.
   * * Call a function in a contract that needs signing.
   * * Send ETH to another account.
   *
   * ## Notes
   *
   * Our current `BroadcastTransaction` endpoint is only meant for state-changing transactions which require signing (eg. making requests to a contract which needs to be signed). This endpoint is not made to read the blockchain with a read-only contract call (which does not require signing). At the moment we offer no support for the read-only use case.
   *
   * @param body {BroadcastTransactionRequest}
   * @returns {Promise<Wallets.TransactionRequest>}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async broadcastTransaction(
    body: Wallets.BroadcastTransactionRequest,
    walletId: Foundations.EntityId,
  ): Promise<Wallets.TransactionRequest> {
    const resourcePath =
      '/wallets/' + encodeURIComponent(walletId) + '/transactions';
    return this.httpClient
      .post<Wallets.TransactionRequest>(resourcePath, body, {
        risk: RiskKind.UserActionSignatureRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.TransactionRequest>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getTransaction(
    walletId: Foundations.EntityId,
    transactionId: Foundations.EntityId,
  ): Promise<Wallets.TransactionRequest> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/transactions/' +
      encodeURIComponent(transactionId) +
      '';
    return this.httpClient
      .get<Wallets.TransactionRequest>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   * Not implemented.
   *
   * @returns {Promise<Wallets.PaginatedTransactionList>}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async listTransactions(
    walletId: Foundations.EntityId,
    limit?: Foundations.IntegerPositiveStrict,
    paginationToken?: string,
  ): Promise<Wallets.PaginatedTransactionList> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/transactions?' +
      (limit ? 'limit=' + encodeURIComponent(limit) : '') +
      (paginationToken
        ? 'paginationToken=' + encodeURIComponent(paginationToken)
        : '');
    return this.httpClient
      .get<Wallets.PaginatedTransactionList>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @param body {GenerateSignatureRequest}
   * @returns {Promise<Wallets.SignatureRequest>}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async generateSignature(
    body: Wallets.GenerateSignatureRequest,
    walletId: Foundations.EntityId,
  ): Promise<Wallets.SignatureRequest> {
    const resourcePath =
      '/wallets/' + encodeURIComponent(walletId) + '/signatures';
    return this.httpClient
      .post<Wallets.SignatureRequest>(resourcePath, body, {
        risk: RiskKind.UserActionSignatureRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.SignatureRequest>}
   * @throws {EntityNotFoundError}
   * @throws {BadRequestError}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async getSignature(
    walletId: Foundations.EntityId,
    signatureId: Foundations.EntityId,
  ): Promise<Wallets.SignatureRequest> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/signatures/' +
      encodeURIComponent(signatureId) +
      '';
    return this.httpClient
      .get<Wallets.SignatureRequest>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'notFound': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          case 'badRequest': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }

  /**
   *
   *
   * @returns {Promise<Wallets.PaginatedSignatureList>}
   * @throws {ForbiddenError}
   * @throws {UnauthorizedError}
   * @throws {ForbiddenError}
   * @throws {BadRequestError}
   * @throws {EntityNotFoundError}
   */
  async listSignatures(
    walletId: Foundations.EntityId,
    limit?: Foundations.IntegerPositiveStrict,
    paginationToken?: string,
  ): Promise<Wallets.PaginatedSignatureList> {
    const resourcePath =
      '/wallets/' +
      encodeURIComponent(walletId) +
      '/signatures?' +
      (limit ? 'limit=' + encodeURIComponent(limit) : '') +
      (paginationToken
        ? 'paginationToken=' + encodeURIComponent(paginationToken)
        : '');
    return this.httpClient
      .get<Wallets.PaginatedSignatureList>(resourcePath, undefined, {
        risk: RiskKind.AuthRequired,
      })
      .then((response) => response)
      .catch((error: Error) => {
        const serviceName = 'DfnsCustomerApi';
        switch (error.name) {
          case 'forbidden': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Unauthorized': {
            const errorMessage = `` || error.message;
            throw new Foundations.UnauthorizedError(errorMessage, serviceName);
          }
          case 'Access To Resource Not Allowed': {
            const errorMessage = `` || error.message;
            throw new Foundations.ForbiddenError(errorMessage, serviceName);
          }
          case 'Bad Request': {
            const errorMessage = `` || error.message;
            throw new Foundations.BadRequestError(errorMessage, serviceName);
          }
          case 'Not Found': {
            const errorMessage = `` || error.message;
            throw new Foundations.EntityNotFoundError(
              errorMessage,
              serviceName,
            );
          }
          default:
            throw new Error('Unexpected Error');
        }
      });
  }
}

export { WalletsClient };
