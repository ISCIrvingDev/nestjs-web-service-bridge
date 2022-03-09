import { ErrorHandlerService } from '@app/error-handler/error-handler.service';
import { AppResponse } from '@app/models/app.response';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { S3Service } from './s3.service';

@Controller('aws/s3')
export class S3Controller {
  constructor(
    private readonly _s3Service: S3Service,
    private readonly _errorHandlerService: ErrorHandlerService,
  ) {}

  @Get('getCvFace')
  async getCvFace(@Res() res: Response): Promise<void> {
    const result = new AppResponse<string>();

    try {
      result.data = await this._s3Service.getFileUrl({
        bucket: process.env.BUCKET_PORTFOLIO_PROJECTS,
        key: process.env.CV_FACE,
      });

      res.status(200).json(result);
    } catch (err) {
      this._errorHandlerService.response({ res, err });
    }
  }

  @Get('getCv')
  async getCv(@Res() res: Response): Promise<void> {
    const result = new AppResponse<string>();

    try {
      result.data = await this._s3Service.getFileUrl({
        bucket: process.env.BUCKET_PORTFOLIO_PROJECTS,
        key: process.env.CV,
      });

      res.status(200).json(result);
    } catch (err) {
      this._errorHandlerService.response({ res, err });
    }
  }
}
