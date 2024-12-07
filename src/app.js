/**
 * @file src/app.js
 */

const dataSource = require('./services/dataSource');
const { start } = require("./cluster/clusterManager")
start(process.env.NODE_ENV == 'production', dataSource)