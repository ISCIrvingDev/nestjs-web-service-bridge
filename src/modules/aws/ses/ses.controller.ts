import { ErrorHandlerService } from '@app/error-handler/error-handler.service';
import { AppResponse } from '@app/models/app.response';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SendEmaiDto } from './dtos/send-email.dto';
import { SesService } from './ses.service';

@Controller('aws/ses')
export class SesController {
  constructor(
    private readonly _sesService: SesService,
    private readonly _errorHandlerService: ErrorHandlerService,
  ) {}

  @Post('sendEmai')
  async sendEmai(
    @Res() res: Response,
    @Body() body: SendEmaiDto,
  ): Promise<void> {
    const result = new AppResponse<boolean>();

    const formatBody = `
      <div>
        <b>Name:</b> ${body.name}
      </div>

      <div>
        <b>Email:</b> ${body.email}
      </div>
      
      <div>
        <b>Message:</b> ${body.message}
      </div>
    `;

    try {
      result.data = await this._sesService.sendEmail({
        senderAddress: process.env.SENDER_ADDRESS,
        receiverAddress: [process.env.SENDER_ADDRESS],
        emailSubject: body.subject,
        formatBody,
      });

      res.status(200).json(result);
    } catch (err) {
      this._errorHandlerService.response({ res, err });
    }
  }
}
