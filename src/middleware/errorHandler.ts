import { Request, Response, NextFunction } from 'express';

interface CustomError extends Omit<Error, 'name'> {
    name?: string; 
    statusCode?: number; 
}


const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    console.error("Error:", error.message);

    let statusCode = 500; 
    let message = "An error occurred";
    const errorTypes: Record<string, { statusCode: number; message: string }> = {
        'CastError': { statusCode: 404, message: 'Resource not found' },
        'ValidationError': { statusCode: 400, message: error.message || 'Validation failed' },
        'UnauthorizedError': { statusCode: 401, message: 'Unauthorized' },
        'SyntaxError': { statusCode: 400, message: 'Bad request' },
    };

    if (error.name && errorTypes[error.name]) {
        statusCode = errorTypes[error.name].statusCode;
        message = errorTypes[error.name].message;
    } 
    else if (error.message) {
        if (error.message.toLowerCase().includes('jwt expired')) {
            statusCode = 401;
            message = 'JWT expired';
        } else if (error.message.toLowerCase().includes('jwt malformed')) {
            statusCode = 401;
            message = 'JWT malformed';
        }
    }
    else if (typeof error === 'string') {
        statusCode = 400;
        message = error;
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: error.stack,
    });
};

export default errorHandler;
