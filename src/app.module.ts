import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ErrorHandlerModule } from './application/error-handler/error-handler.module';
import { ErrorHandlerModule } from '@app/error-handler/error-handler.module';
// import { AwsModule } from './modules/aws/aws.module';
import { AwsModule } from '@mod/aws/aws.module';

@Module({
  imports: [ConfigModule.forRoot(), ErrorHandlerModule, AwsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
