import { Inject, Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3ClientProviderToken } from './s3-client.provider';
import { GetCvFaceParameters } from './s3.service.function-parameters';

@Injectable()
export class S3Service {
  constructor(
    @Inject(S3ClientProviderToken) private readonly _s3ClientProvider: S3Client,
  ) {}

  async getFileUrl({ bucket, key }: GetCvFaceParameters): Promise<string> {
    const bucketParams = {
      Bucket: bucket,
      Key: key,
    };

    const command = new GetObjectCommand(bucketParams);

    const signedUrl = await getSignedUrl(this._s3ClientProvider, command, {
      expiresIn: 300,
    });

    return signedUrl;
  }
}
