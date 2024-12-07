/**
 * @file src/utils/messaging.js
 */
const { sendMessage, listenMessage } = require('@auto-content-labs/messaging');
const { helper } = require('@auto-content-labs/messaging-utils');
const logger = require('../helpers/logger');


async function listen(event, callback) {
    logger.info("listen")
    listenMessage(event, callback)
}

// Send Message Function with Error Handling and Logging
async function send(event, providedPair) {
    logger.info("send")
    const headers = helper.generateHeaders(event);
    const key = helper.generateKey();
    const pair = {
        value: providedPair.value,
        key,
        headers
    };

    try {
        logger.info(`Sending message for event: ${event} with key: ${JSON.stringify(key)}`);
        const response = await sendMessage(event, pair);

        // Logging success
        logger.info(`Message sent successfully for event: ${event}, key: ${JSON.stringify(key)}`);

        return response;
    } catch (error) {
        // Logging error with detailed message
        logger.error(`Error sending message for event: ${event} with key: ${key}: ${error.message}`);
        throw new Error(`Failed to send message for event: ${event}`);
    }
}

async function sendDataSourceResponse() {
    logger.info("sendDataSourceResponse")
}
async function handleDataSourceRequest() {
    logger.info("handleDataSourceRequest")
}
module.exports = {
    events: {
        dataSourceRequest: "DATA_SOURCE"
    },
    sendMessage: send,
    sendDataSourceResponse,
    listenMessage: listen,
    handleDataSourceRequest
};
