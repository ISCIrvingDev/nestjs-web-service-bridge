import { ValueProvider } from '@nestjs/common';
import { SESClient } from '@aws-sdk/client-ses';

export const SESClientProviderToken = 'SESClientProvider';

export const SESClientProvider: ValueProvider = {
  provide: SESClientProviderToken,
  useValue: new SESClient({ region: process.env.AWS_REGION }),
};
