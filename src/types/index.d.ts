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
 * Represents the different sounds that can be played with a push notification.
 */
export type BarkSounds = 'alarm' | 'anticipate' | 'bell' | 'birdsong' | 'bloom' | 'calypso' | 'chime' | 'choo' | 'descent' | 'electronic' | 'fanfare' | 'glass' | 'gotosleep' | 'healthnotification' | 'horn' | 'ladder' | 'mailsent' | 'minuet' | 'multiwayinvitation' | 'newmail' | 'newsflash' | 'noir' | 'paymentsuccess' | 'shake' | 'sherwoodforest' | 'silence' | 'spell' | 'suspense' | 'telegraph' | 'tiptoes' | 'typewriters' | 'update';

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
  sound?: BarkSounds;
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