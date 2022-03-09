import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3ClientProvider } from './s3-client.provider';
import { S3Controller } from './s3.controller';
import { ErrorHandlerModule } from '@app/error-handler/error-handler.module';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [S3Controller],
  providers: [S3ClientProvider, S3Service],
})
export class S3Module {}
