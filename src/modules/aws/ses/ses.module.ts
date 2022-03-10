import { Module } from '@nestjs/common';
import { SesService } from './ses.service';
import { SesController } from './ses.controller';
import { SESClientProvider } from './providers/ses-client.provider';
import { ErrorHandlerModule } from '@app/error-handler/error-handler.module';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [SesController],
  providers: [SESClientProvider, SesService],
})
export class SesModule {}
