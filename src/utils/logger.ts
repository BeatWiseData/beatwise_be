import winston from 'winston'
import { config } from '@/config/environment'

const logger = winston.createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'social-questing-api' },
  transports: [
    // Write all logs with importance level of 'error' or less to 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs with importance level of 'info' or less to 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

// If we're not in production, log to the console as well
if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

export default logger