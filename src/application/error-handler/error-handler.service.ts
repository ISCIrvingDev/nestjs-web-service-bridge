import { HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';

interface ResponseParameters {
  res: Response;
  err: HttpException | Error;
}

@Injectable()
export class ErrorHandlerService {
  response({ res, err }: ResponseParameters): void {
    res.status(err instanceof HttpException ? err.getStatus() : 500).json({
      name: err.name,
      message: err.message,
      stack: err.stack,
    } as Error);
  }
}
