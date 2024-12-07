/**
 * @file src/events/evenDataSourceRequest.js
 * @description Data Source Event
 */
const logger = require('../helpers/logger');
const { sendDataSourceResponse, handleDataSourceRequest } = require('../utils/messaging');

/**
 * Handles data source request events.
 * @param {Object} pair - The processed data source object.
 * @param {Object} pair.key - The incoming model key.
 * @param {Object} pair.value - The incoming model data.
 * @param {Object} pair.headers - The request headers.
 * @param {Object} pair.headers.correlationId - The correlation ID for tracking.
 */
async function evenDataSourceRequest(pair) {
  const { key, value, headers } = pair
  if (!value) {
    logger.error("No value found in the message");
    return;
  }

  // prepare the model to be used
  const model = await handleDataSourceRequest({ key, value, headers });
  // prepare the title to be moved  
  const providedHeaders = { correlationId: headers.correlationId, traceId: headers.traceId } // track before request

  try {

    // Send the successful response
    await sendDataSourceResponse({ value: response, headers: providedHeaders });

  } catch (error) {
    // Handle errors and send failure response
    const errorMessage = error instanceof Error ? error.message : `${error}`;

    logger.error(`[ds] ${headers.correlationId} - ${error.name || "Unknown Error"}`, errorMessage);

    throw error; // Error message sent for re-reading.
  }

}

module.exports = { evenDataSourceRequest };
