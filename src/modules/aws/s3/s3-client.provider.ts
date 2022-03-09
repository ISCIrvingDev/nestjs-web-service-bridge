import { ValueProvider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

export const S3ClientProviderToken = 'S3ClientProvider';

export const S3ClientProvider: ValueProvider = {
  provide: S3ClientProviderToken,
  useValue: new S3Client({ region: 'us-west-1' }),
};
