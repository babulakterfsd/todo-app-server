/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
  });
};

export default globalErrorHandler;
