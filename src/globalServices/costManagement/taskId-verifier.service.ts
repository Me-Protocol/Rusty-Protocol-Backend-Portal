import { get_transaction_by_hash_with_url } from '@developeruche/runtime-sdk';
import { GELATO_RELAYER_STATUS_URL, RUNTIME_URL } from '@src/config/env.config';
import { OrderVerifier } from '@src/utils/enums/OrderVerifier';
import axios from 'axios';

export async function checkOrderStatusGelatoOrRuntime(
  taskId: string,
  verifier: OrderVerifier,
): Promise<'success' | 'failed' | 'pending'> {
  try {
    if (verifier === OrderVerifier.GELATO) {
      const apiUrl = GELATO_RELAYER_STATUS_URL + taskId;

      const response = await axios.get(apiUrl);
      const status = response.data.task.taskState;

      if (status === 'ExecSuccess') {
        return 'success';
      } else if (status === 'ExecFailed') {
        return 'failed';
      } else {
        return 'pending';
      }
    } else {
      const runtimeStatus = await get_transaction_by_hash_with_url(
        {
          hash: taskId,
        },
        RUNTIME_URL,
      );

      if (
        runtimeStatus.data.result.hash !==
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        return 'success';
      } else {
        return 'failed';
      }
    }
  } catch (error) {
    return 'pending';
  }
}
