import convict from 'convict';
import { resolve } from 'path';
import dotenv from 'dotenv';

type NodeEnv = 'development' | 'production';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const config = convict({
    env: {
        doc: 'Application environment',
        format: ['development', 'production'],
        env: 'NODE_ENV',
        default: 'development' as NodeEnv,
    },
    port: {
        doc: 'Server port',
        format: 'port',
        env: 'PORT',
        default: 8080,
    },
    logsDir: {
        doc: 'Application logs directory',
        format: String,
        default: resolve(process.cwd(), './logs'),
    },
    db: {
        host: {
            doc: 'Database host name / IP',
            format: String,
            env: 'DB_HOSTNAME',
            default: 'localhost',
        },
        port: {
            doc: 'Database port',
            format: 'port',
            env: 'DB_PORT',
            default: 5432,
        },
        username: {
            doc: 'Database username',
            format: String,
            env: 'DB_USERNAME',
            default: '',
        },
        password: {
            doc: 'Database password',
            format: String,
            env: 'DB_PASSWORD',
            default: '',
        },
        database: {
            doc: 'Database name',
            format: String,
            env: 'DB_NAME',
            default: '',
        },
        url: {
            doc: 'Database connection URL',
            format: String,
            env: 'DATABASE_URL',
            default: '',
        },
    },
});

config.validate({ allowed: 'strict' });

export default config;
