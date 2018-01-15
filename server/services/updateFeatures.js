/**
 * Created by ilazaar on 10/01/2018.
 */
import logger from 'winston';

const features = {
    init: function(settings) {
        logger.info("Init",settings);
    }
};

module.exports = features;