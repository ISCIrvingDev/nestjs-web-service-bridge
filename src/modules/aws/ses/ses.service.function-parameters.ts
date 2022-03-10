export interface SendEmailParameters {
  senderAddress: string;
  receiverAddress: string[];
  emailSubject: string;
  formatBody: string;
}
