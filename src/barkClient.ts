import axios, { AxiosInstance } from 'axios';

/**
 * Options for configuring the Bark client.
 */
export interface BarkOptions {
  /** Bark server base URL */
  baseUrl: string;
  /** Device key for authentication */
  key: string;
}

/**
 * Response format for Bark push notifications.
 */
export interface BarkResponse {
  /** Response code */
  code: number;
  /** Response message */
  message: string;
  /** Timestamp of the response */
  timestamp: number;
}

/**
 * Payload for a push notification sent via Bark.
 */
export interface BarkPushPayload {
  /** Content of the push notification */
  body: string;
  /** Title of the push notification (optional) */
  title?: string;
  /** Subtitle of the push notification (optional) */
  subtitle?: string;
  /** Badge number for the notification (optional) */
  badge?: number;
  /** Sound to play with the notification (optional) */
  sound?: string;
  /** Icon URL for the notification (optional) */
  icon?: `${string}.jpg`;
  /** Group name for grouping messages (optional) */
  group?: string;
  /** URL to open when the notification is clicked (optional) */
  url?: string;
  /** Level of the notification (optional) */
  level?: 'critical' | 'active' | 'timeSensitive' | 'passive';
  /** Volume of the notification (optional) */
  volume?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** Whether to archive the notification (optional) */
  isArchive?: boolean;
  /** Custom text to copy when the notification is copied (optional) */
  copy?: string;
  /** Whether to auto-copy the notification (optional) */
  autoCopy?: boolean;
  /** Whether to repeat the ringtone on click (optional) */
  call?: boolean;
  /** Action to perform when the notification is clicked (optional) */
  action?: 'none';
}

class BarkError extends Error {
  public statusCode?: number;
  public data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.name = 'BarkError';
    this.statusCode = statusCode;
    this.data = data;
    Object.setPrototypeOf(this, BarkError.prototype);
  }
}

/**
 * A client for interacting with the Bark push notification API.
 */
export class BarkClient {
  private baseUrl: string;
  private key: string;
  private client: AxiosInstance;

  private validatePayload(payload: BarkPushPayload): void {
    if (!payload.body) throw new BarkError('The \'body\' field is required for a push notification.');
    if (payload.icon && !payload.icon.endsWith('.jpg')) throw new BarkError('The \'icon\' field must be a URL to a JPG image.');
    if (payload.url) {
      try {
        new URL(payload.url);
      } catch {
        throw new BarkError('The \'url\' field must be a valid URL.');
      }
    }
  }

  /**
   * Creates an instance of BarkClient.
   * @param options - Configuration options for the client
   */
  constructor(options: BarkOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.key = options.key;
    this.client = axios.create({ baseURL: this.baseUrl });
  }

  /**
   * Sends a push notification via the Bark API.
   * @param payload - The notification payload to send
   * @returns The response from the Bark API
   */
  async pushMessage(payload: BarkPushPayload): Promise<BarkResponse> {
    this.validatePayload(payload);

    try {
      const postData = { device_key: this.key, ...payload };

      const response = await this.client.post<BarkResponse>('/push', postData);
      if (response.status !== 200) throw new BarkError('Failed to send push notification.');

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to send push notification:', {
          status: error.response?.status,
          data: error.response?.data
        });
      } else console.error('An unexpected error occurred:', error);

      throw error;
    }
  }
}
