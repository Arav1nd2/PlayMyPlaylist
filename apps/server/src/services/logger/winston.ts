import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.splat(),
        winston.format.simple(),
    ),
});

export default logger;
