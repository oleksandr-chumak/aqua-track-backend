interface Envelope {
  from: string;
  to: string[];
}

interface PendingRecipient {
  recipient: string;
  response: string;
}

export interface Info {
  messageId: string;
  envelope: Envelope;
  accepted: string[];
  rejected: string[];
  pending: PendingRecipient[];
  response: string;
}
