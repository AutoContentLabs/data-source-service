/**
 * @file src/helpers/logger.js
 */
const { logger: baseLogger } = require('@auto-content-labs/messaging-utils');

// Enhancing logger for more control and structure
const logger = baseLogger.child({ service: 'data-source', environment: process.env.NODE_ENV || 'development', }); // Add custom context for the service

// Adding custom log levels and additional functionality
logger.level = process.env.APP_LOG_LEVEL || 'info'; // Set default level if not defined in environment

module.exports = logger;
