import { HMT_JOB_API_KEY, SERVER_URL } from '@src/config/env.config';
import { TaskResponse } from '../entities/taskResponse.entity';

export const constructHmtManifest = ({
  taskId,
  taskResponses,
}: {
  taskResponses: TaskResponse[];
  taskId: string;
}) => {
  const newManifest = {
    skip_upload_pipeline: true,
    direct: true,
    manifest: {
      batch_result_delivery_webhook: `${SERVER_URL}/task/${taskId}/job-completed`,
      job_api_key: HMT_JOB_API_KEY,
      job_mode: 'batch',
      job_total_tasks: 1,
      minimum_trust_server: 0.1,
      minimum_trust_client: 0.1,
      recording_oracle_addr: '0x6a0E68eA5F706339dd6bd354F53EfcB5B9e53E49',
      reputation_oracle_addr: '0x6a0E68eA5F706339dd6bd354F53EfcB5B9e53E49',
      reputation_agent_addr: '0x6a0E68eA5F706339dd6bd354F53EfcB5B9e53E49',
      ro_uri: 'http://exchange:5000',
      internal_config: {
        exchange: {
          task_count: '1',
        },
      },
      request_type: 'text_free_entry',
      request_config: {
        multiple_choice_max_choices: 1,
        multiple_choice_min_choices: 1,
        overlap_threshold: null,
        answer_type: 'float',
        max_value: 1,
        min_value: 0,
        max_length: 1,
        min_length: 1,
        sig_figs: 1,
      },
      requester_question: {
        en: `Does this [review](${taskResponses?.[0]?.responseUrl}) make sense, Answer 1 for yes and 0 for no?`,
      },
      restricted_audience: {
        sitekey: [
          {
            '30649057-7805-4e72-aac6-c1be41666e28': {
              score: 1,
            },
          },
        ],
      },
      requester_question_example: null,
      requester_restricted_answer_set: {},
      requester_description: 'Review task type',
      requester_accuracy_target: 0.0,
      requester_max_repeats: 3,
      requester_min_repeats: 3,
      unsafe_content: false,
      task_bid_price: '0.3',
      oracle_stake: '0.05',
      taskdata: [
        ...taskResponses.map((taskResponse) => ({
          task_key: taskResponse.id,
          datapoint_uri: taskResponse.responseUrl,
          datapoint_hash: 'magic-hash',
          datapoint_text: {
            en: taskResponse.response,
          },
        })),
      ],
    },
  };

  return newManifest;
};
