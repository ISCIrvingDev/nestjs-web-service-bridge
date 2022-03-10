import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import { SESClientProviderToken } from './providers/ses-client.provider';
import { SendEmailParameters } from './ses.service.function-parameters';

@Injectable()
export class SesService {
  constructor(
    @Inject(SESClientProviderToken)
    private readonly _sesClientProvider: SESClient,
  ) {}

  async sendEmail({
    senderAddress,
    receiverAddress,
    emailSubject,
    formatBody,
  }: SendEmailParameters): Promise<boolean> {
    const params = {
      Destination: {
        // required*
        CcAddresses: receiverAddress,
        // ToAddresses: RECEIVER_ADDRESS,
      },
      Message: {
        // required*
        Body: {
          // required* -> Html || Text
          Html: {
            Charset: 'UTF-8',
            Data: formatBody,
          },
          // Text: {
          //   Charset: 'UTF-8',
          //   Data: formatBody,
          // },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailSubject,
        },
      },
      Source: senderAddress,
      ReplyToAddresses: [],
    };

    const data = await this._sesClientProvider.send(
      new SendEmailCommand(params),
    );

    return data.$metadata.httpStatusCode === 200;
  }
}
