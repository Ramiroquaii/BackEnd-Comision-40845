const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        logConsola: { type: 'console' },
        logWarning: { type: 'file', filename: `${path.join(__dirname, 'warn.log')}` },
        logError: { type: 'file', filename: `${path.join(__dirname, 'error.log')}` }
    },
    categories: {
        warning: { appenders: ['logWarning'], level: "warn" },
        error: { appenders: ['logError'], level: "error" },
        default: { appenders: ['logConsola'], level: "trace" }
    }
})

const logger = log4js.getLogger();

module.exports = { logger };

// EJEMPLOS DE USO con objeto logger
// logger.trace('Trace message');
// logger.debug('Debug message');
// logger.info('Info message');
// logger.warn('Warning message');
// logger.error('Error message');
// logger.fatal('Fatal message');

// EJEMPLOS DE USO 
// log4js.getLogger('warning').trace('Trace message');
// log4js.getLogger('warning').debug('Debug message');
// log4js.getLogger('warning').info('Info message');
// log4js.getLogger('warning').warn('Warning message');
// log4js.getLogger('warning').error('Error message');
// log4js.getLogger('warning').fatal('Fatal message');

// log4js.getLogger('error').trace('Trace message');
// log4js.getLogger('error').debug('Debug message');
// log4js.getLogger('error').info('Info message');
// log4js.getLogger('error').warn('Warning message');
// log4js.getLogger('error').error('Error message');
// log4js.getLogger('error').fatal('Fatal message');

// LOG LEVEL DEFAULT
// 1- trace: The most verbose level. Used for tracing application code to help with debugging.
// 2- debug: Used for debugging application code.
// 3- info: Used for informational messages.
// 4- warn: Used for warning messages.
// 5- error: Used for error messages.
// 6- fatal: The least verbose level. Used for critical error messages that may cause the application to stop working.