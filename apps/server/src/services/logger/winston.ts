import winston from 'winston';

const { timestamp, colorize, combine, align, printf } = winston.format;
const { Console } = winston.transports;

const logger = winston.createLogger({
    transports: [
        new Console({
            handleExceptions: true,
            level: 'silly',
        }),
    ],
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    ),
});

export default logger;
